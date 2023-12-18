import { Typography, Link, Container, Stack } from '@mui/material';
type FooterProps ={
    darkMode: boolean;
  }
  
  export const Footer: React.FC<FooterProps> = ({ darkMode }) => {
    const footerStyle = {
      marginTop: "auto",
      backgroundColor: darkMode ? '#333' : '#f5f5f5',
      color: darkMode ? '#fff' : '#333',
      padding: '20px 0',
    };
  
    return (
      <footer style={footerStyle}>
        <Container maxWidth="sm" sx={{mt:2}}>
          <Stack spacing={2} justifyContent="center">
            <Typography variant="body2" align="center">
              &copy; {new Date()?.getFullYear()} Adnan Yağmur
            </Typography>
            <Typography variant="body2" align="center">
              <Link color="inherit" href="mailto:adnan.yagmur.2008@gmail.com">
                adnan.yagmur.2008@gmail.com
              </Link>
            </Typography>
            <Typography variant="body2" align="center">
            Movie information has been obtained from TMDB.
            </Typography>
          </Stack>
        </Container>
      </footer>
    );
  };