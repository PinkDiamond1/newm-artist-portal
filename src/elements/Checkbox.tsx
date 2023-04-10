import { ForwardRefRenderFunction, ForwardedRef, forwardRef } from "react";
import theme from "theme";
import {
  Box,
  Checkbox as MUICheckbox,
  CheckboxProps as MUICheckboxProps,
  Stack,
} from "@mui/material";
import CheckboxIcon from "assets/images/CheckboxIcon";
import { ErrorMessage } from "components";

export interface CheckboxProps extends MUICheckboxProps {
  readonly ariaDescribedBy?: string;
  readonly errorMessage?: string;
}

const Checkbox: ForwardRefRenderFunction<HTMLInputElement, CheckboxProps> = (
  { ariaDescribedBy, checked, sx, errorMessage, ...rest },
  ref: ForwardedRef<HTMLInputElement>
) => {
  return (
    <>
      <MUICheckbox
        aria-describedby={ ariaDescribedBy }
        checked={ checked }
        inputRef={ ref }
        icon={
          <Stack
            sx={ {
              border: `2px solid ${theme.colors.grey400}`,
              borderRadius: "2px",
              height: "20px",
              width: "20px",
            } }
          ></Stack>
        }
        checkedIcon={ <CheckboxIcon /> }
        sx={ {
          "&.MuiCheckbox-root": {
            backgroundColor: theme.colors.grey600,
            borderRadius: "2px",
            minHeight: "20px",
            minWidth: "20px",
            overflow: "hidden",
            p: 0,
          },

          "&.Mui-checked": {
            backgroundColor: theme.colors.music,
          },

          ...sx,
        } }
        { ...rest }
      />

      { errorMessage && (
        <Box mt={ 0.5 }>
          <ErrorMessage>{ errorMessage }</ErrorMessage>
        </Box>
      ) }
    </>
  );
};

export default forwardRef(Checkbox);