import React from 'react';
import { Link } from 'react-router-dom';

const HomeBannerBox = ({ img }) => {
    return (
        <div className="box bannerBo overflow-hidden rounded-lg group">
            <Link to="/">
                <img
                    className="w-full transition-all group-hover:scale-105 group-hover:rotate-1"
                    src={img}
                    alt="Banner"
                />
            </Link>
        </div>
    );
};

export default HomeBannerBox;
