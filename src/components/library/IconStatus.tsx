import { FunctionComponent } from "react";
import { Stack, Theme } from "@mui/material";
import { Typography } from "elements";
import theme from "theme";

export interface IconStatusProps {
  readonly icon: JSX.Element;
  readonly iconColor?: keyof Theme["colors"];
  readonly fontColor?: keyof Theme["colors"];
  readonly status: string | undefined;
}

/**
 * Displays a vertically stacked icon and message.
 */
const IconStatus: FunctionComponent<IconStatusProps> = ({
  icon,
  iconColor = "music",
  fontColor = "white",
  status,
}) => (
  <Stack
    spacing={ 1 }
    direction="row"
    color={ theme.colors[iconColor] }
    sx={ { justifyContent: "center", alignItems: "center" } }
  >
    { icon }

    <Typography
      color={ fontColor }
      variant="body2"
      sx={ { display: { xs: "block" } } }
    >
      { status }
    </Typography>
  </Stack>
);

export default IconStatus;
