import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useTheme,
  Button,
  Grid,
  Stack,
  Container,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import { useNavigate } from "react-router-dom";

type NavbarProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};
const Navbar = ({ darkMode, toggleDarkMode }: NavbarProps) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <AppBar
      position="sticky"
      color={theme.palette.mode === "light" ? "default" : "primary"}
    >
      <Container>
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Stack direction="row" sx={{ mt: 1 }}>
                <Button
                  variant="text"
                  color="inherit"
                  sx={{
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                  onClick={() => {
                    navigate("/");
                    window.location.reload();
                  }}
                >
                  <ThunderstormIcon sx={{ mr: 1 }} />

                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    RAIN Movie
                  </Typography>
                </Button>
              </Stack>
            </Grid>
            <Grid item>
              <Stack direction="row" gap={2}>
                <Button
                  color="inherit"
                  sx={{ fontWeight: "bold" }}
                  onClick={() => {
                    navigate("/");
                    window.location.reload();
                  }}
                >
                  Home Page
                </Button>
                <Button
                  color="inherit"
                  sx={{ fontWeight: "bold" }}
                  onClick={() => navigate("/favorite-list")}
                >
                  Favorite Movies
                </Button>

                <IconButton onClick={toggleDarkMode}>
                  {darkMode ? (
                    <Brightness7Icon sx={{ color: "#FFB534" }} />
                  ) : (
                    <Brightness4Icon sx={{ color: "#000" }} />
                  )}
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
