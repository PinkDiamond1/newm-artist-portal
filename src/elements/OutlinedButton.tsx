import { FunctionComponent } from "react";
import { Button, ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const OutlinedButtonGradient = styled("div")(
  ({ theme }) => `
  background: ${theme.gradients.artist};
  padding: 2px;
  border-radius: 7px;
`
);

const OutlinedButtonBackground = styled("div")(
  ({ theme }) => `
  background: ${theme.colors.black};
  border-radius: 7px;
`
);

const OutlinedButtonMain = styled(Button)`
  background-color: 'transparent';
  padding: 12px 16px;
`;

const GradientText = styled("span")(
  ({ theme }) => `
  font-size: ${theme.button.fontSize};
  line-height: ${theme.button.lineHeight};
  white-space: nowrap;
  font: ${theme.typography.button.font};
  text-transform: none;
  color: transparent;
  background: ${theme.colors.red};
  background: ${theme.gradients.artist};
  background-clip: text;
  text-fill-color: transparent;
  text-shadow: 0 0 transparent;
`
);

const OutlinedButton: FunctionComponent<ButtonProps> = ({
  children,
  ...props
}) => (
  <OutlinedButtonGradient>
    <OutlinedButtonBackground>
      <OutlinedButtonMain { ...props }>
        <GradientText>{ children }</GradientText>
      </OutlinedButtonMain>
    </OutlinedButtonBackground>
  </OutlinedButtonGradient>
);

export default OutlinedButton;