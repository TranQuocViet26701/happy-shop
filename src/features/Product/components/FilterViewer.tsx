import { ProductQueryParams } from '@/api/productApi';
import { Box, Chip, Link, Typography } from '@mui/material';
import { useMemo } from 'react';

const services = [
  'Thời trang',
  'Khẩu trang',
  'Làm đẹp',
  'Laptop',
  'Ổ cứng',
  'Điện thoại',
];

const FILTER_LIST = [
  {
    id: 1,
    getLabel: () => (
      <Typography variant="body2" sx={{ lineHeight: 'normal' }}>
        FREESHIP
      </Typography>
    ),
    isVisible: () => true,
    isActive: (filters: Partial<ProductQueryParams>) =>
      Boolean(filters.isFreeShip),
    isDeletable: false,
    onRemove: null,
    onToggle: (filters: Partial<ProductQueryParams>) => {
      const newFilters = { ...filters };

      if (newFilters.isFreeShip) {
        delete newFilters.isFreeShip;
      } else {
        newFilters.isFreeShip = true;
      }

      return newFilters;
    },
  },
  {
    id: 2,
    getLabel: () => (
      <Typography variant="body2" sx={{ lineHeight: 'normal' }}>
        Có khuyến mãi
      </Typography>
    ),
    isVisible: (filters: Partial<ProductQueryParams>) =>
      Object.keys(filters).includes('isPromotion') &&
      Boolean(filters.isPromotion),
    isActive: (filters: Partial<ProductQueryParams>) =>
      Boolean(filters.isPromotion),
    isDeletable: true,
    onRemove: (filters: Partial<ProductQueryParams>) => {
      const newFilters = { ...filters };

      if (newFilters.isPromotion) {
        delete newFilters.isPromotion;
      }

      return newFilters;
    },
    onToggle: null,
  },
  {
    id: 3,
    getLabel: (filters: Partial<ProductQueryParams>) => (
      <Typography variant="body2" sx={{ lineHeight: 'normal' }}>
        {services[(filters['category.id'] as number) - 1]}
      </Typography>
    ),
    isVisible: (filters: Partial<ProductQueryParams>) =>
      Object.keys(filters).includes('category.id'),
    isActive: (filters: Partial<ProductQueryParams>) =>
      Object.keys(filters).includes('category.id'),
    isDeletable: true,
    onRemove: (filters: Partial<ProductQueryParams>) => {
      const newFilters = { ...filters };

      if (newFilters['category.id']) {
        delete newFilters['category.id'];
      }

      return newFilters;
    },
    onToggle: null,
  },
  {
    id: 4,
    getLabel: (filters: Partial<ProductQueryParams>) => (
      <Typography
        variant="body2"
        sx={{ lineHeight: 'normal' }}
      >{`${new Intl.NumberFormat('de-DE').format(
        filters.salePrice_gte as number
      )}đ đến ${new Intl.NumberFormat('de-DE').format(
        filters.salePrice_lte as number
      )}đ`}</Typography>
    ),
    isVisible: (filters: Partial<ProductQueryParams>) =>
      Object.keys(filters).includes('salePrice_gte') &&
      Object.keys(filters).includes('salePrice_lte'),
    isActive: (filters: Partial<ProductQueryParams>) =>
      Object.keys(filters).includes('salePrice_gte') &&
      Object.keys(filters).includes('salePrice_lte'),
    isDeletable: true,
    onRemove: (filters: Partial<ProductQueryParams>) => {
      const newFilters = { ...filters };

      if (
        Object.keys(newFilters).includes('salePrice_gte') &&
        Object.keys(newFilters).includes('salePrice_lte')
      ) {
        delete newFilters.salePrice_gte;
        delete newFilters.salePrice_lte;
      }

      return newFilters;
    },
    onToggle: null,
  },
];

interface FilterViewerProps {
  filters: Partial<ProductQueryParams>;
  onChange?: (filters: Partial<ProductQueryParams>) => void;
}

export default function FilterViewer({
  filters = {},
  onChange,
}: FilterViewerProps) {
  const visibleFilterList = useMemo(() => {
    return FILTER_LIST.filter((x) => x.isVisible(filters));
  }, [filters]);

  const handleRemoveAll = (filters: Partial<ProductQueryParams>) => {
    if (!onChange) return;

    const newFilters = {
      _page: 1,
      _limit: filters._limit,
      _sort: filters._sort,
    };

    onChange(newFilters);
  };

  const isShowRemoveAllBtn = (filters: Partial<ProductQueryParams>) => {
    const keys = Object.keys(filters);

    return (
      keys.includes('isFreeShip') ||
      keys.includes('isPromotion') ||
      keys.includes('category.id') ||
      keys.includes('salePrice_gte')
    );
  };

  return (
    <Box sx={{ py: 2, ml: 2 }}>
      {visibleFilterList.map((filter) => (
        <Chip
          key={filter.id}
          label={filter.getLabel(filters)}
          onClick={
            filter.isDeletable
              ? null
              : () => {
                  if (filter.onToggle) {
                    const newFilters = filter.onToggle(filters);

                    if (onChange) onChange(newFilters);
                  }
                }
          }
          onDelete={
            filter.isDeletable
              ? () => {
                  if (filter.onRemove) {
                    const newFilters = filter.onRemove(filters);

                    if (onChange) onChange(newFilters);
                  }
                }
              : null
          }
          color={filter.isActive(filters) ? 'primary' : 'default'}
          size="small"
          sx={{
            mr: 1,
            alignItems: 'center',
          }}
        />
      ))}
      {isShowRemoveAllBtn(filters) && (
        <Link
          component="button"
          variant="body2"
          color="primary.dark"
          underline="none"
          onClick={() => handleRemoveAll(filters)}
        >
          Xóa tất cả
        </Link>
      )}
    </Box>
  );
}
