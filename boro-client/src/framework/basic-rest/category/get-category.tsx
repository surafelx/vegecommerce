import { QueryOptionsType, Category } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';

export const fetchCategory = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  console.log(_key, _params)
  const {
    data: { data },
  } = await http.get(API_ENDPOINTS.CATEGORIES);
  return { category: { data } };
};
export const useCategoriesQuery = (options: QueryOptionsType) => {
  return useQuery<{ category: { data: Category[] } }, Error>({
    queryKey: [API_ENDPOINTS.CATEGORIES, options],
    queryFn: fetchCategory,
  });
};
