import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

const Authorization = () => {
  const [name, SetName] = useState<string>('');
  const [login, SetLogin] = useState<string>('');
  const [password, SetPassword] = useState<string>('');
  const [repeat, SetRepeat] = useState<string>('');

  const onSigninSubmit = () => {
    console.log('hi');
  };
  function onEmailChange(e: FormEvent<HTMLFormElement>) {
    if ((e.target as HTMLInputElement).id === 'name') {
      SetName((e.target as HTMLInputElement).value);
    }
    if ((e.target as HTMLInputElement).id === 'login') {
      SetLogin((e.target as HTMLInputElement).value);
    }
    if ((e.target as HTMLInputElement).id === 'password') {
      SetPassword((e.target as HTMLInputElement).value);
    }
    if ((e.target as HTMLInputElement).id === 'repeat') {
      SetRepeat((e.target as HTMLInputElement).value);
    }
  }
  return (
    <Grid
      item
      sx={{ display: 'flex', justifyContent: 'center', width: '40%', padding: '20px' }}
      component={Paper}
      square
    >
      <form onSubmit={onSigninSubmit} onChange={onEmailChange} noValidate>
        <Typography variant="h5" component="h2">
          Sign up
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="login"
          label="Login"
          name="login"
          autoComplete="login"
          autoFocus
          value={login}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
          autoFocus
          value={name}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={password}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="repeat"
          label="Repeat password"
          type="repeat"
          id="repeat"
          value={repeat}
        />
        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ marginBottom: '10px' }}>
          Submit
        </Button>
        <Grid container>
          <Grid item xs></Grid>
          <Grid item>
            <Link to="/SignIn">Already registered? Sign in</Link>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default Authorization;
