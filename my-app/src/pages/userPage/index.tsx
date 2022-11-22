import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { FormEvent, useEffect, useState } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import './style.scss';
import { useAppSelector, RootState, useAppDispatch } from 'store/store';
import { getUserById, updateUserById, deleteUserById, getUsers } from 'store/users/users-thunks';
import { IUsersState } from 'store/users/users-slice';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { logout } from 'store/auth/auth-slice';
import { useNavigate } from 'react-router';
import DeleteModal from './../../components/deleteModal';

type User = {
  name: string;
  password: string;
  login: string;
};
const User = () => {
  const navigate = useNavigate();
  const [user, SetUser] = useState<User>({ name: '', login: '', password: '' });
  const [open, setOpen] = useState<boolean>(false);
  const userId: string = useAppSelector((state: RootState) => state.rootReducer.authReducer.userId);
  const userState: IUsersState = useAppSelector((state: RootState) => state.rootReducer.usersReducer);
  const dispatch = useAppDispatch();

  const onSigninSubmit = () => {
    dispatch(updateUserById({ userId, ...user }));
    handleClose();
    SetUser({ name: '', login: '', password: '' });
  };
  const handleClose = () => {
    setOpen((open) => !open);
  };

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getUserById(userId));
  }, [dispatch, userId, userState.userById]);
  function deleteUser() {
    (async () => {
      dispatch(deleteUserById(userId));
    })()
      .then(() => dispatch(logout()))
      .then(() => {
        navigate('/', { replace: true });
      });
  }
  return (
    <Box
      className="userPage"
      sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Grid
        item
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '500px',
          minWidth: '400px',
          padding: '20px',
        }}
        component={Paper}
        square
      >
        <Typography variant="h5" component="h2">
          User data:
        </Typography>
        {userState.userById ? (
          <>
            <Typography variant="h5" component="h4">
              Name: {userState.userById.name}
            </Typography>

            <Typography variant="h5" component="h4">
              Login: {userState.userById.login}
            </Typography>
          </>
        ) : (
          <></>
        )}

        <Typography variant="h5" component="h4">
          Id: {userId}
        </Typography>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ marginBottom: '10px' }}
          onClick={handleClose}
        >
          Edit
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>EDIT PROFILE</DialogTitle>
          <DialogContent>
            <ValidatorForm
              className="userPage__form"
              onError={(errors) => console.log(errors)}
              onSubmit={onSigninSubmit}
              noValidate
            >
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
                validators={['required', 'minStringLength:3', 'maxStringLength:12', 'matchRegexp:^[a-zA-Zа-яА-Я]+$']}
                errorMessages={[
                  'this field is required',
                  'name should be more than 2 symbols and less than 12',
                  'name should be more than 2 symbols and less than 12',
                  'name should contain only letters',
                ]}
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
                validators={['required', 'minStringLength:3', 'maxStringLength:12', 'matchRegexp:^[a-zA-Zа-яА-Я]+$']}
                errorMessages={[
                  'this field is required',
                  'login should be more than 2 symbols and less than 12',
                  'login should be more than 2 symbols and less than 12',
                  'login should contain only letters',
                ]}
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
              <Button sx={{ color: 'black' }} onClick={handleClose}>
                Cancel
              </Button>
              <Button sx={{ color: 'black' }} type="submit">
                Submit
              </Button>
            </ValidatorForm>
          </DialogContent>
        </Dialog>
        <DeleteModal message="This user will be deleted. Are you sure?" submit={deleteUser} />
      </Grid>
    </Box>
  );
};
export default User;
