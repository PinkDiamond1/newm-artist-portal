/**
 * Logs the user into the app using the Facebook Auth API.
 */

import { extendedApi as sessionApi } from "modules/session";
import { setToastMessage } from "modules/ui";
import { FunctionComponent, ReactNode } from "react";
import { useDispatch } from "react-redux";
import FacebookLoginHelper, {
  LoginResponse,
} from "@greatsumini/react-facebook-login";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Button } from "elements";

interface Props {
  readonly children?: ReactNode;
}

const FacebookLogin: FunctionComponent<Props> = ({ children }) => {
  const dispatch = useDispatch();

  const handleFacebookLoginSuccess = (resp: LoginResponse["authResponse"]) => {
    const accessToken = resp?.accessToken;

    if (!accessToken) {
      dispatch(
        setToastMessage({
          heading: "Facebook",
          message: "Facebook authentication service offline.",
          severity: "error",
        })
      );

      return;
    }

    dispatch(sessionApi.endpoints.facebookLogin.initiate({ accessToken }));
  };

  return (
    <FacebookLoginHelper
      appId={ process.env.REACT_APP_FACEBOOK_CLIENT_ID || "" }
      onSuccess={ handleFacebookLoginSuccess }
      render={ ({ onClick }) => (
        <Button
          aria-label="facebook authorization"
          onClick={ onClick }
          variant="outlined"
          color="white"
          startIcon={ <FacebookIcon /> }
        >
          { children }
        </Button>
      ) }
    />
  );
};

export default FacebookLogin;
