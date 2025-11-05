import React from 'react';

const Loading = ({ show }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      <div className="animate-bounce text-6xl">🦁</div>
      <div className="mt-4 text-blue-700 font-semibold">Memuat...</div>
    </div>
  );
};

export default Loading;
