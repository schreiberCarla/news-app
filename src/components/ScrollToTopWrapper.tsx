import { useRef, useEffect, useState } from "react";
import { Fab, Zoom } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ScrollToTopWrapper = ({ children } : {children: React.ReactNode}) => {
    const topRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        topRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <div ref={topRef}></div>

            {children}

            <Zoom in={visible}>
                <Fab
                    color="primary"
                    size="medium"
                    onClick={scrollToTop}
                    sx={{
                        position: "fixed",
                        bottom: 32,
                        right: 32,
                        boxShadow: 3,
                    }}
                >
                    <KeyboardArrowUpIcon />
                </Fab>
            </Zoom>
        </>
    );
}

export default ScrollToTopWrapper;
