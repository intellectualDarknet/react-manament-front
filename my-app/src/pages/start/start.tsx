import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import './start.scss';
import { Link } from 'react-router-dom';
import { RootState, useAppSelector } from 'store/store';
import { useTranslation } from 'react-i18next';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import pictV from './../../assets/img/Veronika.jpg';
import pictA from './../../assets/img/Alexey.jpg';
import pictI from './../../assets/img/Ivan.jpg';
import pictT from './../../assets/img/Taras.jpg';

const team = [
  { picture: pictI, name: 'ivan', link: 'https://github.com/Legat14' },
  { picture: pictV, name: 'veronika', link: 'https://github.com/veronicavoevodina' },
  { picture: pictA, name: 'alexey', link: 'https://github.com/intellectualDarknet' },
  { picture: pictT, name: 'taras', link: '' },
];

const Start = () => {
  const { t } = useTranslation();
  const userId: string = useAppSelector((state: RootState) => state.rootReducer.authReducer.userId);
  const proceedLink = (link: string): void => {
    window.location.href = link;
  };
  return (
    <>
      <Grid
        className="start-page"
        container
        spacing={5}
        columns={15}
        sx={{ display: 'flex', justifyContent: 'flex-start', width: '100%', margin: 0, minHeight: '100vh' }}
      >
        <Grid item xs={5} sx={{ marginTop: '5%', marginLeft: '10%', padding: 0 }}>
          <Typography variant="h4" gutterBottom>
            {t('main.heading')}
          </Typography>
          <Typography gutterBottom>{t('main.text')}</Typography>
          <Box sx={{ width: '80%', display: 'flex', justifyContent: 'space-between' }}>
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
      </Grid>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '30px',
          alignItems: 'center',
          justifyContent: 'space-around',
          minHeight: '60vh',
        }}
      >
        <Typography variant="h4" gutterBottom>
          {t('main.team')}
        </Typography>
        <Box sx={{ width: '93%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
          {team.map((el) => (
            <Card
              onClick={() => proceedLink(el.link)}
              sx={{ maxWidth: '300px', height: '350px', margin: '10px', display: 'flex' }}
              key={el.name}
            >
              <CardActionArea>
                <CardMedia component="img" height="170" image={el.picture} alt="green iguana" />
                <CardContent sx={{ margin: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {t(`main.${el.name}`)}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {t(`main.descr${el.name}`)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t(`main.text${el.name}`)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Start;
