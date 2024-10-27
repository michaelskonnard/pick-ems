import { useRef, useState, useEffect } from 'react';
import axios from '../api/axios';
import { Container } from '@mui/system';
import {
  Box,
  CssBaseline,
  Typography,
  Link,
  Avatar,
  Grid,
  TextField,
  Button,
  FormHelperText,
  Alert,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const NAMES_REGEX = /^[a-zA-Z0-9_-]+$/;
const PHONE_REGEX =
  /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?[\d\s.-]{3,15}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PWD_REGEX =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
const REGISTER_URL = '/auth/register';

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

const theme = createTheme();

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [validPhone, setValidPhone] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [pwdError, setPwdError] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidUsername(NAMES_REGEX.test(username));
    if (validUsername) {
      setUsernameError(false);
    }
  }, [username]);

  useEffect(() => {
    setValidPhone(PHONE_REGEX.test(phone));
    if (validPhone) {
      setPhoneError(false);
    }
  }, [phone]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
    if (validEmail) {
      setEmailError(false);
    }
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
    if (validPwd) {
      setPwdError(false);
    }
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [email, username, phone, pwd, matchPwd]);

  useEffect(() => {
    document.title = 'Register';
  }, []);

  const handleSubmit = async (e) => {
    //console.log("submit")
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = EMAIL_REGEX.test(email);
    const v2 = NAMES_REGEX.test(username);
    const v3 = NAMES_REGEX.test(phone);
    const v4 = PWD_REGEX.test(pwd);
    if (!v1 || !v2 || !v3 || !v4) {
      let message = '';
      if (!v1) {
        setEmailError(true);
      } else if (!v2) {
        setUsernameError(true);
      } else if (!v3) {
        setPhoneError(true);
      } else if (!v4) {
        setPwdError(true);
      }
      setErrMsg('Invalid Entry');
      console.log(errMsg);
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          email: email,
          username: username,
          phone: phone,
          password: pwd,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      setSuccess(true);
      //clear state and controlled inputs
      setUsername('');
      setEmail('');
      setPwd('');
      setMatchPwd('');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Email already in use.');
      } else {
        setErrMsg('Registration Failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
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
            {success ? (
              <>
                <Typography variant="h5" component="h1">
                  Success!
                </Typography>
                <Link href="/login">Sign In</Link>
              </>
            ) : (
              <>
                {errMsg ? (
                  <Alert
                    severity="warning"
                    ref={errRef}
                    className={errMsg ? 'errmsg' : 'offscreen'}
                    aria-live="assertive"
                  >
                    {errMsg}
                  </Alert>
                ) : null}
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        error={usernameError}
                        type="text"
                        id="username"
                        autoComplete="off"
                        label="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        sx={{ bgcolor: 'white', borderRadius: '5px' }}
                        fullWidth
                        required
                        aria-invalid={
                          validUsername ? 'false' : 'true'
                        }
                        aria-describedby="uidnote"
                        onFocus={() => setUsernameFocus(true)}
                        onBlur={() => setUsernameFocus(false)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        error={phoneError}
                        type="text"
                        id="phone"
                        label="Phone"
                        autoComplete="off"
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                        sx={{ bgcolor: 'white', borderRadius: '5px' }}
                        fullWidth
                        required
                        aria-invalid={validPhone ? 'false' : 'true'}
                        aria-describedby="uidnote"
                        onFocus={() => setPhoneFocus(true)}
                        onBlur={() => setPhoneFocus(false)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        error={emailError}
                        type="text"
                        id="email"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        sx={{ bgcolor: 'white', borderRadius: '5px' }}
                        label="Email Address"
                        required
                        fullWidth
                        aria-invalid={validEmail ? 'false' : 'true'}
                        aria-describedby="uidnote"
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        error={pwdError}
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        label="Password"
                        sx={{ bgcolor: 'white', borderRadius: '5px' }}
                        required
                        fullWidth
                        aria-invalid={validPwd ? 'false' : 'true'}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                      />
                      <FormHelperText>
                        8 characters long <br></br>
                        Contains at least one digit (0-9) <br></br>
                        Contains at least one lowercase letter (a-z)
                        <br></br>
                        Contains at least one uppercase letter (A-Z)
                        <br></br>
                        Contains at least one special character
                        (!@#$%^&*)<br></br>
                      </FormHelperText>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        error={!validMatch}
                        type="password"
                        id="confirm_pwd"
                        label="Confirm Password"
                        sx={{ bgcolor: 'white', borderRadius: '5px' }}
                        onChange={(e) => setMatchPwd(e.target.value)}
                        value={matchPwd}
                        required
                        fullWidth
                        aria-invalid={validMatch ? 'false' : 'true'}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                      />
                    </Grid>
                  </Grid>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    //disabled={!validEmail || !validPwd || !validMatch ? true : false}
                  >
                    Sign Up
                  </Button>
                </Box>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </>
            )}
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Register;
