import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [name, SetName] = useState<string>('');
  const [password, SetPassword] = useState<string>('');
  const onSigninSubmit = () => {
    console.log('hi');
  };
  function onEmailChange(e: FormEvent<HTMLFormElement>) {
    if ((e.target as HTMLInputElement).id === 'name') {
      SetName((e.target as HTMLInputElement).value);
    }
    if ((e.target as HTMLInputElement).id === 'password') {
      SetPassword((e.target as HTMLInputElement).value);
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
          autoComplete="current-password"
          value={password}
        />
        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ marginBottom: '10px' }}>
          Submit
        </Button>
        <Grid container>
          <Grid item xs></Grid>
          <Grid item>
            <Link to="/Authorization">Not registered? Sign up</Link>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default SignIn;
