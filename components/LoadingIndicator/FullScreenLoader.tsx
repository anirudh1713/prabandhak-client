import React from 'react';
import LoadingIndicator from './index';

const FullScreenLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <LoadingIndicator size={70} />
    </div>
  );
};

export default FullScreenLoader;
