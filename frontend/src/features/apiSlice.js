import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const baseQuery = fetchBaseQuery({ baseUrl: "/api" });

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: '/register',
        method: 'POST',
        body: data
      })
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: '/auth',
        method: 'POST',
        body: data
      })
    })
  })
});

export const { useCreateUserMutation, useLoginUserMutation } = authApi;
