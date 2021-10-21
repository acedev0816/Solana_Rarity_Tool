import Routes from "./routes";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppBar, Box, Toolbar, Container, Typography } from "@mui/material";
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
const theme = createTheme();
function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* <AppBar position = "relative">
        <Toolbar>
          <ImageSearchIcon sx={{mr:1}} />
          <Typography variant="h6" color="inherit" noWrap>
            Rarity Tool
          </Typography>
        </Toolbar>
      </AppBar> */}
      <main>
        <Box>
          <Container maxWidth="md">
            <Routes />
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
}

export default App;
