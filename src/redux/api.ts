import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DataInterface } from './hotelSlice';

export interface SearchQuery {
  location: string;
  dates: {
    startDate: string;
    endDate: string;
  };
  guests: number;
}

const baseUrl: string =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000'
    : 'https://blogify-assessment-test-server.onrender.com';

export const hotelsApi = createApi({
  reducerPath: 'hotelsApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getAllHotels: builder.query<{ data: DataInterface[] }, void>({
      query: () => '/search'
    }),

    getAllHotelsLocationName: builder.mutation<{ data: string[] }, void>({
      query: () => '/search/locations'
    }),

    searchHotels: builder.mutation<{ data: DataInterface[] }, SearchQuery>({
      query: (searchQuery) => {
        const { location, dates, guests } = searchQuery;

        // Adjust the date format or structure according to your API requirements
        const params = new URLSearchParams();

        if (location) params.set('location', location);
        if (dates.startDate) params.set('dates[startDate]', dates.startDate);
        if (dates.endDate) params.set('dates[endDate]', dates.endDate);
        if (guests) params.set('guests', guests.toString());

        return `/search?${params.toString()}`;
      }
    })
  })
});

export const {
  useGetAllHotelsQuery,
  useSearchHotelsMutation,
  useGetAllHotelsLocationNameMutation
} = hotelsApi;
export default hotelsApi;
