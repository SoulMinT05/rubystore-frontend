import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTopButton = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg border 
                transition-all duration-300 
            ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'} 
            bg-white text-[#ff5252] border-[#ff5252] hover:bg-[#ff5252] hover:text-white`}
        >
            <FaArrowUp />
        </button>
    );
};

export default ScrollToTopButton;
