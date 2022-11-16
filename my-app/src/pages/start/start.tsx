import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import mainPict from './../../assets/img/mainPicture1.jpg';
import { Link } from 'react-router-dom';

const Start = () => {
  return (
    <Grid
      container
      spacing={5}
      columns={15}
      sx={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', height: '100%', paddingTop: '5%' }}
    >
      <Grid item xs={5} sx={{ paddingTop: '2%' }}>
        <Typography variant="h4" gutterBottom>
          PROJECT MANAGER APPLICATION
        </Typography>
        <Typography gutterBottom>
          is an easy and user-friendly platform that helps to organize your complex work easily and flexibly. You can
          automate and customize your workflow and avoid unnecessary meetings as communicating to your team members are
          easier with project manager application .
        </Typography>
        <Box sx={{ width: '70%', display: 'flex', justifyContent: 'space-between', paddingLeft: 5, paddingTop: 2 }}>
          <Link to="/Sign-in">
            <Button variant="contained" endIcon={<PersonIcon />}>
              Sign in
            </Button>
          </Link>
          <Link to="/sign-up">
            <Button variant="contained" endIcon={<PersonAddIcon />}>
              Sign up
            </Button>
          </Link>
        </Box>
      </Grid>
      <Grid item xs={4} sx={{ height: '100%' }}>
        <img src={mainPict} alt="main picture" height="100%" />
      </Grid>
    </Grid>
  );
};

export default Start;
