import { TextField, Button } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticateUser } from '../store/slices/authSlice';
import { RootState } from '../store/store';
import { bindActionCreators } from 'redux';
import { useNavigate } from 'react-router-dom';
// import DocsService from '../API/DocsService';


const LoginPage: React.FC = ({}) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const dispatch = useDispatch();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const navigate = useNavigate()

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    setCredentials(prevValue => ({
      ...prevValue,
      [id]: value,
    }));
  };

  useEffect(() => {
    // dispatch(successAuth())
    if (isAuth === true) {
      navigate('/')
    }
  }, [isAuth])

  const onSubmit = async () => {
    const boundAuthenticateUser = bindActionCreators(authenticateUser, dispatch);
    boundAuthenticateUser(credentials.username, credentials.password);

    // const resp = await DocsService.getDocs()
    // console.log("LoginPage", resp, 3);
  };

  return (
    <main className='w-screen h-screen flex justify-center items-center'>
      <div className='flex gap-8 flex-col max-w-xl w-full justify-center min-w-80 rounded-md p-6'>
        <h1 className='mb-0'>Войти</h1>
        <TextField onChange={handleInputChange} id="username" variant='outlined' label="Введите логин" fullWidth />
        <TextField onChange={handleInputChange} id="password" variant='outlined' label="Введите пароль" fullWidth />
        <Button onClick={onSubmit} variant='contained' size='large' className='self-end font-medium'>Далее</Button>
      </div>
    </main>
  )
}

export default LoginPage
