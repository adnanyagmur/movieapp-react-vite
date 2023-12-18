import { Typography, Link, Container } from '@mui/material';

export const Footer =(darkMode:boolean)=> {
    const footerStyle = {
        marginTop: 'auto',
        backgroundColor: darkMode ? '#333' : '#f5f5f5', // Dark mode için arka plan rengi
        color: darkMode ? '#fff' : '#333', // Dark mode için metin rengi
        padding: '20px 0',
      };
    
      return (
        <footer style={footerStyle}>
          <Container maxWidth="sm">
            <Typography variant="body2" color="textSecondary" align="center">
              &copy; {new Date().getFullYear()} Adnan Yağmur
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
              <Link color="inherit" href="mailto:adnan.yagmur.2008@gmail.com">
                adnan.yagmur.2008@gmail.com
              </Link>
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
              Film bilgileri, TMDB'den alınmıştır.
            </Typography>
          </Container>
        </footer>
      );
    };