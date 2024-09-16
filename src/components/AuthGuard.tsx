import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import store from '../store/store';
import { checkToken } from '../store/slices/authAction';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const isAuthInProgress = useSelector((state: RootState) => state.auth.isAuthInProgress);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = new Promise<void>((resolve, reject) => {
      if (!isAuth && !isAuthInProgress) {
        console.log(3);
        store.dispatch(checkToken()).then(() => {
          resolve();
        }).catch((error) => {
          reject(error);
        });
      } else {
        resolve();
      }
    });
    console.log(2);
    checkAuth.then(() => {
      if (!isAuth && !isAuthInProgress) {
        console.log(1);
        navigate('/');
      }
    }).catch((error) => {
      console.error("Error during authentication check: ", error);
    });
  }, []);
  
  if (isAuthInProgress) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AuthGuard;
