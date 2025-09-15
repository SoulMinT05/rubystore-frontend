import MessageListSidebar from '@/components/MessageListSidebar';
import ChatEmptyComponent from '@/components/ChatEmptyComponent';
import { Breadcrumbs } from '@mui/material';
import { Link } from 'react-router-dom';

const MessagePage = () => {
    return (
        <div className="!mt-[2px] !mb-[12px]">
            <div className="pb-2 pt-2 container flex items-center justify-between">
                <div className="">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link
                            underline="hover"
                            color="inherit"
                            to="/"
                            className="link transition !text-[14px] lg:!text-[16px]"
                        >
                            Trang chủ
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            to="/message"
                            className="link transition !text-[14px] lg:!text-[16px]"
                        >
                            Tin nhắn
                        </Link>
                    </Breadcrumbs>
                </div>
            </div>
            <div
                className="container flex h-[94vh] rounded-xl border"
                style={{ borderColor: 'rgba(255, 255, 255, 0.125)' }}
            >
                <MessageListSidebar />
                <ChatEmptyComponent />
            </div>
        </div>
    );
};

export default MessagePage;
