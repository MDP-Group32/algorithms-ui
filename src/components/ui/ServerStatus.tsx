import React, { useCallback, useEffect, useState } from 'react';
import { MdOnlinePrediction } from 'react-icons/md';
import { IoCloudOfflineSharp } from 'react-icons/io5';
import { getServerStatus } from '@/api/api';

const HealthIndicatorBadge = () => {
  const [isServerOnline, setIsServerOnline] = useState(false);

const checkServerOnlineStatus = useCallback(async () => {
  try {
    const response = await getServerStatus();
    setIsServerOnline(!!response);
  } catch (error) {
    setIsServerOnline(false);
  }
}, []);

useEffect(() => {
  checkServerOnlineStatus();
}, [checkServerOnlineStatus]);

  return (
    <div className='mt-2 mb-4 flex justify-center items-center'>
      <div
        className={`w-max flex items-center gap-2 px-2 py-1 bg-purple-600 rounded font-bold text-white text-[14px] shadow-lg hover:text-purple-300 cursor-pointer ${
          isServerOnline ? '!text-emerald-500 hover:!text-emerald-600' : '!text-pink-700 hover:!text-pink-800'
        }`}
      >
        {isServerOnline ? (
          <>
            <span>Server Status - Online</span>
            <MdOnlinePrediction className='text-[20px] animate-pulse' />
          </>
        ) : (
          <>
            <span>Server Status - Offline</span>
            <IoCloudOfflineSharp className='text-[20px] animate-pulse' />
          </>
        )}
      </div>
    </div>
  );
};

export default HealthIndicatorBadge;
