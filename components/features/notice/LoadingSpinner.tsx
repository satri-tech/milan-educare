// components/ui/LoadingSpinner.tsx
'use client';

import React from 'react';

const LoadingSpinner: React.FC = () => (
    <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
    </div>
);

export default LoadingSpinner;