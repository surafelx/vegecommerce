import { QueryOptionsType, Product } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';

export const fetchPopcornJerkyProducts = async ({ queryKey }: any) => {
  const { data } = await http.get(API_ENDPOINTS.POPCORN_JERKY_PRODUCTS);
  return data.data as Product[];
};
export const usePopcornJerkyProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>({
    queryKey: [API_ENDPOINTS.POPCORN_JERKY_PRODUCTS, options],
    queryFn: () => fetchPopcornJerkyProducts(options),
  });
};
