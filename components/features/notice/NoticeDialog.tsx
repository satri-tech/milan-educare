'use client';

import React from 'react';
import CustomDialog from './CustomDialog';
import NoticeImage from './NoticeImage';

interface NoticeData {
    noticeImageUrl: string;
    isNoticeActive: boolean;
}

interface NoticeDialogProps {
    isOpen: boolean;
    onClose: () => void;
    noticeData: NoticeData;
}

const NoticeDialog: React.FC<NoticeDialogProps> = ({ isOpen, onClose, noticeData }) => {
    return (
        <CustomDialog isOpen={isOpen} onClose={onClose}>
            <NoticeImage
                src={noticeData.noticeImageUrl}
                alt="Important Notice"
                onClose={onClose}
            />
        </CustomDialog>
    );
};

export default NoticeDialog;