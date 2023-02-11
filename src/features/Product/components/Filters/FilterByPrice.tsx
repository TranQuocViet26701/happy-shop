import { RangePrice } from '@/api/productApi';
import { Box, Button, TextField, Typography } from '@mui/material';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface FilterByPriceProps {
  onSubmit: (rangePrice: RangePrice) => void;
}

export default function FilterByPrice({ onSubmit }: FilterByPriceProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const [values, setValues] = useState<RangePrice>({
    salePrice_gte: 0,
    salePrice_lte: 0,
  });

  useEffect(() => {
    const search = queryString.parse(location.search, {
      parseBooleans: true,
      parseNumbers: true,
    });

    // Just has price less than case
    if (
      typeof search.salePrice_gte !== 'number' &&
      typeof search.salePrice_lte === 'number'
    ) {
      setValues((prevValues) => ({
        ...prevValues,
        salePrice_lte: search.salePrice_lte as number,
      }));
    } else if (
      // Have both gte and lte case
      typeof search.salePrice_gte === 'number' &&
      typeof search.salePrice_lte === 'number'
    ) {
      let gte = search.salePrice_gte ? (search.salePrice_gte as number) : 0;
      let lte = search.salePrice_lte ? (search.salePrice_lte as number) : 0;

      if (gte > lte) {
        gte = 0;
        lte = 0;
      }

      if (!gte && !lte) {
        // Delete range price when they equal 0
        delete search.salePrice_gte;
        delete search.salePrice_lte;

        navigate({
          pathname: location.pathname,
          search: queryString.stringify(search),
        });
      } else {
        setValues((prevValues) => ({
          ...prevValues,
          salePrice_gte: gte,
          salePrice_lte: lte,
        }));
      }
    }
  }, [location.search]);

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (onSubmit) onSubmit(values);

    setValues({
      salePrice_gte: 0,
      salePrice_lte: 0,
    });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="subtitle2">GIÁ</Typography>
      <Typography variant="caption" color="text.secondary">
        Chọn khoảng giá
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <TextField
          name="salePrice_gte"
          size="small"
          value={values.salePrice_gte}
          onChange={handleChange}
        />

        <Box
          sx={{
            display: 'inline-block',
            mx: '4px',
            minWidth: '7px',
            height: '1px',
            fontSize: '0px',
            background: 'rgb(154, 154, 154)',
          }}
        >
          -
        </Box>
        <TextField
          name="salePrice_lte"
          size="small"
          value={values.salePrice_lte}
          onChange={handleChange}
        />
      </Box>
      <Button
        variant="outlined"
        size="small"
        onClick={handleSubmit}
        sx={{
          mt: 1,
        }}
      >
        Áp dụng
      </Button>
    </Box>
  );
}
