import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import mainPict from './../../assets/img/mainPicture1.jpg';
import { Link } from 'react-router-dom';
import { RootState, useAppSelector } from 'store/store';
import { useTranslation } from 'react-i18next';

const Start = () => {
  const { t } = useTranslation();
  const userId: string = useAppSelector((state: RootState) => state.rootReducer.authReducer.userId);
  return (
    <Grid
      container
      spacing={5}
      columns={15}
      sx={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', height: '100%', paddingTop: '5%' }}
    >
      <Grid item xs={5} sx={{ paddingTop: '2%' }}>
        <Typography variant="h4" gutterBottom>
          {t('main.heading')}
        </Typography>
        <Typography gutterBottom>{t('main.text')}</Typography>
        <Box sx={{ width: '70%', display: 'flex', justifyContent: 'space-between', paddingLeft: 5, paddingTop: 2 }}>
          {!userId ? (
            <>
              <Link to="/Sign-in">
                <Button variant="contained" endIcon={<PersonIcon />}>
                  {t('main.signIn')}
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button variant="contained" endIcon={<PersonAddIcon />}>
                  {t('main.signUp')}
                </Button>
              </Link>{' '}
            </>
          ) : (
            <Link to="/boards">
              <Button variant="contained">{t('main.boards')}</Button>
            </Link>
          )}
        </Box>
      </Grid>
      <Grid item xs={4} sx={{ height: '100%' }}>
        <img src={mainPict} alt="main picture" height="100%" />
      </Grid>
    </Grid>
  );
};

export default Start;
