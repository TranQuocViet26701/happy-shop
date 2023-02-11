import { IMAGE_PLACEHOLDER, STATIC_HOST } from '@/constants';
import { utils } from '@/helpers';
import { Product } from '@/types';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ProductItemProps {
  product: Product;
}

export default function ProductItem({ product }: ProductItemProps) {
  const navigate = useNavigate();
  const thumbnailUrl = product.thumbnail?.url
    ? `${STATIC_HOST}${product.thumbnail.url}`
    : IMAGE_PLACEHOLDER;
  const promotionPercent = `-${product.promotionPercent}%`;

  const handleProductClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <Box
      onClick={handleProductClick}
      sx={{
        cursor: 'pointer',
      }}
    >
      <Box sx={{ p: 1 }}>
        <img src={thumbnailUrl} alt={product.name} width="100%" />
      </Box>
      <Typography variant="body2">{product.name}</Typography>
      <Typography variant="body2">
        <Box
          component="span"
          sx={[
            { fontSize: 16, fontWeight: 'bold', pr: 2 },
            product.promotionPercent > 0 && {
              color: 'rgb(255, 66, 78)',
            },
          ]}
        >
          {utils.formatMoney(product.salePrice)}
        </Box>
        {product.promotionPercent > 0 && (
          <Box
            component="span"
            sx={{
              padding: '0 2px',
              border: '1px solid rgb(255, 66, 78)',
              borderRadius: '2px',
              fontSize: 12,
              color: 'rgb(255, 66, 78)',
              backgroundColor: 'rgb(255, 240, 241)',
            }}
          >
            {promotionPercent}
          </Box>
        )}
      </Typography>
    </Box>
  );
}
