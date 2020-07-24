import React, { useEffect, useRef, useState } from "react";
import { ReactReduxContext } from "react-redux";

const PopupMenu = (props) => {
    const [clickedOutside, setClickedOutside] = useState(false);
    const myRef = useRef();

    const handleClickOutside = e => {
        if (myRef.current && !myRef.current.contains(e.target)) {
            setClickedOutside(true);
        }
        else {
            setClickedOutside(false);
        }
    };

    const handleClickInside = () => setClickedOutside(false);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    });

    console.log('xxxxxxx')

    const {xLoc, yLoc} = props;
    const popupStyle = {
        position: 'absolute',
        left: xLoc + 'px',
        top: yLoc + 'px',
        width: '100px',
        height: '100px',
        backgroundColor: 'green',
        display: 'block',
    };

    if (clickedOutside) {
        popupStyle.display = 'none';

        return null;
    }

    return (
        <div ref={myRef} className="popupMenu" style={popupStyle} onClick={handleClickInside}></div>
  );
};

export default PopupMenu;
