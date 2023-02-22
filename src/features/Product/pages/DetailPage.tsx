import { addToCart } from '@/features/Cart/cartSlice';
import {
  Box,
  Container,
  Divider,
  Grid,
  LinearProgress,
  Paper,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { Route, Routes, useLocation, useParams } from 'react-router-dom';
import AddToCart, { AddToCartType } from '../components/AddToCart';
import ProductAdditional from '../components/ProductAdditional';
import ProductDescription from '../components/ProductDescription';
import ProductInfo from '../components/ProductInfo';
import ProductMenu from '../components/ProductMenu';
import ProductReview from '../components/ProductReview';
import ProductThumbnail from '../components/ProductThumbnail';
import { useProductDetail } from '../hooks';

export default function DetailPage() {
  const dispatch = useDispatch();
  let { productId } = useParams();
  const location = useLocation();

  const { product, loading } = useProductDetail(parseInt(productId as string));

  console.log('product::', product);

  const handleAddToCartSubmit = (formValues: AddToCartType) => {
    const action = addToCart({
      id: product?.id!,
      product: product!,
      quantity: formValues.quantity,
    });

    dispatch(action);
  };

  if (loading) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
        }}
      >
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Box mb={5}>
      <Container>
        <Paper elevation={0}>
          <Grid container spacing={0.5}>
            <Grid
              item
              sx={{
                width: '475px',
              }}
            >
              <ProductThumbnail product={product!} />
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid
              item
              sx={{
                flex: '1 1 0',
              }}
            >
              <ProductInfo product={product!} />
              <AddToCart onSubmit={handleAddToCartSubmit} />
            </Grid>
          </Grid>
        </Paper>
        <ProductMenu />
        <Paper elevation={0}>
          <Routes>
            <Route index element={<ProductDescription product={product!} />} />
            <Route path="additional" element={<ProductAdditional />} />
            <Route path="reviews" element={<ProductReview />} />
          </Routes>
        </Paper>
      </Container>
    </Box>
  );
}
