import { useContext } from 'react';

import UserInfoMessageDetailsSidebar from './UserInfoMessageDetailsSidebar';
import ChatListSidebar from './ChatListSidebar';
import { MyContext } from '@/App';

const MessageListSidebar = () => {
    const context = useContext(MyContext);
    return (
        <div className={`${context?.isChatOpen ? 'hidden' : 'flex'} lg:flex flex-1 flex-col  bg-white`}>
            <UserInfoMessageDetailsSidebar />
            <ChatListSidebar />
        </div>
    );
};

export default MessageListSidebar;
