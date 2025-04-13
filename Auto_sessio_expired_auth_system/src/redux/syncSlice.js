
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOnline: true,
  syncQueue: [],
  status: 'All changes synced', 
};

const syncSlice = createSlice({
  name: 'sync',
  initialState,
  reducers: {
    toggleOnline(state) {
      state.isOnline = !state.isOnline;
      state.status = state.isOnline ? 'Syncing...' : 'Offline';
    },
    addToQueue(state, action) {
      state.syncQueue.push(action.payload);
    },
    clearQueue(state) {
      state.syncQueue = [];
      state.status = 'All changes synced';
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { toggleOnline, addToQueue, clearQueue, setStatus } = syncSlice.actions;
export default syncSlice.reducer;
