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
import Avatar from "@mui/material/Avatar";
import FormControlLabel from "@mui/material/FormControlLabel";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import { useAuth } from "../auth/Auth";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../auth/User";

interface CreateUser {
  name: string;
  email: string;
  username: string;
  password: string;
}

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

export default function Register() {
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
  const [usernameError, setUsernameError] = React.useState({
    show: false,
    message: "",
  });
  const [nameError, setNameError] = React.useState({
    show: false,
    message: "",
  });

  function fieldValidator(data: CreateUser) {
    if (data.email == "") {
      setEmailError({ show: true, message: "This field is required" });
    } else {
      setEmailError({ show: false, message: "" });
    }
    if (data.password == "") {
      setPasswordError({ show: true, message: "This field is required" });
    } else {
      setPasswordError({ show: false, message: "" });
    }
    if (data.username == "") {
      setUsernameError({ show: true, message: "This field is required" });
    } else {
      setUsernameError({ show: false, message: "" });
    }
    if (data.name == "") {
      setNameError({ show: true, message: "This field is required" });
    } else {
      setNameError({ show: false, message: "" });
    }
  }

  const handleError = (error: string) => {
    setErrorMessage(error);
    setError(true);
  };

  function joinErrors(obj: object, separator = ": ") {
    // Handle empty object gracefully
    if (Object.keys(obj).length === 0) {
      return "";
    }

    // Convert non-string values to strings for consistent separation
    const stringifiedObj = {};
    for (const [key, value] of Object.entries(obj)) {
      stringifiedObj[key] = String(value);
    }

    // Use map and join for efficiency and clarity
    return Object.entries(stringifiedObj)
      .map(([key, value]) => `${key}${separator}${value}\n`)
      .join("\n");
  }
  const token = useAuth();
  const navigate = useNavigate();
  const user = useUserInfo();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = import.meta.env.VITE_API_URL + "user/register/";
    const form = new FormData(event.currentTarget);
    const data = JSON.stringify(Object.fromEntries(form.entries()));
    const dataObj = JSON.parse(data);
    dataObj["name"] = dataObj["firstName"] + dataObj["lastName"];

    delete dataObj["firstName"], dataObj["lastName"];
    fieldValidator(dataObj);
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
        const error_data = joinErrors(error.response.data);
        handleError(error_data);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Logo />
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  error={nameError.show}
                  helperText={nameError.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  error={usernameError.show}
                  helperText={usernameError.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={emailError.show}
                  helperText={emailError.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={passwordError.show}
                  helperText={passwordError.message}
                />
              </Grid>
            </Grid>
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
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Footer sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
