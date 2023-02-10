import { RootState } from '@/app/store';
import { unwrapResult } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { LoginField } from '../../types';
import { login } from '../../userSlice';
import LoginForm from '../LoginForm';
interface LoginProps {
  onCloseDialog?: () => void;
}

export default function Login({ onCloseDialog }: LoginProps) {
  const dispatch = useDispatch();

  const handleSubmit = async (values: LoginField) => {
    console.log('Login values: ', values);

    try {
      const action = login(values);
      const resultAction = await dispatch(action as any);
      const data = unwrapResult(resultAction);

      // Close dialog
      if (onCloseDialog) {
        onCloseDialog();
      }

      // Login successful
      toast.success('Login successful');
      console.log('Login result: ', data);
    } catch (error) {
      console.log('error: ', error);
      toast.error((error as Error).message);
    }
  };
  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}
