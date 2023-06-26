import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const baseQuery = fetchBaseQuery({ baseUrl: "/api" });

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery, 
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ('/categories')
    })
  })
});

export const {  useGetCategoriesQuery } = categoryApi;
