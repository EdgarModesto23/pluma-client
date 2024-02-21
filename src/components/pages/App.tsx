import { Note } from "@mui/icons-material";
import Board from "../structure/board.tsx";
import Layout from "../structure/side-bar.tsx";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#BD7ACE",
    },
    secondary: {
      main: "#EBF2FA",
    },
    mode: "dark",
    action: {
      hover: "#BD7ACE",
    },
  },
  typography: {
    fontFamily: "Lato",
    fontWeightLight: 400,
    fontWeightMedium: 600,
    fontWeightRegular: 500,
    fontWeightBold: 700,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Board>
          <Note />
        </Board>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
