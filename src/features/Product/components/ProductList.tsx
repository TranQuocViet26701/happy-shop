import { Product } from '@/types';
import { Box, Grid } from '@mui/material';
import ProductItem from './ProductItem';

interface ProductListProps {
  data: Product[];
}

export default function ProductList({ data }: ProductListProps) {
  return (
    <Box>
      <Grid container spacing={0}>
        {data.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3} p={1}>
            <ProductItem product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
