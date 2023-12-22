import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Charts } from '../common/types/signalk'

// Define a service using a base URL and expected endpoints
export const signalkApi = createApi({
  reducerPath: 'signalkApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.0.72:3000/signalk/v1/api/' }),
  endpoints: (builder) => ({
    getCharts: builder.query<Charts, null>({
      query: () => 'resources/charts'
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetChartsQuery } = signalkApi