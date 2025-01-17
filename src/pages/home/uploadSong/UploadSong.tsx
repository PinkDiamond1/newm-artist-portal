import { Box, Container } from "@mui/material";
import { commonYupValidation } from "common";
import { WizardForm } from "components";
import { Typography } from "elements";
import { FormikHelpers, FormikValues } from "formik";
import { useGetGenresQuery } from "modules/content";
import { emptyProfile, useGetProfileQuery } from "modules/session";
import {
  UploadSongRequest,
  useGenerateArtistAgreementThunk,
  useUploadSongThunk,
} from "modules/song";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ConfirmAgreement from "./ConfirmAgreement";
import SongInfo from "./SongInfo";

const UploadSong: FunctionComponent = () => {
  const navigate = useNavigate();

  const { data: genreOptions = [] } = useGetGenresQuery();
  const {
    data: {
      companyName = "",
      firstName = "",
      lastName = "",
      nickname: stageName = "",
      email,
      role,
    } = emptyProfile,
  } = useGetProfileQuery();
  const [uploadSong] = useUploadSongThunk();
  const [generateArtistAgreement] = useGenerateArtistAgreementThunk();

  const artistName = `${firstName} ${lastName}`;

  const initialValues: UploadSongRequest = {
    coverArtUrl: "",
    audio: undefined,
    title: "",
    genres: [],
    moods: [],
    description: "",
    isExplicit: false,
    isMinting: false,
    owners: [
      {
        email,
        firstName,
        isCreator: true,
        isRightsOwner: true,
        lastName,
        percentage: 100,
        role,
      },
    ],
    creditors: [
      {
        email,
        firstName,
        lastName,
        role,
      },
    ],
    consentsToContract: false,
    companyName,
    artistName,
    stageName,
  };

  const handleSongInfo = async (
    values: UploadSongRequest,
    { setSubmitting }: FormikHelpers<FormikValues>
  ) => {
    if (values.isMinting) {
      await generateArtistAgreement({
        body: {
          songName: values.title,
          companyName,
          artistName,
          stageName,
        },
        callback: () => {
          navigate("confirm");
        },
      });

      setSubmitting(false);
    } else {
      handleSubmit(values);
    }
  };

  // eslint-disable-next-line
  const handleSubmit = (values: UploadSongRequest) => {
    uploadSong(values);
  };

  const validations = {
    coverArtUrl: Yup.mixed().required("This field is required"),
    audio: Yup.mixed().required("This field is required"),
    title: Yup.string().required("This field is required"),
    genres: commonYupValidation
      .genres(genreOptions)
      .min(1, "At lease one genre is required"),
    owners: Yup.array().when("isMinting", {
      is: (value: boolean) => !!value,
      then: Yup.array()
        .min(1, "At least one owner is required when minting")
        .test({
          message: "100% ownership must be distributed",
          test: (owners) => {
            if (!owners) return false;

            const percentageSum = owners.reduce((sum, owner) => {
              return sum + owner.percentage;
            }, 0);

            return percentageSum === 100;
          },
        }),
    }),
    consentsToContract: Yup.bool().required("This field is required"),
  };

  return (
    <Container
      maxWidth={ false }
      sx={ {
        marginX: [null, null, 3],
        marginBottom: 8,
        overflow: "auto",
        textAlign: ["center", "center", "initial"],
      } }
    >
      <Typography variant="h3" fontWeight={ 800 }>
        UPLOAD A SONG
      </Typography>

      <Box pt={ 5 } pb={ 7 }>
        <WizardForm
          validateOnBlur={ false }
          initialValues={ initialValues }
          onSubmit={ handleSubmit }
          rootPath="home/upload-song"
          validateOnMount={ true }
          enableReinitialize={ true }
          routes={ [
            {
              element: <SongInfo />,
              path: "",
              navigateOnSubmitStep: false,
              onSubmitStep: handleSongInfo,
              validationSchema: Yup.object().shape({
                coverArtUrl: validations.coverArtUrl,
                audio: validations.audio,
                title: validations.title,
                genres: validations.genres,
                owners: validations.owners,
              }),
            },
            {
              element: <ConfirmAgreement />,
              path: "confirm",
              validationSchema: Yup.object().shape({
                consentsToContract: validations.consentsToContract,
              }),
            },
          ] }
        />
      </Box>
    </Container>
  );
};

export default UploadSong;
