import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';

dayjs.extend(relativeTime);
dayjs.locale('vi');

// Time
export const formatOnlineTime = (createdAt) => {
    const now = dayjs();
    const diffDays = now.diff(dayjs(createdAt), 'day');
    return diffDays < 7
        ? dayjs(createdAt).fromNow() // ví dụ: "2 phút trước"
        : dayjs(createdAt).format('DD/MM/YYYY'); // ví dụ: "12/06/2025"
};

const weekdaysShort = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
export function formatDisplayTime(date) {
    const now = dayjs();
    const msgTime = dayjs(date);

    if (now.isSame(msgTime, 'day')) {
        // cùng ngày → chỉ hiện giờ
        return msgTime.format('HH:mm');
    } else if (now.isSame(msgTime, 'week')) {
        // return msgTime.format('HH:mm dddd'); // ví dụ "23:39 Thứ Ba"
        // trong cùng tuần → giờ + thứ rút gọn (T2, T3...)
        return `${msgTime.format('HH:mm')} ${weekdaysShort[msgTime.day()]}`;
    } else {
        // khác tuần → giờ + ngày tháng năm
        return msgTime.format('HH:mm D MMMM, YYYY'); // "13:52 19 Tháng 8, 2025"
    }
}

// Date
export function formatDate(date) {
    if (!(date instanceof Date)) {
        date = new Date(date); // nếu truyền string hoặc timestamp thì convert sang Date
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export function formatDateUTCPlus7(dateString) {
    const date = new Date(dateString);
    date.setHours(date.getHours());

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year} `;
}

// Small Price
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
};

// Large Price
export function formatPrice(value) {
    if (value >= 1_000_000) {
        return `${(value / 1_000_000).toString().replace(/\.0$/, '')}tr VND`;
    } else if (value >= 1000) {
        return `${(value / 1000).toString().replace(/\.0$/, '')}k VND`;
    }
    return `${value} VND`;
}
