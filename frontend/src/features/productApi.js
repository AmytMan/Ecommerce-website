import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const baseQuery = fetchBaseQuery({ baseUrl: "/api" });

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery,
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ('/products')
    }),
    singleProduct :builder.query({
      query:(id)=>(`/product?id=${id}`)
    }),
    addProduct: builder.mutation({
      query: (formData) => ({
        url: '/addproduct',
        method: 'POST',
        body: formData,
      }),
    })
    
  })
});

export const {  useGetProductsQuery ,useSingleProductQuery,useAddProductMutation} = productApi;
