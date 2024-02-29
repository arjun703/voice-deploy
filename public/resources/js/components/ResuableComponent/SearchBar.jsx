import React, { useEffect, useState } from "react";
import { Grid, Box, useMediaQuery, useTheme } from "@mui/material";
// import RightNavBar from "./RightNavBar";
import Search from "../Assets/Images/Search.png";
import Notification from "../Assets/Images/Notification.png";
import User from "../Assets/Images/User.png";
import DownArrow from "../Assets/Images/DownArrow.png";
// import LOGO form "../"
import LOGO from "../Assets/Images/LOGO.png";
import ToggleNavbar from "./ToggleNavbar";
import axios from "axios";

const SearchBar = () => {
    const theme = useTheme();
    const medium = useMediaQuery(theme.breakpoints.down("md"));
    const userid = sessionStorage.getItem("merchantId");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getSessionData = async () => {
            try {
                const response = await axios.get(`/api/session/${userid}`);
                const apiResponse = response.data.user.merchantName;
                setUser(apiResponse);
            } catch (error) {
                console.error("Error fetching session data", error);
            }
        };
        getSessionData();
    }, []);
    return (
        <>
            <Box
                pt={4}
                mb={3}
                style={{
                    // visibility: medium ? "hidden" : "",
                    background: "black",
                    display: medium ? "none" : "flex",
                    justifyContent: "space-between",
                }}
            >
                <Box
                    style={{
                        background: "#161616",
                        padding: "5px 20px",
                        borderRadius: "25px",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Box mb={0.5}>
                        <img src={Search} alt="" />
                    </Box>{" "}
                    &nbsp;
                    <Box ml={1}>
                        <input
                            style={{
                                outline: "none",
                                border: "none",
                                background: "#161616",
                                fontFamily: "Inter",
                                color: "white",
                                fontFamily: "Poppins",
                            }}
                            type="text"
                            placeholder="Email Address"
                        />
                    </Box>
                </Box>
                <Box
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Box
                        mr={2}
                        style={{
                            background: "#161616",
                            padding: "8px 10px",
                            borderRadius: "28px",
                            // marginTop: "8px",
                        }}
                    >
                        <img
                            style={{ width: "23px", height: "20px" }}
                            src={Notification}
                            alt=""
                        />
                    </Box>
                    <Box
                        style={{
                            // padding: "8px",
                            width: "35px",
                            height: "35px",
                        }}
                    >
                        <img src={User} alt="" />
                    </Box>
                    <Box
                        style={{
                            fontSize: "18px",
                            padding: "10px",
                            color: "#94A3B8",
                        }}
                    >
                        {user}
                    </Box>
                    <Box>
                        <img src={DownArrow} alt="DownArrow" />
                    </Box>
                </Box>
            </Box>

            <Box
                style={{
                    display: medium ? "flex" : "none",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Box ml={3} mt={5} mb={4}>
                    <img
                        style={{
                            width: "100px",
                            height: "23px",
                            cursor: "pointer",
                        }}
                        src={LOGO}
                        alt=""
                    />
                </Box>
                <Box>
                    <ToggleNavbar />
                </Box>
            </Box>
        </>
    );
};

export default SearchBar;
