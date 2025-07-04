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
import AccountSidebar from '../../components/AccountSidebar/AccountSidebar';
import { MyContext } from '../../App';
import axiosClient from '../../apis/axiosClient';
import { IoMdClose } from 'react-icons/io';
import UpdateAddressComponent from '../../components/UpdateAddressComponent/UpdateAddressComponent';
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
        <>
            <section className="py-10 w-full">
                <div className="container flex gap-5">
                    <div className="col1 w-[20%]">
                        <AccountSidebar context={context} />
                    </div>
                    <div className="col2 w-[80%]">
                        <div className="card bg-white p-5 shadow-md rounded-md">
                            <h2 className="pb-3">Trang cá nhân</h2>
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
                                <div className="flex items-center gap-5 mt-4">
                                    <div className="w-[50%]">
                                        <TextField
                                            onChange={(e) => setName(e.target.value)}
                                            value={name || ''}
                                            label="Họ và tên"
                                            variant="outlined"
                                            size="small"
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="w-[50%]">
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
                                    className="flex items-center justify-center p-3  mt-4 mb-5 border border-dashed border-[rgba(0,0,0,0.2)] bg-[#f1faff] hover:bg-[#e7f3f9] cursor-pointer"
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
                    </div>
                </div>
            </section>
        </>
    );
};

export default MyAccountPage;
