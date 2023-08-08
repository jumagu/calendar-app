import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isDateModalOpen: false,
  },
  reducers: {
    openDateModal: (state) => {
      state.isDateModalOpen = true;
    },

    closeDateModal: (state) => {
      state.isDateModalOpen = false;
    },
  },
});

export const { openDateModal, closeDateModal } = uiSlice.actions;
