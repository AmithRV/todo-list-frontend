import { useEffect, useRef, useState } from "react";

function Header({ setType }) {
    const ref = useRef(null);
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsMenuVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    return (
        <>
            <div className='header-wrap'>
                <div className="header">
                    <div className="loader" title="Active">
                        <div className="circle">
                        </div>
                    </div>

                    <div className="settings">
                        <img
                            src="./icons/settings.svg"
                            onClick={() => { setIsMenuVisible(!isMenuVisible) }}
                            alt={'icon'}
                        />
                    </div>
                </div>
            </div>

            {
                (isMenuVisible) ? (
                    <div className="menu-wrap" ref={ref}>
                        <div className="menu">
                            <span
                                className="menu-item"
                                onClick={() => {
                                    setType('decrypt');
                                    setIsMenuVisible(false);
                                }}
                                title='press +'
                            >
                                Decrypt
                            </span>

                            <span
                                className="menu-item"
                                onClick={() => {
                                    setType('add');
                                    setIsMenuVisible(false);
                                }}
                            >
                                Add
                            </span>

                            <span
                                className="menu-item"
                                onClick={() => {
                                    setType('chang-bg-image');
                                    setIsMenuVisible(false);
                                }}
                            >
                                Change background
                            </span>
                        </div>
                    </div>
                ) : (<></>)
            }

        </>
    )
}

export default Header;