import { Box, Link } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

export default function ProductMenu() {
  const location = useLocation();
  const url = location.pathname;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        component="ul"
        sx={{
          display: 'flex',
          padding: 0,
          listStyleType: 'none',
          justifyContent: 'space-between',
          width: '50%',
          '& > li > a': {
            textDecoration: 'none',
            color: '#000',
            fontSize: '18px',
            fontWeight: '400',
          },

          '& > li > a.active': {
            textDecoration: 'underline',
            color: 'blue',
          },
        }}
      >
        <li>
          <Link component={NavLink} to="">
            Description
          </Link>
        </li>
        <li>
          <Link component={NavLink} to="additional">
            Additional
          </Link>
        </li>
        <li>
          <Link component={NavLink} to="reviews">
            Reviews
          </Link>
        </li>
      </Box>
    </Box>
  );
}
