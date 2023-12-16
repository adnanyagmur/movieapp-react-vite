import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useTheme,
  InputBase,
  Button,
  Grid,
  Stack,
  Container,
} from "@mui/material";
//import MenuIcon from "@mui/material/Icon";
import SearchIcon from "@mui/icons-material/Search";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import TheatersIcon from "@mui/icons-material/Theaters";
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
      position="static"
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
                    '&:hover': {
                      backgroundColor: 'transparent', // veya başka bir uygun renk
                    },
                  }}
                  onClick={() => navigate("/")}
                >
                  <ThunderstormIcon sx={{ mr: 1 }} />

                  <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                    RAIN Movie
                  </Typography>
                </Button>
              </Stack>
            </Grid>
            {/*   <Grid item>
            <Stack direction="row">
              <TheatersIcon style={{ margin: 0 }} />
              <SearchIcon style={{ margin: 0 }} />
              <InputBase
                placeholder="Search..."
                style={{ color: "inherit", flexGrow: 1, width: "100%" }}
                inputProps={{ "aria-label": "search" }}
              />
            </Stack>
          </Grid> */}
            <Grid item>
            <Stack direction="row" gap={2}>
              <Button color="inherit" onClick={() => navigate("/")}>
                Home Page
              </Button>
              <Button
                color="inherit"
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
