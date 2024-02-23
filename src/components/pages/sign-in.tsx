import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GitHubIcon from "@mui/icons-material/GitHub";
import axios from "axios";
import Paper from "@mui/material/Paper";
import { Alert } from "@mui/material";
import { Logo } from "../svg/logo";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/auth-context";
import { useUserInfo } from "../auth/usr-context";

function Footer(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      <GitHubIcon />
      <Link
        color="inherit"
        href="https://github.com/EdgarModesto23/pluma-client"
      >
        Github repository
      </Link>
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState("");
  const [showError, setError] = React.useState(false);
  const [emailError, setEmailError] = React.useState({
    show: false,
    message: "",
  });
  const [passwordError, setPasswordError] = React.useState({
    show: false,
    message: "",
  });

  const token = useAuth();

  React.useEffect(() => {
    if (token?.token) {
      navigate("/app/");
    }
  }, [token, navigate]);

  const handleError = (error: string) => {
    setErrorMessage(error);
    setError(true);
  };

  const user = useUserInfo();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const baseURL = import.meta.env.VITE_API_URL;
    const url = baseURL + "api/token/";
    const form = new FormData(event.currentTarget);
    const data = JSON.stringify(Object.fromEntries(form.entries()));
    const dataObj = JSON.parse(data);

    if (dataObj.email == "") {
      setEmailError({ show: true, message: "This field is required" });
    } else {
      setEmailError({ show: false, message: "" });
    }
    if (dataObj.password == "") {
      setPasswordError({ show: true, message: "This field is required" });
    } else {
      setPasswordError({ show: false, message: "" });
    }
    //setup auth object
    axios
      .post(url, dataObj)
      .then((response) => {
        token?.setToken(response.data.access);
        user?.setUser({
          id: response.data.id,
          username: response.data.username,
          name: response.data.name,
          email: response.data.email,
        });
        navigate("/app", { replace: true });
      })
      .catch((error) => {
        const error_data = Object.values(error.response.data);
        if (error.response.status == 400) {
          handleError("You must fill in every field");
        } else {
          handleError(error_data.join(" "));
        }
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Logo />
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={emailError.show}
                helperText={emailError.message}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                error={passwordError.show}
                helperText={passwordError.message}
                autoComplete="current-password"
              />
              {showError ? (
                <Alert
                  onClose={() => {
                    setError(false);
                  }}
                  severity="error"
                >
                  {errorMessage}
                </Alert>
              ) : null}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid item xs>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Footer sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
