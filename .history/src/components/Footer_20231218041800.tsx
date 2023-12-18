import { Typography, Link, Container, Stack } from "@mui/material";

export const Footer = () => {
  return (
    <Container maxWidth="sm">
      <Stack spacing={2} justifyContent="center">
        <Typography variant="body2" align="center">
          &copy; {new Date().getFullYear()} Adnan Yağmur
        </Typography>
        <Typography variant="body2" align="center">
          <Link color="inherit" href="mailto:adnan.yagmur.2008@gmail.com">
            adnan.yagmur.2008@gmail.com
          </Link>
        </Typography>
        <Typography variant="body2" align="center">
          Film bilgileri, TMDB'den alınmıştır.
        </Typography>
      </Stack>
    </Container>
  );
};
