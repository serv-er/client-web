// hooks/useSyncListener.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setStatus, toggleOnline } from '../redux/syncSlice';

const useSyncListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const goOnline = () => {
      dispatch(toggleOnline()); // Triggers sync
      dispatch(setStatus('Syncing...'));
    };

    const goOffline = () => {
      dispatch(toggleOnline());
      dispatch(setStatus('Offline'));
    };

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, [dispatch]);
};

export default useSyncListener;
