import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { RegisterData, RegisterField } from '../../types';
import { register } from '../../userSlice';
import RegisterForm from '../RegisterForm';

interface RegisterProps {
  onCloseDialog?: () => void;
}

export default function Register({ onCloseDialog }: RegisterProps) {
  const dispatch = useDispatch();

  const handleSubmit = async (values: RegisterField) => {
    console.log('Register values: ', values);

    try {
      const payload: RegisterData = { ...values, username: values.email };
      const action = register(payload);
      const resultAction = await dispatch(action as any);
      const data = unwrapResult(resultAction);

      // Close dialog
      if (onCloseDialog) {
        onCloseDialog();
      }

      // Register successful
      toast.success('Register successful');
      console.log('Register result: ', data);
    } catch (error) {
      console.log('error: ', error);
      toast.error((error as Error).message);
    }
  };
  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}
