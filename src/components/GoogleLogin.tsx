/**
 * Logs the user into the app using the Google Auth API.
 */

import { extendedApi as sessionApi } from "modules/session";
import { setToastMessage } from "modules/ui";
import { FunctionComponent, ReactNode } from "react";
import { useDispatch } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleIcon from "@mui/icons-material/Google";
import { Button } from "elements";

interface Props {
  readonly children?: ReactNode;
}

const GoogleLogin: FunctionComponent<Props> = ({ children }) => {
  const dispatch = useDispatch();

  const handleLogin = useGoogleLogin({
    onSuccess: ({ access_token: accessToken }) => {
      if (!accessToken) {
        dispatch(
          setToastMessage({
            heading: "Google",
            message: "Google authentication service offline.",
            severity: "error",
          })
        );
      }

      dispatch(sessionApi.endpoints.googleLogin.initiate({ accessToken }));
    },
  });

  return (
    <Button
      aria-label="google authorization"
      onClick={ () => handleLogin() }
      variant="outlined"
      color="white"
      startIcon={ <GoogleIcon /> }
    >
      { children }
    </Button>
  );
};

export default GoogleLogin;
