import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { signUp } from 'store/auth/auth-thunks';
import { FormEvent, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Link, useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch, useAppSelector } from 'store/store';
import './signUpPage.scss';
import { IAuthState } from './../../store/auth/auth-slice';
import LoadingButton from '@mui/lab/LoadingButton';
interface ISignUpForm {
  name: string;
  login: string;
  password: string;
  repeat: string;
}

const SignUpPage = () => {
  const navigate = useNavigate();
  const auth: IAuthState = useAppSelector((state: RootState) => state.rootReducer.authReducer);
  const dispatch = useAppDispatch();
  const [formValues, setFormValues] = useState<ISignUpForm>({ name: '', login: '', password: '', repeat: '' });

  const onSignUpSubmit = () => {
    dispatch(signUp({ name: formValues.name, login: formValues.login, password: formValues.password }))
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

  ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
    if (value !== formValues.password) {
      return false;
    }
    return true;
  });
  return (
    <>
      <Grid
        className="signup"
        item
        sx={{ display: 'flex', justifyContent: 'center', width: '40%', padding: '20px' }}
        component={Paper}
        square
      >
        <ValidatorForm
          onError={(errors) => console.log(errors)}
          onSubmit={onSignUpSubmit}
          onChange={onFormChange}
          noValidate
          sx={{ width: '80%' }}
        >
          <Typography variant="h5" component="h2">
            Sign up
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
            validators={['required', 'minStringLength:3', 'maxStringLength:12', 'matchRegexp:^[a-zA-Zа-яА-Я]+$']}
            errorMessages={[
              'this field is required',
              'login should be more than 2 symbols and less than 12',
              'login should be more than 2 symbols and less than 12',
              'login should contain only letters',
            ]}
            disabled={auth.signUpLoading}
          />
          <TextValidator
            autoComplete="off"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="name"
            name="name"
            autoFocus
            value={formValues.name}
            validators={['required']}
            errorMessages={['this field is required']}
            disabled={auth.signUpLoading}
          />
          <TextValidator
            autoComplete="off"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={formValues.password}
            validators={['required', 'minStringLength:8', 'maxStringLength:15']}
            errorMessages={[
              'this field is required',
              'password should be more than 8 symbols and less than 15',
              'paswword should be more than 8 symbols and less than 15',
            ]}
            disabled={auth.signUpLoading}
          />
          <TextValidator
            autoComplete="off"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="repeat"
            label="Repeat password"
            type="password"
            id="repeat"
            value={formValues.repeat}
            validators={['isPasswordMatch', 'required']}
            errorMessages={['password mismatch', 'this field is required']}
            disabled={auth.signUpLoading}
          />

          <LoadingButton
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginBottom: '10px' }}
            type="submit"
            // endIcon={<SendIcon />}
            disabled={auth.signUpLoading}
            loading={auth.signUpLoading}
            loadingPosition="center"
          >
            Register
          </LoadingButton>

          <div className="signup__bottom">
            <div className="signup__bottom-reg">Already registered?</div>
            <Link className="signup__bottom-link" to="/sign-in">
              Sign in
            </Link>
            <div className="signin__bottom-reg">Back to main page</div>
            <Link className="signin__bottom-link" to="/">
              Main page
            </Link>
          </div>
        </ValidatorForm>
      </Grid>
    </>
  );
};

export default SignUpPage;
