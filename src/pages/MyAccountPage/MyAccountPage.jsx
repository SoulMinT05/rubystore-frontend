import {
    Button,
    TextField,
    CircularProgress,
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Slide,
} from '@mui/material';
import React, { useContext, useEffect, useState, forwardRef } from 'react';
import './MyAccountPage.css';
import { MyContext } from '../../App';
import axiosClient from '../../apis/axiosClient';
import { IoMdClose } from 'react-icons/io';
import UpdateAddressComponent from '../../components/UpdateAddressComponent/UpdateAddressComponent';
import AccountSidebarLayout from '../../components/AccountSidebar/AccountSidebarLayout';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const MyAccountPage = () => {
    const context = useContext(MyContext);
    const [name, setName] = useState(context?.userInfo?.name || '');
    const [phoneNumber, setPhoneNumber] = useState(context?.userInfo?.phoneNumber || '');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const { data } = await axiosClient.get('/api/user/user-details');
                if (data.success && data?.user) {
                    context?.setUserInfo(data?.user);
                    setName(data?.user?.name);
                    setPhoneNumber(data?.user?.phoneNumber);
                }
            } catch (error) {
                console.error('Không thể lấy avatar', error);
            }
        };

        fetchInfo();
    }, []);

    const updateInfo = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const { data } = await axiosClient.put('/api/user/update-info', {
                name,
                phoneNumber,
            });
            console.log('dataUpdateInfo: ', data);
            if (data.success) {
                context.openAlertBox('success', data.message);
                context.setUserInfo(data);
            } else {
                context.openAlertBox('error', data.message);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <AccountSidebarLayout>
            <div className="card bg-white p-5 shadow-md rounded-md">
                <h2 className="pb-3 text-[15px] lg:text-[16px]">Trang cá nhân</h2>
                <hr />

                <form className="mt-5" onSubmit={updateInfo}>
                    <div className="flex items-center gap-5">
                        <div className="w-[100%]">
                            <TextField
                                value={context?.userInfo?.email || ''}
                                label="Email"
                                variant="outlined"
                                size="small"
                                className="w-full"
                            />
                        </div>
                    </div>
                    <p className="italic text-left text-[13px]">Bạn không thể thay đổi email.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4">
                        <div className="col">
                            <TextField
                                onChange={(e) => setName(e.target.value)}
                                value={name || ''}
                                label="Họ và tên"
                                variant="outlined"
                                size="small"
                                className="w-full"
                            />
                        </div>
                        <div className="col">
                            <TextField
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                value={phoneNumber || ''}
                                label="Số điện thoại"
                                variant="outlined"
                                size="small"
                                className="w-full"
                            />
                        </div>
                    </div>

                    <br />

                    <div
                        className="flex items-center justify-center p-3 mt-2 sm:mt-3 mb-5 border border-dashed border-[rgba(0,0,0,0.2)] bg-[#f1faff] hover:bg-[#e7f3f9] cursor-pointer"
                        onClick={() =>
                            context.setIsOpenFullScreenPanel({
                                open: true,
                                model: 'Cập nhật địa chỉ',
                            })
                        }
                    >
                        <span className="text-[14px] font-[500]">Địa chỉ</span>
                    </div>

                    <div className="flex items-center justify-end gap-4">
                        <Button type="submit" className="btn-org btn-login w-full flex gap-3">
                            {isLoading === true ? <CircularProgress color="inherit" /> : 'Lưu thông tin'}
                        </Button>
                    </div>
                </form>
            </div>
        </AccountSidebarLayout>
        // <>
        //     <section className="py-3 lg:py-10 w-full">
        //         <div className="container flex flex-col lg:flex-row gap-5">
        //             <div className="w-full lg:w-[20%]">
        //                 <AccountSidebar />
        //             </div>
        //             <div className="w-full lg:w-[80%]">
        //                 <div className="card bg-white p-5 shadow-md rounded-md">
        //                     <h2 className="pb-3 text-[15px] lg:text-[16px]">Trang cá nhân</h2>
        //                     <hr />

        //                     <form className="mt-5" onSubmit={updateInfo}>
        //                         <div className="flex items-center gap-5">
        //                             <div className="w-[100%]">
        //                                 <TextField
        //                                     value={context?.userInfo?.email || ''}
        //                                     label="Email"
        //                                     variant="outlined"
        //                                     size="small"
        //                                     className="w-full"
        //                                 />
        //                             </div>
        //                         </div>
        //                         <p className="italic text-left text-[13px]">Bạn không thể thay đổi email.</p>
        //                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4">
        //                             <div className="col">
        //                                 <TextField
        //                                     onChange={(e) => setName(e.target.value)}
        //                                     value={name || ''}
        //                                     label="Họ và tên"
        //                                     variant="outlined"
        //                                     size="small"
        //                                     className="w-full"
        //                                 />
        //                             </div>
        //                             <div className="col">
        //                                 <TextField
        //                                     onChange={(e) => setPhoneNumber(e.target.value)}
        //                                     value={phoneNumber || ''}
        //                                     label="Số điện thoại"
        //                                     variant="outlined"
        //                                     size="small"
        //                                     className="w-full"
        //                                 />
        //                             </div>
        //                         </div>

        //                         <br />

        //                         <div
        //                             className="flex items-center justify-center p-3 mt-2 sm:mt-3 mb-5 border border-dashed border-[rgba(0,0,0,0.2)] bg-[#f1faff] hover:bg-[#e7f3f9] cursor-pointer"
        //                             onClick={() =>
        //                                 context.setIsOpenFullScreenPanel({
        //                                     open: true,
        //                                     model: 'Cập nhật địa chỉ',
        //                                 })
        //                             }
        //                         >
        //                             <span className="text-[14px] font-[500]">Địa chỉ</span>
        //                         </div>

        //                         <div className="flex items-center justify-end gap-4">
        //                             <Button type="submit" className="btn-org btn-login w-full flex gap-3">
        //                                 {isLoading === true ? <CircularProgress color="inherit" /> : 'Lưu thông tin'}
        //                             </Button>
        //                         </div>
        //                     </form>
        //                 </div>
        //             </div>
        //         </div>
        //     </section>
        // </>
    );
};

export default MyAccountPage;
