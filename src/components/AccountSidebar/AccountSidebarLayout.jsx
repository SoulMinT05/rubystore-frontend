import AccountSidebar from './AccountSidebar';

const AccountSidebarLayout = ({ children }) => {
    return (
        <section className="py-3 lg:py-10 w-full">
            <div className="container flex flex-col lg:flex-row gap-5">
                <div className="w-full lg:w-[20%]">
                    <AccountSidebar />
                </div>
                <div className="w-full lg:w-[80%]">{children}</div>
            </div>
        </section>
    );
};

export default AccountSidebarLayout;
