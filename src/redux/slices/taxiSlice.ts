import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type TaxiSliceState = {
  availableCrew: Taxi[]
  isLoading: boolean
  isLoaded: boolean
  choosenTaxi?: Taxi
  address: Address
  isError?: boolean
}

type Address = {
  title?: string
  coords?: [number, number]
}

export type Taxi = {
  crew_id: number
  car_mark: string
  car_model: string
  car_color: string
  car_number: string
  driver_name: string
  driver_phone: string
  lat: number
  lon: number
  distance: number
}

const initialState: TaxiSliceState = {
  availableCrew: [],
  isLoading: false,
  isLoaded: false,
  address: {}
}

export const taxiSlice = createSlice({
  name: 'taxi',
  initialState,
  reducers: {
    setAvailableCrew: (state, action: PayloadAction<Taxi[]>) => {
      state.availableCrew = action.payload;
    },
    setChoosenTaxi: (state, action: PayloadAction<Taxi | undefined>) => {
      state.choosenTaxi = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setIsLoaded: (state, action: PayloadAction<boolean>) => {
      state.isLoaded = action.payload
    },
    setAddress: (state, action: PayloadAction<Address>) => {
      state.address = action.payload
    },
    setIsError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload
    },
    reset: (state) => {
      state.availableCrew = [];
      state.choosenTaxi = undefined;
      state.isLoaded = false;
      state.isError = undefined;
    }
  },
});

export const { setAvailableCrew, setIsLoading, setAddress, setIsLoaded, setChoosenTaxi, reset, setIsError } = taxiSlice.actions;
export default taxiSlice.reducer;
