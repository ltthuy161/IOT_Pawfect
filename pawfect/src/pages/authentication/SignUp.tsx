import { ReactElement, Suspense, useState } from 'react';
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import signupBanner from '../../assets/authentication-banners/signup.png';
import IconifyIcon from '../../components/base/IconifyIcon';
import logo from '../../assets/logo/elegant-logo.png';
import Image from '../../components/base/Image';

import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignUp = (): ReactElement => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      await createUser(email, password);
      navigate('/authentication/login');
    } catch (e) {
      setError((e as Error).message);
      console.log((e as Error).message);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <Stack
      direction="row"
      bgcolor="background.paper"
      boxShadow={(theme) => theme.shadows[3]}
      height={591}
      width={{ md: 960 }}
    >
      <Stack width={{ md: 0.5 }} m={2.5} gap={10}>
        <Link href="/" width="fit-content">
          <Image src={logo} width={32.6} />
        </Link>
        <Stack alignItems="center" gap={2.5} width={330} mx="auto">
          <Typography variant="h3">Signup</Typography>
          <FormControl component="form" variant="standard" fullWidth onSubmit={handleSubmit}>
            <InputLabel shrink htmlFor="name">
              Name
            </InputLabel>
            <TextField
              variant="filled"
              placeholder="Enter your full name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ width: 16, height: 16 }}>
                    <IconifyIcon icon="mdi:user" width={1} height={1} />
                  </InputAdornment>
                ),
              }}
            />
            <InputLabel shrink htmlFor="email">
              Email
            </InputLabel>
            <OutlinedInput
              placeholder="Enter your email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              endAdornment={
                <InputAdornment position="end" sx={{ width: 16, height: 16 }}>
                  <IconifyIcon icon="ic:baseline-email" width={1} height={1} />
                </InputAdornment>
              }
              sx={{
                width: 1,
                backgroundColor: 'action.focus',
              }}
            />
            <InputLabel shrink htmlFor="password">
              Password
            </InputLabel>
            <TextField
              variant="filled"
              placeholder="********"
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{
                        color: 'text.secondary',
                      }}
                    >
                      {showPassword ? (
                        <IconifyIcon icon="ic:baseline-key-off" />
                      ) : (
                        <IconifyIcon icon="ic:baseline-key" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          <Button variant="contained" fullWidth type="submit">
            Sign up
          </Button>

          </FormControl>
          {error && <Typography variant="body2" color="error">{error}</Typography>}
          <Typography variant="body2" color="text.secondary">
            Already have an account?{' '}
            <Link
              href="/authentication/login"
              underline="hover"
              fontSize={(theme) => theme.typography.body1.fontSize}
            >
              Log in
            </Link>
          </Typography>
        </Stack>
      </Stack>
      <Suspense
        fallback={
          <Skeleton variant="rectangular" height={1} width={1} sx={{ bgcolor: 'primary.main' }} />
        }
      >
        <Image
          alt="Signup banner"
          src={signupBanner}
          sx={{
            width: 0.5,
            display: { xs: 'none', md: 'block' },
          }}
        />
      </Suspense>
    </Stack>
  );
};

export default SignUp;
