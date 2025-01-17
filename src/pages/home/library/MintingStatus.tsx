import { Check, Close } from "@mui/icons-material";
import InfoCircleLine from "assets/images/InfoCircleLine";
import TimeCircleLine from "assets/images/TimeCircleLine";
import { MintingStatus as MintingStatusType } from "modules/song";
import { IconStatus } from "components";
import { FunctionComponent } from "react";
import theme from "theme";

interface MintingStatusProps {
  readonly mintingStatus: MintingStatusType;
}

export const MintingStatus: FunctionComponent<MintingStatusProps> = ({
  mintingStatus,
}) => {
  const pendingStatus = [
    "StreamTokenAgreementApproved",
    "MintingPaymentReceived",
    "ReadyToDistribute",
    "SubmittedForDistribution",
    "Distributed",
    "Pending",
  ];
  const isPending = pendingStatus.includes(mintingStatus);

  if (mintingStatus === "Distributed") {
    return (
      <IconStatus
        icon={ <Check fontSize="medium" sx={ { color: theme.colors.green } } /> }
        status="Distributed"
      />
    );
  } else if (isPending) {
    return (
      <IconStatus
        icon={ <TimeCircleLine /> }
        iconColor="yellow"
        status="Pending"
      />
    );
  } else if (mintingStatus === "Declined") {
    return (
      <IconStatus icon={ <InfoCircleLine /> } iconColor="red" status="Declined" />
    );
  } else if (mintingStatus === "MintingPaymentRequested") {
    return (
      <IconStatus
        icon={ <TimeCircleLine /> }
        iconColor="yellow"
        status="Minting Payment Requested"
      />
    );
  } else if (mintingStatus === "Undistributed") {
    return (
      <IconStatus
        icon={ <Close fontSize="medium" sx={ { color: theme.colors.grey200 } } /> }
        fontColor="grey200"
        status="Undistributed"
      />
    );
  } else {
    return null;
  }
};
