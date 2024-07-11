import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import axios from '../api/axios';
import { Container } from '@mui/system';
import {
  Typography,
  TextField,
  Button,
  CssBaseline,
  Box,
  Avatar,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const LOGIN_URL = '/auth/login';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Login = () => {
  const { setAuth } = useContext(AuthContext);

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  // const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  useEffect(() => {
    document.title = 'Login';
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      console.log(response.data);
      const accessToken = response?.data?.token;
      localStorage.setItem('userId', response?.data?.id);
      localStorage.setItem('firstName', response?.data?.firstName);
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser('');
      setPwd('');
      // console.log(auth)
      //setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else if (err.response?.status === 404) {
        setErrMsg('Incorrect Username');
      } else {
        setErrMsg('Login Failed');
      }
      //errRef.current.focus();
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <p
          ref={errRef}
          className={errMsg ? 'errmsg' : 'offscreen'}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
            fullWidth
            margin="normal"
            autoFocus
            label="Username"
            sx={{ bgcolor: 'white', borderRadius: '5px' }}
          />

          <TextField
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            label="Password"
            required
            fullWidth
            margin="normal"
            sx={{ bgcolor: 'white', borderRadius: '5px' }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
        Need an Account?
        <br />
        <Button>
          {/* < style={{ textDecoration: 'none' }} to="/sign-up">
              Sign Up
            </Link> */}
        </Button>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default Login;
