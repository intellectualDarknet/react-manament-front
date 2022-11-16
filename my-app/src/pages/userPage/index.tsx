import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { FormEvent, useState } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import './style.scss';

type User = {
  name: string;
  password: string;
  login: string;
};
const User = () => {
  const [user, SetUser] = useState<User>({ name: '', login: '', password: '' });
  const onSigninSubmit = () => {
    console.log('hi');
  };
  return (
    <Box
      className="userPage"
      sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Grid
        item
        sx={{ display: 'flex', justifyContent: 'center', width: '500px', minWidth: '400px', padding: '20px' }}
        component={Paper}
        square
      >
        <ValidatorForm
          className="userPage__form"
          fullWidth
          onError={(errors) => console.log(errors)}
          onSubmit={onSigninSubmit}
          noValidate
        >
          <Typography variant="h5" component="h2">
            EDIT PROFILE
          </Typography>
          <TextValidator
            variant="outlined"
            sx={{ width: '100%' }}
            margin="normal"
            required
            fullWidth
            id="name"
            label="name"
            name="name"
            autoComplete="name"
            autoFocus
            value={user.name}
            validators={['required']}
            errorMessages={['this field is required']}
            onChange={(e: FormEvent<HTMLFormElement>) => {
              SetUser({ ...user, name: (e.target as HTMLInputElement).value });
            }}
          />
          <TextValidator
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="login"
            label="login"
            name="login"
            autoComplete="login"
            autoFocus
            value={user.login}
            validators={['required']}
            errorMessages={['this field is required']}
            onChange={(e: FormEvent<HTMLFormElement>) => {
              SetUser({ ...user, login: (e.target as HTMLInputElement).value });
            }}
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
            value={user.password}
            validators={['required', 'minStringLength:8', 'maxStringLength:15']}
            errorMessages={[
              'this field is required',
              'password should be more than 8 symbols and less than 15',
              'paswword should be more than 8 symbols and less than 15',
            ]}
            onChange={(e: FormEvent<HTMLFormElement>) => {
              SetUser({ ...user, password: (e.target as HTMLInputElement).value });
            }}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ marginBottom: '10px' }}>
            Submit
          </Button>
          <Button type="submit" fullWidth variant="contained" color="secondary" sx={{ marginBottom: '10px' }}>
            Delete user
          </Button>
        </ValidatorForm>
      </Grid>
    </Box>
  );
};
export default User;
