import { TextField, Button, Snackbar, CircularProgress, Backdrop } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useAuth } from '../Context/useAuth';

const LoginPage: React.FC = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    setCredentials(prevValue => ({
      ...prevValue,
      [id]: value,
    }));
  };

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!credentials.username || !credentials.password) {
      setSnackbarMessage('Пожалуйста, заполните все поля');
      setOpenSnackbar(true);
      return;
    }
    setLoading(true);
    const resp = await loginUser(credentials.username, credentials.password);
    setLoading(false);
    switch (resp) {
      case 'success':
        setSnackbarMessage('Greetings');
        break;
      case 'error':
        setSnackbarMessage('Произошла ошибка. Попробуйте позже.');
        setOpenSnackbar(true);
        break;
      case 'wrong credentials':
        setSnackbarMessage('Неверный логин или пароль');
        setOpenSnackbar(true);
        break;
      default:
        break;
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <main className='w-screen h-screen flex justify-center items-center'>
      <div className='flex gap-8 flex-col max-w-xl w-full justify-center min-w-80 rounded-md p-6'>
        <h1 className='mb-0'>Войти</h1>
        <TextField
          onChange={handleInputChange}
          id="username"
          variant='outlined'
          label="Введите логин"
          fullWidth
        />
        <TextField
          onChange={handleInputChange}
          id="password"
          variant='outlined'
          label="Введите пароль"
          fullWidth
        />
        <Button
          type='submit'
          onClick={onSubmit}
          variant='contained'
          size='large'
          className='self-end font-medium'
        >
          Далее
        </Button>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
        />
      </div>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </main>
  );
};

export default LoginPage;
