import React, { FC, useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import './AuthorizationPage.css';
import { Box, Button, Grid } from '@mui/material';
import { IAuthorizationPayload } from './IAuthorization';
import { encryptPassword } from './Authorization.action';
import authorizationService from './Authorization.service';
import { IResponse } from '../Helpers/IHelpers';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/material/styles';
import { toast } from 'react-toastify';

export const AuthorizationPage: FC<any> = () => {
  const notifySuccess = () => toast('Log');
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const userNameRef = useRef('');
  const userPasswordRef = useRef('');
  const navigate = useNavigate();

  const [isDisabled, setIsDisabled] = useState(true);
  const [isInFlight, setIsInFlight] = useState(false);
  const payloadRef = useRef({} as IAuthorizationPayload);

  useEffect(() => {
    if (userName && userPassword) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [userName, userPassword]);

  const handleUserNameInputChange = (e: any) => {
    const inputValue = e.target?.value;
    userNameRef.current = inputValue;
    payloadRef.current.userName = userNameRef.current;
    setUserName(userNameRef.current);
  };

  const handleUserPasswordChange = (e: any) => {
    const inputValue = e.target?.value;
    userPasswordRef.current = inputValue;
    payloadRef.current.userPassword = userPasswordRef.current;
    setUserPassword(userPasswordRef.current);
  };

  const onAuthorizeBtnClickHandler = async () => {
    setIsInFlight(true);
    payloadRef.current.userPassword = encryptPassword(
      payloadRef.current.userPassword,
    );

    await authorizationService
      .authorize(payloadRef.current)
      .then((result: IResponse) => {
        console.log('result', result);
        setIsInFlight(false);
        if (result.statusCode === 200) {
          sessionStorage.setItem('JWT', result.data);
          navigate('/landingPage');
          toast('🦄 Successfully Signed In');
        } else {
          toast.error('Unauthorized');
        }
      })
      .catch((error) => {
        console.log('Error Loging in: ', error);
        setIsInFlight(false);
      });
  };

  return (
    <div className=''>
      <div className='authorizationPage '>
        <div className='backgroundFull'></div>
        <div className='loginForm'>
          <Box className='gridContainer' sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <input
                  className='inputBox'
                  id='outlined-userName'
                  placeholder='Username'
                  onChange={handleUserNameInputChange}
                  value={userName}
                ></input>
              </Grid>
              <Grid item xs={12}>
                <input
                  className='inputBox'
                  id='outlined-Password'
                  placeholder='Password'
                  type={'password'}
                  onChange={handleUserPasswordChange}
                  value={userPassword}
                ></input>
              </Grid>
              <Grid item xs={12}>
                <div className='btnContainer'>
                  <button
                    className='signInBtn'
                    disabled={isDisabled || isInFlight}
                    onClick={onAuthorizeBtnClickHandler}
                  >
                    Sign In
                  </button>
                </div>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default AuthorizationPage;
