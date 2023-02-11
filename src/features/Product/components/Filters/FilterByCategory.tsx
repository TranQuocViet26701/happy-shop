import categoryApi from '@/api/categoryApi';
import { Category } from '@/types';
import { Box, List, ListItem, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

interface FilterByCategoryProps {
  onChange: (category: number) => void;
}

export default function FilterByCategory({ onChange }: FilterByCategoryProps) {
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await categoryApi.getAll();
      setCategoryList(data);
    })();
  }, []);

  const handleCategoryChange = (category: Category) => {
    if (!onChange) return;

    onChange(category.id);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="subtitle2">DANH MỤC SẢN PHẨM</Typography>

      <List>
        {categoryList.map((category) => (
          <ListItem
            key={category.id}
            sx={{
              p: '4px 0',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                cursor: 'pointer',
                transition: 'all .25s ease',

                '&:hover': {
                  color: 'primary.dark',
                },
              }}
              onClick={() => handleCategoryChange(category)}
            >
              {category.name}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
