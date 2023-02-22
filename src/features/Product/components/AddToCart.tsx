import QuantityField from '@/components/FormControls/QuantityField';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const defaultValues = {
  quantity: 1,
};

export type AddToCartType = typeof defaultValues;

interface AddToCartProps {
  onSubmit?: (data: AddToCartType) => void;
}

export default function AddToCart({ onSubmit }: AddToCartProps) {
  const schema = yup.object({
    quantity: yup
      .number()
      .required('Please enter quantity')
      .min(1, 'Quantity should be at least 1')
      .typeError('Please enter a number'),
  });

  const form = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isSubmitting } = form.formState;

  const handlSubmitForm = (data: AddToCartType) => {
    if (!onSubmit) return;

    onSubmit(data);
    toast.success('Add to cart successful');
    form.setValue('quantity', 1);
  };

  return (
    <Box
      sx={{
        ml: '12px',
      }}
    >
      <form onSubmit={form.handleSubmit(handlSubmitForm)}>
        <QuantityField name="quantity" label="Số lượng" form={form} />

        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ my: 2, width: '40%' }}
          color="primary"
          disabled={isSubmitting}
        >
          Chọn mua
        </Button>
      </form>
    </Box>
  );
}
