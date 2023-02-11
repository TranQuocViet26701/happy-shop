import { Box, Grid, Skeleton } from '@mui/material';

interface ProductSkeletonListProps {
  length?: number;
}

export default function ProductSkeletonList({
  length = 12,
}: ProductSkeletonListProps) {
  return (
    <Box>
      <Grid container spacing={0}>
        {Array.from(new Array(length)).map((_, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3} p={1}>
            <Box>
              <Skeleton variant="rectangular" width="100%" height={200} />
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
