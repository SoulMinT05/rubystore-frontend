import React from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import { IoCloseSharp } from 'react-icons/io5';

import './CategoryPanel.scss';
import CategoryCollapse from './CategoryCollapse';

const CategoryPanel = ({ categories, isOpenCatPanel, setIsOpenCatPanel }) => {
    const toggleDrawer = (newOpen) => () => {
        setIsOpenCatPanel(newOpen);
    };
    const DrawerList = (
        <Box className="categoryPanel" sx={{ width: 250 }} role="presentation">
            <h3 className="p-3 text-[14px] lg:text-[16px] font-[500] flex items-center justify-between">
                Danh mục sản phẩm
                <IoCloseSharp onClick={toggleDrawer(false)} className="cursor-pointer text-[18px] lg:text-[20px]" />
            </h3>

            {categories?.length !== 0 && <CategoryCollapse categories={categories} toggleDrawer={toggleDrawer} />}
        </Box>
    );

    return (
        <>
            <Drawer open={isOpenCatPanel} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </>
    );
};

export default CategoryPanel;
