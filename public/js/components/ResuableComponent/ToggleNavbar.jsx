import React, { useState } from "react";
import { Grid, Box, useMediaQuery, useTheme } from "@mui/material";
import { HiMenuAlt3 } from "react-icons/hi";
import UserLogo from "../Assets/Images/UserLogo.png";
import Program from "../Assets/Images/Program.png";
import Survey from "../Assets/Images/Survey.png";
import { right } from "@popperjs/core";

const ToggleNavbar = () => {
    const theme = useTheme();
    const medium = useMediaQuery(theme.breakpoints.down("md"));
    const [data, setData] = useState("");
    const [toggle, setToggle] = useState(false); // Initialize toggle state as false

    const toggleMenu = () => {
        setToggle(!toggle); // Toggle the state between true and false
    };

    const ColorChangeImage = () => {
        setImageColor("orange");
    };

    let section = [
        {
            Image: UserLogo,
            tittle: "Dashboard",
        },
        {
            Image: UserLogo,
            tittle: "Users",
        },
        {
            Image: Program,
            tittle: "Program",
        },
        {
            Image: Survey,
            tittle: "Surveys",
        },
        {
            Image: UserLogo,
            tittle: "Response",
        },
    ];

    return (
        <>
            <Box style={{ position: "relative", zIndex: "33" }}>
                <HiMenuAlt3
                    style={{ position: "absolute", zIndex: "5" }}
                    onClick={toggleMenu}
                    size={32}
                    color="blue"
                />
                <Box
                    style={{
                        display: toggle ? "none" : "",
                        position: "absolute",
                        right: "0",
                    }}
                >
                    {section.map((item, i) => (
                        <Box
                            onClick={() => setData(item.tittle)}
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
