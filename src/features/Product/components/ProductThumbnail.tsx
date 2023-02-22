import { Product } from '@/types';
import { Box } from '@mui/material';
import { IMAGE_PLACEHOLDER, STATIC_HOST } from '../../../constants/index';

interface ProductThumbnailProps {
  product: Product;
}

export default function ProductThumbnail({ product }: ProductThumbnailProps) {
  const thumbnailUrl = product.thumbnail?.url
    ? `${STATIC_HOST}${product.thumbnail.url}`
    : IMAGE_PLACEHOLDER;

  return (
    <Box sx={{ p: 2 }}>
      <img src={thumbnailUrl} alt={product.name} width="100%" />
    </Box>
  );
}
