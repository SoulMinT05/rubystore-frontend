import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
    return (
        <>
            <Header /> {/* included Navigation */}
            <div>
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default DefaultLayout;
