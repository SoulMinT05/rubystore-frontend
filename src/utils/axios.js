import axios from 'axios';

const postData = async (url, formData) => {
    try {
        const res = await fetch(import.meta.env.VITE_BACKEND_URL + url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
    } catch (error) {
        console.log(error);
    }
};

export { postData };
