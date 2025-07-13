// components/ui/CustomDialog.tsx
'use client';

import React from 'react';

interface CustomDialogProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const CustomDialog: React.FC<CustomDialogProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Dialog Content */}
            <div className="relative z-10 w-full max-w-xl sm:max-w-2xl mx-4 max-h-[90vh] overflow-hidden">
                {children}
            </div>
        </div>
    );
};

export default CustomDialog;