import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface DataInterface {
  id: number;
  location: string;
  title: string;
  guests: string;
  beds: number;
  baths: number;
  wifi: boolean;
  kitchen: boolean;
  free_parking: boolean;
  rating: number;
  reviews: number;
  price: number;
  hotel_image: string;
  dates: {
    startDate: string;
    endDate: string;
  };
}

interface HotelState {
  searchedHotelData: DataInterface[];
  isLoading: boolean;
}

const initialState: HotelState = {
  searchedHotelData: [],
  isLoading: false
};

const hotelSlice = createSlice({
  name: 'hotel state',
  initialState,
  reducers: {
    updateSearchState: (
      state,
      action: PayloadAction<{ data: DataInterface[]; isLoading: boolean }>
    ) => {
      state.searchedHotelData = action.payload.data;
      state.isLoading = action.payload.isLoading;
    }
  }
});

export const { updateSearchState } = hotelSlice.actions;
export default hotelSlice.reducer;
