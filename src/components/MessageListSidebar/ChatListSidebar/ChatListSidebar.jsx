import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Divider, TextField } from '@mui/material';
import { IoIosSearch } from 'react-icons/io';
import { FaPlus } from 'react-icons/fa6';
import { FaMinus } from 'react-icons/fa6';
import axiosClient from '../../../apis/axiosClient';
import { fetchMessagesSidebar, updateOnlineStatusSidebar } from '../../../redux/messageSlice';
import { Link, useParams } from 'react-router-dom';
import { MyContext } from '../../../App';
import { socket } from '../../../config/socket';

const ChatListSidebar = () => {
    const context = useContext(MyContext);
    const { id } = useParams();
    const dispatch = useDispatch();
    const { messagesSidebar } = useSelector((state) => state.message);

    const [searchStaff, setSearchStaff] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    useEffect(() => {
        const handleDebounceSearch = setTimeout(() => {
            setDebouncedSearch(searchStaff);
        }, 500);

        return () => {
            clearTimeout(handleDebounceSearch);
        };
    }, [searchStaff]);

    useEffect(() => {
        const getMessagesForUsers = async () => {
            const { data } = await axiosClient.get(`/api/message/getStaffsInSidebar?search=${debouncedSearch}`);
            console.log('staffSidebar: ', data);
            if (data?.success) {
                dispatch(fetchMessagesSidebar(data.staffs));
            }
        };
        getMessagesForUsers();
    }, [id, debouncedSearch, dispatch]);

    useEffect(() => {
        socket.on('staffOnlineStatus', (data) => {
            console.log('staffOnlineStatus: ', data);
            dispatch(updateOnlineStatusSidebar(data));
        });
        return () => {
            socket.off('staffOnlineStatus');
        };
    }, []);

    return (
        <>
            <div className="chatList ">
                <div className="flex items-center gap-3 w-full">
                    <div className="relative flex-1 px-2 text-[13px] lg:text-[14px] h-[40px]">
                        <Button className="!absolute top-1/2 left-3 -translate-y-1/2 !w-[35px] !min-w-[35px] h-[35px] !rounded-full bg-gray-100 hover:bg-gray-200">
                            <IoIosSearch className="text-[18px] text-gray-600" />
                        </Button>
                        <input
                            type="text"
                            value={searchStaff}
                            onChange={(e) => setSearchStaff(e.target.value)}
                            placeholder="Tìm kiếm đoạn chat..."
                            className="w-full h-full bg-gray-100 p-2 pl-10 pr-10 rounded-full focus:outline-none"
                        />
                    </div>
                </div>
            </div>

            <div className="chatList flex-1 overflow-scroll mt-4">
                {messagesSidebar?.length > 0 &&
                    messagesSidebar?.map((message, index) => {
                        // const isOwn = message?._id === context?.userInfo?._id;
                        // const isLast = index === messagesSidebar?.length - 1;
                        return (
                            <Link
                                onClick={() => {
                                    if (window.innerWidth < 1024) context?.setIsChatOpen(true);
                                }}
                                key={message._id}
                                to={`/message/${message._id}`}
                            >
                                <div className="item flex items-center p-4 gap-4 cursor-pointer hover:bg-gray-100 transition-colors duration-200">
                                    <div className="relative">
                                        <img
                                            className="w-[50px] h-[50px] object-cover rounded-full "
                                            src={message?.avatar}
                                            alt={message?.name}
                                        />
                                        {message?.isOnline && (
                                            <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                                        )}
                                    </div>
                                    <div className="texts flex flex-col">
                                        <span className="text-[13px] lg:text-[14px] font-[500] ">{message?.name}</span>
                                        <p
                                            className={`text-[12px] lg:text-[13px] font-[500] my-[2px] ${
                                                message?.role === 'admin' ? 'text-green-500' : 'text-blue-500'
                                            }`}
                                        >
                                            {message?.role === 'admin' ? 'Quản lý' : 'Nhân viên'}
                                        </p>
                                        {/* {isLast && isOwn ? (
                                            <p
                                                className={`text-[12px] lg:text-[13px] font-[500] my-[2px] ${
                                                    message?.role === 'admin' ? 'text-green-500' : 'text-blue-500'
                                                }`}
                                            >
                                                {message?.role === 'admin' ? 'Quản lý' : 'Nhân viên'}
                                            </p>
                                        ) : (
                                            <p
                                                className={`text-[12px] lg:text-[13px] font-[500] my-[2px] ${
                                                    message?.role === 'admin' ? 'text-green-500' : 'text-blue-500'
                                                }`}
                                            >
                                                {message?.role === 'admin' ? 'Quản lý' : 'Nhân viên'}
                                            </p>
                                        )} */}
                                    </div>
                                </div>
                                {index !== messagesSidebar?.length - 1 && <Divider />}
                            </Link>
                        );
                    })}
            </div>
        </>
    );
};

export default ChatListSidebar;
