import { InputField, PasswordField } from '@/components/FormControls';
import { LogoColor } from '@/components/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, LinearProgress, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { LoginField } from '../../types';
import './styles.scss';

const defaultValues: LoginField = {
  identifier: '',
  password: '',
};

interface LoginFromProps {
  onSubmit?: (values: LoginField) => void;
}

export default function LoginForm({ onSubmit }: LoginFromProps) {
  const schema = yup.object({
    identifier: yup
      .string()
      .required('Please enter your email')
      .email('Please enter a valid email'),
    password: yup
      .string()
      .required('Please enter your password')
      .min(6, 'Please enter at least 6 characters'),
  });

  const form = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values: LoginField) => {
    if (!onSubmit) return;

    onSubmit(values);
  };

  const { isSubmitting } = form.formState;

  return (
    <Box
      sx={{
        marginTop: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
      }}
      className="login"
    >
      {isSubmitting && <LinearProgress sx={{ width: '100%', mb: '5px' }} />}

      <LogoColor className="logo" />

      <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
        Login
      </Typography>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="identifier" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ my: 2 }}
          color="primary"
          disabled={isSubmitting}
        >
          Login
        </Button>
      </form>
    </Box>
  );
}
