import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import * as React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

interface PasswordFieldProps {
  form: UseFormReturn<any, any>;
  name: string;
  label?: string;
  disabled?: boolean;
}

export default function PasswordField({
  form,
  name,
  label = '',
  disabled = false,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword((value) => !value);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
  };

  const {
    control,
    formState: { errors },
  } = form;

  const hasError = !!errors[name];

  return (
    <FormControl error={hasError} sx={{ my: 1 }} variant="outlined" fullWidth>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <OutlinedInput
            id={name}
            type={showPassword ? 'text' : 'password'}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label={label}
            disabled={disabled}
          />
        )}
      />
      <FormHelperText id={`${name}-helper-text`}>
        {errors[name]?.message as React.ReactNode}
      </FormHelperText>
    </FormControl>
  );
}
