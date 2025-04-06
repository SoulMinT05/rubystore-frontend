import React from 'react';
import ProductListSidebar from '../../components/ProductListSidebar/ProductListSidebar';

const ProductListPage = () => {
    return (
        <section className="py-8">
            <div className="container flex gap-3">
                <div className="sidebarWrapper w-[20%] h-full bg-white">
                    <ProductListSidebar />
                </div>
            </div>
        </section>
    );
};

export default ProductListPage;
