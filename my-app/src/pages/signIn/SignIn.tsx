import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const SignIn = () => {
  const [email, SetEmail] = useState<string>('');
  const [password, SetPassword] = useState<string>('');
  const onSigninSubmit = () => {
    console.log('hi');
  };
  function onEmailChange(e: FormEvent<HTMLFormElement>) {
    if ((e.target as HTMLInputElement).id === 'email') {
      SetEmail((e.target as HTMLInputElement).value);
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
      <ValidatorForm
        onError={(errors) => console.log(errors)}
        onSubmit={onSigninSubmit}
        onChange={onEmailChange}
        noValidate
        sx={{ width: '80%' }}
      >
        <Typography variant="h5" component="h2">
          Sign in
        </Typography>
        <TextValidator
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          validators={['required', 'isEmail']}
          errorMessages={['this field is required', 'email is not valid']}
        />
        <TextValidator
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
          validators={['required']}
          errorMessages={['this field is required']}
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
      </ValidatorForm>{' '}
    </Grid>
  );
};

export default SignIn;
