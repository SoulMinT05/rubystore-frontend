import { createContext, useState } from 'react';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);

    // useEffect(() => {
    //     axiosClient.get('/api/user/user-details');
    // }, []);

    const value = {
        userInfo,
        setUserInfo,
    };

    return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};
