import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { FormEvent, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Link } from 'react-router-dom';

const Authorization = () => {
  const [email, SetEmail] = useState<string>('');
  const [login, SetLogin] = useState<string>('');
  const [password, SetPassword] = useState<string>('');
  const [repeat, SetRepeat] = useState<string>('');

  const onSigninSubmit = () => {
    console.log('hi');
  };
  function onEmailChange(e: FormEvent<HTMLFormElement>) {
    if ((e.target as HTMLInputElement).id === 'email') {
      SetEmail((e.target as HTMLInputElement).value);
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
  ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
    if (value !== password) {
      return false;
    }
    return true;
  });
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
          Sign up
        </Typography>
        <TextValidator
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
          validators={['required', 'minStringLength:3', 'maxStringLength:12', 'matchRegexp:^[a-zA-Zа-яА-Я]+$']}
          errorMessages={[
            'this field is required',
            'login should be more than 3 symbols and less than 12',
            'login should be more than 3 symbols and less than 12',
            'login should contain only letters',
          ]}
        />
        <TextValidator
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="email"
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
          value={password}
          validators={['required', 'minStringLength:8', 'maxStringLength:15']}
          errorMessages={[
            'this field is required',
            'password should be more than 8 symbols and less than 15',
            'paswword should be more than 8 symbols and less than 15',
          ]}
        />
        <TextValidator
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="repeat"
          label="Repeat password"
          type="password"
          id="repeat"
          value={repeat}
          validators={['isPasswordMatch', 'required']}
          errorMessages={['password mismatch', 'this field is required']}
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
      </ValidatorForm>
    </Grid>
  );
};

export default Authorization;
