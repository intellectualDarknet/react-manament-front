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
import { useTranslation } from 'react-i18next';

interface ISignUpForm {
  name: string;
  login: string;
  password: string;
  repeat: string;
}

const SignUpPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const auth: IAuthState = useAppSelector((state: RootState) => state.rootReducer.authReducer);
  const dispatch = useAppDispatch();
  const [formValues, setFormValues] = useState<ISignUpForm>({ name: '', login: '', password: '', repeat: '' });

  const onSignUpSubmit = () => {
    dispatch(signUp({ name: formValues.name, login: formValues.login, password: formValues.password }))
      .unwrap()
      .then(() => {
        navigate('/sign-in', { replace: true });
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
            {t('auth.signUp')}
          </Typography>
          <TextValidator
            autoComplete="off"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="login"
            label={t('user.login')}
            name="login"
            autoFocus
            value={formValues.login}
            validators={['required', 'minStringLength:3', 'maxStringLength:12', 'matchRegexp:^[a-zA-Zа-яА-Я]+$']}
            errorMessages={[
              t('user.errorRequired'),
              t('user.errorLength', {
                itemRu: 'Логин',
                item: 'Login',
                should: 'should',
                shouldRu: 'должен',
                minCount: '2',
                maxCount: '13',
              }),
              t('user.errorLength', {
                itemRu: 'Логин',
                item: 'Login',
                should: 'should',
                shouldRu: 'должен',
                minCount: '2',
                maxCount: '13',
              }),
              t('user.errorLetters'),
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
            label={t('user.name')}
            name="name"
            autoFocus
            value={formValues.name}
            validators={['required', 'minStringLength:3', 'maxStringLength:12', 'matchRegexp:^[a-zA-Zа-яА-Я]+$']}
            errorMessages={[
              t('user.errorRequired'),
              t('user.errorLength', {
                itemRu: 'Имя',
                item: 'Name',
                should: 'should',
                shouldRu: 'должно',
                minCount: '2',
                maxCount: '13',
              }),
              t('user.errorLength', {
                itemRu: 'Имя',
                item: 'Name',
                should: 'should',
                shouldRu: 'должно',
                minCount: '2',
                maxCount: '13',
              }),
              t('user.errorLetters'),
            ]}
            disabled={auth.signUpLoading}
          />
          <TextValidator
            autoComplete="off"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={t('user.password')}
            type="password"
            id="password"
            value={formValues.password}
            validators={['required', 'minStringLength:8', 'maxStringLength:15']}
            errorMessages={[
              t('user.errorRequired'),
              t('user.errorLength', {
                itemRu: 'Пароль',
                item: 'Password',
                should: 'should',
                shouldRu: 'должен',
                minCount: '7',
                maxCount: '16',
              }),
              t('user.errorLength', {
                itemRu: 'Пароль',
                item: 'Password',
                should: 'should',
                shouldRu: 'должен',
                minCount: '7',
                maxCount: '16',
              }),
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
            label={t('user.repeat')}
            type="password"
            id="repeat"
            value={formValues.repeat}
            validators={['isPasswordMatch', 'required']}
            errorMessages={[t('auth.mismatch'), t('user.errorRequired')]}
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
            {t('auth.register')}
          </LoadingButton>

          <div className="signup__bottom">
            <div className="signup__bottom-reg">{t('auth.alreadyRegistered')}</div>
            <Link className="signup__bottom-link" to="/sign-in">
              {t('auth.signIn')}
            </Link>
            <div className="signin__bottom-reg">{t('auth.backToMain')}</div>
            <Link className="signin__bottom-link" to="/">
              {t('auth.main')}
            </Link>
          </div>
        </ValidatorForm>
      </Grid>
    </>
  );
};

export default SignUpPage;
