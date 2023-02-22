import { Product } from '@/types';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import productApi from '../../../api/productApi';

export function useProductDetail(productId: Product['id']) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const product = await productApi.get(productId);

        setProduct(product);
        setLoading(false);
      } catch (error) {
        console.log('error: ', error);
        toast.error((error as Error).message);
      }
    })();
  }, [productId]);

  return { product, loading };
}
