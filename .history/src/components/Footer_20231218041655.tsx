import { Typography, Link, Container } from '@mui/material';

export const Footer =()=> {
  
    
      return (
     
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
    
      );
    };