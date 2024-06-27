import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const walletSlide = createSlice({
  name: "wallet",
  initialState: "",
  reducers: {
    disconnectWallet: (state) => {
      return "";
    },
    connectWallet: (state, action: PayloadAction<string>) => {
      return (state = action.payload);
    },
  },
});

export const { connectWallet, disconnectWallet } = walletSlide.actions;

export default walletSlide.reducer;
