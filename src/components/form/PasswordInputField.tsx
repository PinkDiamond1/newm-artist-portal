import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useTheme } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { TextInputField } from "components";
import { TextInputProps } from "elements";

interface PasswordInputFieldProps extends TextInputProps {
  readonly handlePressEndAdornment?: VoidFunction;
  readonly externalMaskPassword?: boolean;
  readonly showEndAdornment?: boolean;
}

const PasswordInputField: FunctionComponent<PasswordInputFieldProps> = ({
  handlePressEndAdornment,
  externalMaskPassword,
  showEndAdornment = true,
  ...rest
}) => {
  const theme = useTheme();
  const [internalMaskPassword, setInternalMaskPassword] = useState(true);

  const isMasked = externalMaskPassword ?? internalMaskPassword;
  const PasswordIcon = isMasked ? VisibilityIcon : VisibilityOffIcon;

  /**
   * If no handlePressEndAdornment is passed, this will handle the show/hide password
   */
  const togglePasswordMask = () => {
    setInternalMaskPassword(!internalMaskPassword);
  };

  return (
    <TextInputField
      endAdornment={
        showEndAdornment ? (
          <IconButton
            aria-label="Change password field visible status"
            onClick={ handlePressEndAdornment || togglePasswordMask }
          >
            <PasswordIcon sx={ { color: theme.colors.white } } />
          </IconButton>
        ) : undefined
      }
      type={ isMasked ? "password" : "text" }
      { ...rest }
    />
  );
};

export default PasswordInputField;