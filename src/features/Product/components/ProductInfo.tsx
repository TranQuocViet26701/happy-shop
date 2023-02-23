import { Product } from '@/types';
import { Box, Divider, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { utils } from '../../../helpers';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const { name, shortDescription, salePrice, originalPrice, promotionPercent } =
    product;

  const promotionPercentFormatted = `-${promotionPercent}%`;

  return (
    <Box
      sx={{
        ml: '12px',
        p: '16px 28px 16px 0',
      }}
    >
      <Typography component="h1" variant="h4">
        {name}
      </Typography>
      <Box sx={{ my: 1 }}>
        <Typography variant="subtitle2" sx={{ pr: 1 }}>
          Mô tả ngắn:
        </Typography>
        <Typography variant="body2">{shortDescription}</Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: grey[100],
          p: '0 16px 12px',
          borderRadius: '4px',
        }}
      >
        <Box
          component="span"
          sx={[
            {
              fontSize: '32px',
              fontWeight: '500',
              mr: 1.5,
            },
            promotionPercent
              ? {
                  color: 'rgb(255, 66, 78)',
                }
              : null,
          ]}
        >
          {utils.formatMoney(salePrice)}
        </Box>
        {promotionPercent > 0 && (
          <>
            <Box
              component="span"
              sx={{
                fontSize: '14px',
                fontWeight: '500',
                color: 'rgb(128, 128, 137)',
                textDecoration: 'line-through',
                mr: 1.5,
              }}
            >
              {utils.formatMoney(originalPrice)}
            </Box>
            <Box
              component="span"
              sx={{
                padding: '0 2px',
                border: '1px solid rgb(255, 66, 78)',
                borderRadius: '2px',
                fontSize: 14,
                color: 'rgb(255, 66, 78)',
                backgroundColor: 'rgb(255, 240, 241)',
              }}
            >
              {promotionPercentFormatted}
            </Box>
          </>
        )}
      </Box>
      <Divider sx={{ mt: 3 }} />
    </Box>
  );
}
