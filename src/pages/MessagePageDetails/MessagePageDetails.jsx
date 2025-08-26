import MessageListSidebar from '../../components/MessageListSidebar/MessageListSidebar';
import ChatComponent from '../../components/ChatComponent/ChatComponent';
import MessageDetails from '../../components/MessageDetails/MessageDetails';
import { Breadcrumbs } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../../apis/axiosClient';
import { fetchMessagesDetails, sendMessage } from '../../redux/messageSlice';
import { socket } from '../../config/socket';
import { MyContext } from '../../App';

const MessagePageDetails = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const { messagesDetails } = useSelector((state) => state.message);

    useEffect(() => {
        const getMessageDetailsForUsers = async () => {
            const { data } = await axiosClient.get(`/api/message/getMessagesForUsers/${id}`);
            if (data?.success) {
                dispatch(fetchMessagesDetails(data?.messages));
            }
        };
        getMessageDetailsForUsers();
    }, [id]);

    useEffect(() => {
        socket.on('newMessage', (data) => {
            console.log('Client nhan newMessage: ', data);
            dispatch(sendMessage(data));
        });
        return () => {
            socket.off('newMessage');
        };
    }, []);

    return (
        <div className="!mt-[2px] !mb-[12px]">
            <div className="pb-2 pt-2  container flex items-center justify-between">
                <div className="">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link
                            underline="hover"
                            color="inherit"
                            to="/"
                            className="link transition !text-[14px] !lg:!text-[16px]"
                        >
                            Trang chủ
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            to="/message"
                            className="link transition !text-[14px] !lg:!text-[16px]"
                        >
                            Tin nhắn
                        </Link>
                    </Breadcrumbs>
                </div>
            </div>
            <div
                className="container flex  h-[94vh] rounded-xl border"
                style={{ borderColor: 'rgba(255, 255, 255, 0.125)' }}
            >
                <MessageListSidebar />
                <ChatComponent messagesDetails={messagesDetails} receiverId={id} />
            </div>
        </div>
    );
};

export default MessagePageDetails;
