import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  OutlinedInput,
  Typography,
} from '@mui/material';
import { Controller, UseFormReturn } from 'react-hook-form';

interface QuantityFieldProps {
  form: UseFormReturn<any, any>;
  name: string;
  label?: string;
  disabled?: boolean;
}

export default function QuantityField({
  form,
  name,
  label = '',
  disabled = false,
}: QuantityFieldProps) {
  const {
    control,
    setValue,
    formState: { errors },
  } = form;

  const hasError = !!errors[name];

  return (
    <Box>
      <FormControl
        error={hasError}
        sx={{ my: 1 }}
        variant="outlined"
        size="small"
      >
        <Typography variant="subtitle2" mb={1}>
          {label}
        </Typography>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value } }) => (
            <Box
              sx={{
                display: 'flex',
                flexFlow: 'row nowrap',
                maxWidth: '150px',
              }}
            >
              <IconButton
                onClick={() =>
                  setValue(
                    name,
                    Number.parseInt(value) ? Number.parseInt(value) - 1 : 1
                  )
                }
              >
                <RemoveIcon />
              </IconButton>
              <OutlinedInput
                id={name}
                type="number"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                disabled={disabled}
              />
              <IconButton
                onClick={() =>
                  setValue(
                    name,
                    Number.parseInt(value) ? Number.parseInt(value) + 1 : 1
                  )
                }
              >
                <AddIcon />
              </IconButton>
            </Box>
          )}
        />
        <FormHelperText id={`${name}-helper-text`}>
          {errors[name]?.message as React.ReactNode}
        </FormHelperText>
      </FormControl>
    </Box>
  );
}
