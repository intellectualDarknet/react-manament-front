import Avatar from '@mui/material/Avatar';
import pictV from './../../assets/img/Veronika.jpg';
import pictA from './../../assets/img/Alexey.jpg';
import pictI from './../../assets/img/Ivan.jpg';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <AppBar position="absolute" color="secondary" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar>
        <Box sx={{ flexGrow: 2, display: { xs: 'none', md: 'flex' }, justifyContent: 'start' }}>
          <a href="https://rs.school/">
            <Typography textAlign="center">RS SCHOOL</Typography>
          </a>
        </Box>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'space-between' }}>
          <a href="https://github.com/Legat14">
            <Avatar alt="Remy Sharp" src={pictI} />
          </a>
          <a href="https://github.com/intellectualDarknet">
            <Avatar alt="Remy Sharp" src={pictA} />
          </a>
          <a href="https://github.com/veronicavoevodina">
            <Avatar alt="Remy Sharp" src={pictV} />
          </a>
        </Box>
        <Box sx={{ flexGrow: 2, display: { xs: 'none', md: 'flex' }, justifyContent: 'end' }}>
          <Typography textAlign="center">2022</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
