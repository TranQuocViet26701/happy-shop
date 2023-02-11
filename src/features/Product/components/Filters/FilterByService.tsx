import { ProductQueryParams } from '@/api/productApi';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';
import React from 'react';

export type Service = 'isFreeShip' | 'isPromotion';

const filterService: {
  label: string;
  value: Service;
}[] = [
  {
    label: 'FREESHIP không giới hạn',
    value: 'isFreeShip',
  },
  {
    label: 'Có khuyến mãi',
    value: 'isPromotion',
  },
];

interface ProductFiltersProps {
  filters: Partial<ProductQueryParams>;
  onChange: (filters: Partial<ProductQueryParams>) => void;
}

export default function FilterByService({
  onChange,
  filters,
}: ProductFiltersProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;

    const { name, checked } = event.target;
    onChange({ [name]: checked });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="subtitle2">DỊCH VỤ</Typography>

      <FormGroup>
        {filterService.map((service) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={Boolean(filters[service.value])}
                onChange={handleChange}
                name={service.value}
              />
            }
            label={<Typography variant="body2">{service.label}</Typography>}
            key={service.label}
          />
        ))}
      </FormGroup>
    </Box>
  );
}
