import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';

interface ProductSortProps {
  value: string;
  onSortChange?: (value: string) => void;
}

export default function ProductSort({ value, onSortChange }: ProductSortProps) {
  const handleSortChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: string
  ) => {
    if (onSortChange) onSortChange(newValue);
  };

  return (
    <Box sx={{ pl: 2 }}>
      <Tabs
        value={value}
        onChange={handleSortChange}
        aria-label="product sort tabs"
      >
        <Tab label="Giá Thấp" value="salePrice:ASC" />
        <Tab label="Giá Cao" value="salePrice:DESC" />
      </Tabs>
    </Box>
  );
}
