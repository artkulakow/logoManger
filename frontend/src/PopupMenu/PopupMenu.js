import React, { useEffect, useRef, useState } from "react";

import './PopupMenu.scss';
import '../css/icons.css';


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

    const handleClickInside = () => {
        setClickedOutside(true);
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    });

    const {xLoc, yLoc} = props;
    const popupStyle = {
        left: xLoc + 'px',
        top: yLoc + 'px',
        display: 'block',
    };

    if (clickedOutside) {
        popupStyle.display = 'none';

        return null;
    }

    const handleClickMenuItem = (itemId) => {
        if (props.onSelect) {
            props.onSelect(itemId);
        }

        handleClickInside();
    }

    const menuEntries = (menu) => {
        if (menu === undefined || menu.length === 0) {
            return (
                <div className="noMenus">No Menus Defined</div>
            );
        }

        return (
            <div className="popMenuFrame">
                {menu.map((item, index) => {
                    const iconClass = 'icon ' + item.fontIcon;

                    return (
                        <div className="menuItem" onClick={() => {handleClickMenuItem(item.id)}}
                            key={index} 
                        >
                            <div className={iconClass}/>
                            {item.label}
                        </div>
                    )

                })}
            </div>
        )
    }

    return (
        <div ref={myRef} className="popupMenu" style={popupStyle}>
            {menuEntries(props.menu)}
        </div>
  );
};

export default PopupMenu;
