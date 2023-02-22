import { Product } from '@/types';
import { Box } from '@mui/material';
import DOMPurify from 'dompurify';

interface ProductDescriptionProps {
  product: Product;
}

export default function ProductDescription({
  product,
}: ProductDescriptionProps) {
  const safeDescription = DOMPurify.sanitize(product.description!);
  return (
    <Box sx={{ p: '8px 16px' }}>
      <div dangerouslySetInnerHTML={{ __html: safeDescription }} />
    </Box>
  );
}
