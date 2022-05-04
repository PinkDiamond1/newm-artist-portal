import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import { FilledButton, GradientTypography, Link, Typography } from "elements";

const Complete: FunctionComponent = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">

      <Typography
        align="center"
        fontWeight="extra-bold"
        variant="xxxl"
        fontFamily="Raleway"
      >
        Aaaaand we&apos;re done.
      </Typography>

      <Box mt={ 1 } mb={ 6 }>
        <GradientTypography
          variant="xxxl"
          fontFamily="DM Serif Text"
          fontWeight="regular"
          fontStyle="italic"
        >
          Shall we?
        </GradientTypography>
      </Box>

      <FilledButton type="submit">Enter NEWM</FilledButton>

      <Box mt={ 2 }>
        <Typography fontWeight="medium" color="grey200">
          By proceeding forward you agree to&nbsp;
          <Link to="#" fontWeight="medium">
            projectNEWM&apos;s Terms of Service
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Complete;