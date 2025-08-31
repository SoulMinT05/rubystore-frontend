import React, { useState } from 'react';
import './OtpBox.css';

const OtpBox = ({ length, onChange }) => {
    const [otp, setOtp] = useState(new Array(length).fill(''));

    const handleChange = (element, index) => {
        const value = element.value;
        if (isNaN(value)) return;

        // Update OTP value
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        onChange(newOtp.join(''));

        // Focus next input
        if (value && index < length - 1) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
    };

    const handleKeyDown = (event, index) => {
        if (event.key === 'Backspace' && !otp[index] && index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();
        }
    };

    const handlePaste = (event) => {
        event.preventDefault();
        const pasteData = event.clipboardData.getData('text').trim();
        if (!/^\d+$/.test(pasteData)) return; // chỉ nhận số

        const pasted = pasteData.slice(0, length).split('');
        const newOtp = [...otp];
        for (let i = 0; i < pasted.length; i++) {
            newOtp[i] = pasted[i];
        }
        setOtp(newOtp);
        onChange(newOtp.join(''));

        // focus ô cuối cùng có giá trị
        const lastIndex = pasted.length - 1;
        if (lastIndex >= 0 && lastIndex < length) {
            document.getElementById(`otp-input-${lastIndex}`).focus();
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }} className="otpBox">
            {otp.map((data, index) => (
                <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    maxLength="1"
                    value={otp[index]}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    className="w-[45px] h-[45px] text-center text-[17px]"
                />
            ))}
        </div>
    );
};

export default OtpBox;
