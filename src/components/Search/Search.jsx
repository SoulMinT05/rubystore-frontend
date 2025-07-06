import React, { useEffect, useRef, useState } from 'react';
import '../Search/Search.css';
import { Button } from '@mui/material';
import { IoSearch } from 'react-icons/io5';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import axiosAuth from '../../apis/axiosAuth';
import { Link, useNavigate } from 'react-router-dom';

const Search = () => {
    const navigate = useNavigate();
    const [openSearchBox, setOpenSearchBox] = useState(false);
    const searchRef = useRef(null);
    const [searchText, setSearchText] = useState('');

    const [searchProducts, setSearchProducts] = useState([]);

    // Debounce search
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (searchText.trim() !== '') {
                fetchSearchProducts();
            } else {
                setSearchProducts([]); // Clear nếu ô trống
            }
        }, 500); // chờ 500ms sau khi người dùng dừng gõ

        return () => clearTimeout(delayDebounce);
    }, [searchText]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setOpenSearchBox(false); // Ẩn nếu click ra ngoài
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const fetchSearchProducts = async () => {
        try {
            const { data } = await axiosAuth.get(`/api/product/search?query=${encodeURIComponent(searchText)}`);
            console.log('dataFetchSearch: ', data);
            if (data?.success) {
                setSearchProducts(data?.products);
            }
        } catch (error) {
            console.error('Search error:', error);
        }
    };

    const handleNavigateProduct = (productId) => {
        navigate(productId);
        setSearchText('');
        setOpenSearchBox(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && searchText.trim() !== '') {
            navigate(`/search?keyword=${encodeURIComponent(searchText.trim())}`);
            setSearchText('');
            setOpenSearchBox(false);
        }
    };

    return (
        <div ref={searchRef} className="relative z-[1000]">
            <div
                onClick={() => setOpenSearchBox(!openSearchBox)}
                className="searchBox w-[100%] h-[50px] bg-[#e5e5e5] rounded-[5px] relative p-2"
            >
                <input
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="w-full h-[35px] focus:outline-none bg-inherit p-2 text-[15px]"
                />
                <Button
                    onClick={() => navigate(`/search?keyword=${encodeURIComponent(searchText.trim())}`)}
                    className="!absolute top-[8px] right-[5px] z-50 !w-[37px] !min-w-[37px] h-[35px] !rounded-full !text-black"
                >
                    <IoSearch className="text-[#4e4e4e] text-[22px]" />
                </Button>
            </div>

            {openSearchBox && (
                <div className="absolute w-[100%]">
                    {searchProducts?.length > 0 &&
                        searchProducts?.map((product, index) => {
                            return (
                                <List key={product?._id} sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                    <ListItem
                                        onClick={() => handleNavigateProduct(`/product/${product?._id}`)}
                                        className="flex items-center cursor-pointer"
                                    >
                                        <ListItemAvatar>
                                            <Avatar
                                                className="!w-[60px] !h-[60px] object-cover rounded-md group-hover:scale-105 transition-all cursor-pointer"
                                                alt={product?.name}
                                                src={product?.images[0]}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText
                                            className="ml-[12px]"
                                            secondary={
                                                <>
                                                    <Typography
                                                        className="block w-full link truncate"
                                                        component="span"
                                                        // variant="subtitle1"
                                                        sx={{ fontSize: '16px', fontWeight: 400 }}
                                                    >
                                                        {product?.name}
                                                    </Typography>
                                                </>
                                            }
                                        />
                                    </ListItem>

                                    {index !== searchProducts?.length - 1 && (
                                        <Divider component="li" sx={{ marginLeft: 0 }} />
                                    )}
                                </List>
                            );
                        })}
                </div>
            )}
        </div>
    );
};

export default Search;
