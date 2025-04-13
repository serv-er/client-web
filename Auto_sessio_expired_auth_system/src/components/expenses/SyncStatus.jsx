import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleOnline } from '../../redux/syncSlice';
import SyncLoader from '../SyncLoader';

const SyncStatus = () => {
  const { isOnline, status } = useSelector((state) => state.sync);
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between items-center p-3 bg-zinc-900 text-white text-sm">
      <div className="flex items-center gap-2">
        <strong>Status:</strong>
        {status === 'Syncing...' ? <SyncLoader /> : status}
      </div>
      <button
        onClick={() => dispatch(toggleOnline())}
        className="border border-white px-3 py-1 rounded hover:bg-white hover:text-black transition"
      >
        {isOnline ? 'Go Offline' : 'Go Online'}
      </button>
    </div>
  );
};

export default SyncStatus;
