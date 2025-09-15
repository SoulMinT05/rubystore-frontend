import React from 'react';
import './HomeBannerImage.scss';

const HomeBannerImage = ({ image }) => {
    return (
        <div className="lg:h-[210px] w-full overflow-hidden rounded-md group relative">
            <img
                src={image}
                alt=""
                className="w-full lg:h-[115px] object-cover transition-all duration-150 group-hover:scale-105"
            />
        </div>
    );
};

export default HomeBannerImage;
