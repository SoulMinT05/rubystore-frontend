import { Button } from '@mui/material';
import React, { useState } from 'react';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa6';

import './QuantityBox.scss';

const QuantityBox = ({ onQuantityChange }) => {
    const [qtyVal, setQtyVal] = useState(1);
    const increaseQty = () => {
        const newVal = qtyVal + 1;
        setQtyVal(newVal);
        onQuantityChange(newVal); // gọi về cha
    };
    const decreaseQty = () => {
        const newVal = qtyVal > 1 ? qtyVal - 1 : 1;
        setQtyVal(newVal);
        onQuantityChange(newVal);
    };

    const handleInputChange = (e) => {
        const val = parseInt(e.target.value) || 1;
        setQtyVal(val);
        onQuantityChange(val);
    };
    return (
        <div className="quantityBox flex items-center relative">
            <input
                type="number"
                className="w-full h-[40px] p-2 pl-5 text-[15px] focus:outline-none border border-[rgba(0,0,0,0.2)]
                rounded-md"
                value={qtyVal}
                onChange={handleInputChange}
            />
            <div className="flex items-center flex-col justify-between h-[40px] absolute top-0 right-0 z-50">
                <Button
                    className="!min-w-[25px] !w-[25px] !h-[20px] !text-[#000] !rounded-none hover:!bg-[#f1f1f1]"
                    onClick={increaseQty}
                >
                    <FaAngleUp className="text-[12px] opacity-55" />
                </Button>
                <Button
                    className="!min-w-[25px] !w-[25px] !h-[20px] !text-[#000] !rounded-none hover:!bg-[#f1f1f1]"
                    onClick={decreaseQty}
                >
                    <FaAngleDown className="text-[12px] opacity-55" />
                </Button>
            </div>
        </div>
    );
};

export default QuantityBox;
