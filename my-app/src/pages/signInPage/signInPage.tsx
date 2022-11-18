import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { RootState, useAppDispatch, useAppSelector } from 'store/store';
import { getIcon } from 'components/icon/icon';
import { signIn } from 'store/auth/auth-thunks';
import './signInPage.scss';
import { IAuthState } from 'store/auth/auth-slice';

interface ISignInForm {
  login: string;
  password: string;
}

const SignInPage = () => {
  const navigate = useNavigate();
  const auth: IAuthState = useAppSelector((state: RootState) => state.rootReducer.authReducer);
  const dispatch = useAppDispatch();
  const [formValues, setFormValues] = useState<ISignInForm>({ login: '', password: '' });
  const onSigninSubmit = () => {
    dispatch(signIn(formValues))
      .unwrap()
      .then(() => {
        navigate('/', { replace: true });
      });
  };

  function onFormChange(e: FormEvent<HTMLFormElement>) {
    const field = (e.target as HTMLInputElement).id;
    const value = (e.target as HTMLInputElement).value;
    setFormValues((formValues) => {
      return {
        ...formValues,
        [field]: value,
      };
    });
  }

  return (
    <Grid
      item
      sx={{ display: 'flex', justifyContent: 'center', width: '40%', padding: '20px' }}
      component={Paper}
      square
      className="signin"
    >
      <ValidatorForm
        onError={(errors) => console.log(errors)}
        onSubmit={onSigninSubmit}
        onChange={onFormChange}
        noValidate
        sx={{ width: '80%' }}
      >
        <Typography variant="h5" component="h2">
          Sign in
        </Typography>
        <TextValidator
          autoComplete="off"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="login"
          label="Login"
          name="login"
          autoFocus
          value={formValues.login}
          validators={['required']}
          errorMessages={['this field is required', 'login is not valid']}
          disabled={auth.signInLoading}
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
          autoComplete="off"
          value={formValues.password}
          validators={['required']}
          errorMessages={['this field is required']}
          disabled={auth.signInLoading}
        />
        <LoadingButton
          fullWidth
          variant="contained"
          color="primary"
          sx={{ marginBottom: '10px' }}
          type="submit"
          // endIcon={<SendIcon />}
          disabled={auth.signInLoading}
          loading={auth.signInLoading}
          loadingPosition="center"
        >
          Sign In
        </LoadingButton>
        <div className="signin__bottom">
          <div className="signin__bottom-reg">Not registered?</div>
          <Link className="signin__bottom-link" to="/sign-up">
            Sign up
          </Link>
          <div className="signin__bottom-reg">Back to main page</div>
          <Link className="signin__bottom-link" to="/">
            Main page
          </Link>
        </div>
      </ValidatorForm>{' '}
    </Grid>
  );
};

export default SignInPage;
