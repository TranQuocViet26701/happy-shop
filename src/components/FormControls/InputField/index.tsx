import { TextField } from '@mui/material';
import { Controller, UseFormReturn } from 'react-hook-form';

interface InputFieldProps {
  form: UseFormReturn<any, any>;
  name: string;
  label?: string;
  disabled?: boolean;
}

export default function InputField({
  form,
  name,
  label = '',
  disabled = false,
}: InputFieldProps) {
  const {
    control,
    formState: { errors },
  } = form;

  const hasError = !!errors[name];

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextField
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          sx={{ my: 1 }}
          fullWidth
          id={name}
          label={label}
          variant="outlined"
          disabled={disabled}
          error={hasError}
          helperText={errors[name]?.message as React.ReactNode}
        />
      )}
    />
  );
}
