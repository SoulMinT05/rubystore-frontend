import React, { useContext, useEffect, useState } from 'react';
import { Button, CircularProgress } from '@mui/material';

import './UpdateAddressComponent.scss';
import { MyContext } from '@/App';
import axiosClient from '@/apis/axiosClient';

const UpdateAddressComponent = () => {
    const context = useContext(MyContext);

    const [streetLine, setStreetLine] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const { data } = await axiosClient.get('/api/user/user-details');
                if (data?.success && data?.user) {
                    context?.setUserInfo(data?.user);

                    setStreetLine(data?.user?.address?.streetLine || '');
                    setCity(data?.user?.address?.city || '');
                    setDistrict(data?.user?.address?.district || '');
                    setWard(data?.user?.address?.ward || '');
                }
            } catch (error) {
                console.error('Không thể lấy thông tin', error);
            }
        };

        fetchInfo();
    }, []); // chỉ chạy 1 lần khi component mount

    const updateAddress = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const { data } = await axiosClient.put('/api/user/update-address', {
                streetLine,
                city,
                district,
                ward,
            });
            if (data?.success) {
                context?.openAlertBox('success', 'Cập nhật địa chỉ thành công');
                context?.setUserInfo((prev) => ({
                    ...prev,
                    address: {
                        streetLine: data?.address?.streetLine,
                        city: data?.address?.city,
                        district: data?.address?.district,
                        ward: data?.address?.ward,
                    },
                }));
                context?.setIsOpenFullScreenPanel({
                    open: false,
                });
            }
        } catch (error) {
            console.log(error);
            context?.openAlertBox('error', error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <section className="p-5 bg-gray-50">
            <form onSubmit={updateAddress} className="form p-8 py-3 max-h-[800px] ">
                <div className="scroll overflow-y-scroll">
                    <div className="grid grid-cols-1 sm:grid-cols-2 mb-3 gap-4">
                        <div className="col w-[100%]">
                            <h3 className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] font-[500] mb-1 text-black">
                                Tên đường
                            </h3>
                            <input
                                value={streetLine || ''}
                                onChange={(e) => setStreetLine(e.target.value)}
                                type="text"
                                className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm"
                            />
                        </div>
                        <div className="col w-[100%]">
                            <h3 className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] font-[500] mb-1 text-black">
                                Phường
                            </h3>
                            <input
                                value={ward || ''}
                                onChange={(e) => setWard(e.target.value)}
                                type="text"
                                className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 mb-3 gap-4">
                        <div className="col w-[100%]">
                            <h3 className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] font-[500] mb-1 text-black">
                                Quận / Huyện
                            </h3>
                            <input
                                value={district || ''}
                                onChange={(e) => setDistrict(e.target.value)}
                                type="text"
                                className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm"
                            />
                        </div>
                        <div className="col w-[100%]">
                            <h3 className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] font-[500] mb-1 text-black">
                                Thành phố
                            </h3>
                            <input
                                value={city || ''}
                                onChange={(e) => setCity(e.target.value)}
                                type="text"
                                className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm"
                            />
                        </div>
                    </div>

                    <br />
                    <Button type="submit" className="btn-org w-full !normal-case flex gap-2">
                        {isLoading === true ? (
                            <CircularProgress color="inherit" />
                        ) : (
                            <span className="text-[14px] sm:text-[16px]">Cập nhật địa chỉ</span>
                        )}
                    </Button>
                </div>
            </form>
        </section>
    );
};

export default UpdateAddressComponent;
