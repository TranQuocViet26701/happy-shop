import { ProductQueryParams } from '@/api/productApi';
import { Divider } from '@mui/material';
import { useEffect } from 'react';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByService from './Filters/FilterByService';

interface ProductFiltersProps {
  filters: Partial<ProductQueryParams>;
  onChange: (filters: Partial<ProductQueryParams>) => void;
}

export default function ProductFilters({
  filters,
  onChange,
}: ProductFiltersProps) {
  const handleChangeByCategory = (newCategoryId: number) => {
    if (!onChange) return;

    const newFilters = {
      'category.id': newCategoryId,
    };
    onChange(newFilters);
  };

  const handleFilterChange = (filters: Partial<ProductQueryParams>) => {
    if (!onChange) return;

    onChange({
      ...filters,
    });
  };

  return (
    <>
      <FilterByCategory onChange={handleChangeByCategory} />
      <Divider />
      <FilterByPrice onSubmit={handleFilterChange} />
      <Divider />
      <FilterByService filters={filters} onChange={handleFilterChange} />
    </>
  );
}
