import { InputField, PasswordField } from '@/components/FormControls';
import { LogoColor } from '@/components/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, LinearProgress, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { RegisterField } from '../../types';
import './styles.scss';

const defaultValues: RegisterField = {
  fullName: '',
  email: '',
  password: '',
  retypePassword: '',
};

interface RegisterFormProps {
  onSubmit?: (values: RegisterField) => void;
}

function RegisterForm({ onSubmit }: RegisterFormProps) {
  const schema = yup.object({
    fullName: yup
      .string()
      .required('Please enter your fullname')
      .test(
        'should be at least 2 words',
        'Please enter at least 2 words',
        (value) => {
          const arr = value?.trim().split(' ');
          return arr ? arr.length >= 2 : false;
        }
      ),
    email: yup
      .string()
      .required('Please enter your email')
      .email('Please enter a valid email'),
    password: yup
      .string()
      .required('Please enter your password')
      .min(6, 'Please enter at least 6 characters'),
    retypePassword: yup
      .string()
      .required('Please retype your password')
      .oneOf([yup.ref('password')], 'Password dose not match'),
  });

  const form = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values: RegisterField) => {
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
      className="register"
    >
      {isSubmitting && <LinearProgress sx={{ width: '100%', mb: '5px' }} />}

      <LogoColor className="logo" />

      <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
        Create An Account
      </Typography>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="fullName" label="Full Name" form={form} />
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <PasswordField
          name="retypePassword"
          label="Retype Password"
          form={form}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ my: 2 }}
          color="primary"
          disabled={isSubmitting}
        >
          Create an account
        </Button>
      </form>
    </Box>
  );
}

export default RegisterForm;
