import React, { useState, useRef, useEffect } from "react";
import { Grid, Box, useMediaQuery, useTheme } from "@mui/material";
import { HiMenuAlt3 } from "react-icons/hi";
import UserLogo from "../Assets/Images/UserLogo.png";
import Program from "../Assets/Images/Program.png";
import Survey from "../Assets/Images/Survey.png";
import { right } from "@popperjs/core";
import Surveys from "../../pages/Surveys";
import { useNavigate } from "react-router-dom";
import LOGO from "../Assets/Images/LOGO.png";
import {
    setRecentquestion_id,
    setCreatedsurvey_id,
} from "../../Reducers/UiReducers";
import { useDispatch } from "react-redux";

const ToggleNavbar = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const medium = useMediaQuery(theme.breakpoints.down("md"));
    const [data, setData] = useState("");
    const [toggle, setToggle] = useState(false);

    const toggleMenu = () => {
        setToggle(!toggle);
    };
    const merchantId = sessionStorage.getItem("merchantId");

    const base64EncodedEncryptedId = btoa(
        "104voice2" + merchantId + "#voice$104"
    );

    const ColorChangeImage = () => {
        setImageColor("orange");
    };
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Function to toggle the dropdown menu
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Function to close the dropdown menu when clicking outside of it
    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setIsOpen(false);
        }
    };

    const handleManage = () => {
        dispatch(setCreatedsurvey_id(null));
        dispatch(setRecentquestion_id(null));
    };

    // Effect to add click event listener to document when dropdown is open
    useEffect(() => {
        if (isOpen) {
            document.addEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }

        // Cleanup function to remove event listener
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isOpen]);
    let section = [
        {
            Image: UserLogo,
            tittle: "Dashboard",
            nav: `response/${base64EncodedEncryptedId}`,
        },
        {
            Image: UserLogo,
            tittle: "Users",
            nav: "surveys",
        },
        {
            Image: Program,
            tittle: "Program",
            nav: "surveys",
        },
        {
            Image: Survey,
            tittle: "Surveys",
            nav: "surveys",
        },
    ];

    return (
        <>
            <Box style={{ position: "relative", zIndex: "33" }}>
                
                <Box ml={5} pt={4}>
                    <img style={{}} src={LOGO} alt="" />
                </Box>
                {/* <HiMenuAlt3 onClick={toggleMenu} size={32} color="blue" /> */}
                <Box>
                    {section.map((item, i) => (
                        <Box
                            onClick={() => {
                                setData(item.tittle);
                                navigate(`/${item.nav}`);
                                handleManage();
                            }}
                            mt={2}
                            style={{
                                background:
                                    data === item.tittle ? "#E2FF6614" : "",
                                color:
                                    data === item.tittle ? "#D6F551" : "white",
                                padding: "10px 20px",
                                fontWeight: "500",
                                fontSize: "20px",
                                cursor: "pointer",
                                fontFamily: "Public Sans",
                            }}
                        >
                            <span>
                                <img
                                    onClick={ColorChangeImage}
                                    id="changeImage"
                                    src={item.Image}
                                    alt=""
                                />
                            </span>
                            &nbsp; &nbsp;{item.tittle}
                        </Box>
                    ))}
                </Box>
            </Box>
        </>
    );
};

export default ToggleNavbar;
