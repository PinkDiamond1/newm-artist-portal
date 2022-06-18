import {
  Dialog as MuiDialog,
  DialogProps as MuiDiaogProps,
  styled,
} from "@mui/material";
import theme from "theme";

const Dialog = styled(MuiDialog)`
  & .MuiPaper-root {
    border-radius: 8px;
    background-color: ${theme.colors.grey500};
  }
`;

export default Dialog;
