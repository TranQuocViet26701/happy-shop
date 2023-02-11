import {
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
// import productApi from '../../../api/productApi';
// import FilterViewer from '../components/FilterViewer';
// import ProductFilters from '../components/ProductFilters';
// import ProductList from '../components/ProductList';
// import ProductSkeletonList from '../components/ProductSkeletonList';
// import ProductSort from '../components/ProductSort';
import queryString from 'query-string';
import productApi, { Pagination, ProductQueryParams } from '@/api/productApi';
import { Product } from '@/types';
import { toast } from 'react-toastify';
import ProductList from '../components/ProductList';

export default function ListPage() {
  const location = useLocation();

  const queryParams = useMemo(() => {
    const search = queryString.parse(location.search, {
      parseBooleans: true,
      parseNumbers: true,
    });

    return {
      ...search,
      _page: search._page || 1,
      _limit: search._limit || 12,
      _sort: search._sort || 'salePrice:ASC',
    };
  }, [location.search]);

  console.log('Query params: ', queryParams);

  const [productList, setProductList] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 12,
    total: 12,
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, pagination } = await productApi.getAll(
          queryParams as ProductQueryParams
        );

        // set data and pagination
        setProductList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Error when fetch product list: ', error);
        toast.error((error as Error).message);
      }

      setLoading(false);
    };

    fetchProducts();
  }, [queryParams]);

  // const handlePageChange = (event, value) => {
  //   history.push({
  //     pathname: history.location.pathname,
  //     search: queryString.stringify({
  //       ...queryParams,
  //       _page: value,
  //     }),
  //   });

  //   setLoading(true);
  // };

  // const handleSortChange = (newValue) => {
  //   history.push({
  //     pathname: history.location.pathname,
  //     search: queryString.stringify({
  //       ...queryParams,
  //       _sort: newValue,
  //     }),
  //   });

  //   setLoading(true);
  // };

  // const handleFilterChange = (newFilters) => {
  //   const changedFilters = {
  //     ...queryParams,
  //     ...newFilters,
  //   };

  //   // delete isFreeShip and isPromotion if they are set to false
  //   if (
  //     changedFilters.hasOwnProperty('isFreeShip') &&
  //     !changedFilters.isFreeShip
  //   ) {
  //     delete changedFilters.isFreeShip;
  //   }
  //   if (
  //     changedFilters.hasOwnProperty('isPromotion') &&
  //     !changedFilters.isPromotion
  //   ) {
  //     delete changedFilters.isPromotion;
  //   }

  //   history.push({
  //     pathname: history.location.pathname,
  //     search: queryString.stringify(changedFilters),
  //   });

  //   setLoading(true);
  // };

  // const handleChange = (newFilters) => {
  //   history.push({
  //     pathname: history.location.pathname,
  //     search: queryString.stringify(newFilters),
  //   });

  //   setLoading(true);
  // };

  return (
    <Box>
      <Container>
        <Paper elevation={0}>
          <Grid container spacing={0.5}>
            {/* Left column */}
            <Grid
              item
              sx={{
                width: '250px',
              }}
            >
              {/* <ProductFilters
                filters={queryParams}
                onChange={handleFilterChange}
              /> */}
              Product filters
            </Grid>
            <Divider orientation="vertical" flexItem />
            {/* Right column */}
            <Grid
              item
              sx={{
                flex: '1 1 0',
                p: '0 !important',
              }}
            >
              {/* Sort */}
              {/* <ProductSort
                value={queryParams._sort}
                onSortChange={handleSortChange}
              /> */}
              Product Sort
              <Divider />
              {/* Filter */}
              {/* <FilterViewer filters={queryParams} onChange={handleChange} /> */}
              {loading ? (
                // <ProductSkeletonList length={queryParams.limit} />
                <Typography>Product Skeleton</Typography>
              ) : (
                <ProductList data={productList} />
              )}
            </Grid>
          </Grid>
        </Paper>
        {/* <Pagination
          color="primary"
          count={Math.ceil(pagination.total / pagination.limit)}
          page={pagination.page}
          onChange={handlePageChange}
          defaultPage={6}
          sx={[
            {
              my: '14px',
            },
            {
              '& ul': {
                justifyContent: 'flex-end',
              },
            },
          ]}
        /> */}
      </Container>
    </Box>
  );
}
