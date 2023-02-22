import { Box } from '@mui/system';
import { Route, Routes } from 'react-router-dom';
import DetailPage from './pages/DetailPage';
import ListPage from './pages/ListPage';

export default function ProductFeature() {
  return (
    <Box pt={4}>
      <Routes>
        <Route index element={<ListPage />} />
        <Route path=":productId/*" element={<DetailPage />} />
      </Routes>
    </Box>
  );
}
