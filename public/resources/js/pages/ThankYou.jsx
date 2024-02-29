import { React, useState } from "react";
import { Grid, Box, useMediaQuery, useTheme } from "@mui/material";
import SearchBar from "../components/ResuableComponent/SearchBar";
import RightNavBar from "../components/ResuableComponent/RightNavbar";
import LOGO from "../components/Assets/Images/LOGO.png";
import { useDispatch } from "react-redux";
// import { setId } from "../Reducers/UiReducers";
// import Correct from "../Assets/Images/Correct.svg";

const ThankYou = () => {
    const theme = useTheme();
    const medium = useMediaQuery(theme.breakpoints.down("md"));
    const small = useMediaQuery(theme.breakpoints.down("sm"));
    const [isHovered, setIsHovered] = useState("");
    const [data, setData] = useState(false);
    const [number, setNumber] = useState("");
    const [select, setSelect] = useState("");
    const [message, setMessage] = useState("");
    let boxNumber = [
        {
            number: "01",
        },
        {
            number: "02",
        },
        {
            number: "03",
        },
        {
            number: "04",
        },
        {
            number: "05",
        },
        {
            number: "06",
        },
        {
            number: "07",
        },
        {
            number: "08",
        },
    ];
    const handleBoxClick = (item) => {
        if (select === item) {
            setSelect(null);
            setData(false);
            setMessage("");
        } else {
            setSelect(item);
            setData(true);
            setMessage("");
        }
    };
    const handleSubmit = () => {
        sessionStorage.setItem("rating", number);
        setPage("Question2");
    };
    return (
        <>
            <Grid
                style={{
                    background: "black",
                    margin: "0px",
                    padding: "0px",
                    overflow: "hidden",
                    boxSizing: "border-box",
                    fontFamily: "Inter",
                    // height: "100vh",
                }}
                container
            >
                <Grid item lg={2} md={2} sm={2} xs={2}>
                    <RightNavBar />
                </Grid>
                <Grid item lg={9.5} md={9.5} sm={12} xs={12}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Grid container>
                            <Grid
                                item
                                lg={11}
                                md={11}
                                sm={11}
                                xs={11}
                                mx="auto"
                            >
                                <SearchBar />
                            </Grid>
                            <Grid
                                style={{
                                    background: medium ? "black" : "#161616",
                                    paddingTop: medium ? "0px" : "60px",
                                    paddingBottom: "160px",
                                    borderRadius: "20px",
                                    fontFamily: "Inter",
                                    marginBottom: "50px",
                                }}
                                item
                                lg={11}
                                md={11}
                                sm={11}
                                xs={11}
                                mx="auto"
                            >
                                <Grid container>
                                    {/* <Grid item lg={3}></Grid> */}
                                </Grid>
                                <Grid
                                    item
                                    lg={7}
                                    md={8}
                                    sm={8}
                                    xs={8}
                                    mx="auto"
                                >
                                    <Box
                                        style={{
                                            textAlign: "center",
                                            marginTop: "-20px",
                                            marginBottom: "50px",
                                            justifyContent: "center",
                                            display: "flex",
                                        }}
                                        // ml={3}
                                        mt={5}
                                        mb={5}
                                    >
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

                                    {message === "enter" ? (
                                        <Box
                                            style={{
                                                color: "red",
                                                textAlign: "center",
                                            }}
                                        >
                                            Please Select one option
                                        </Box>
                                    ) : (
                                        ""
                                    )}
                                    <Box
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Box
                                            style={{
                                                background: "#474747",
                                                padding: "40px",
                                                borderRadius: "24px",
                                            }}
                                        ></Box>
                                    </Box>
                                    <Box
                                        mt={4}
                                        style={{
                                            fontSize: "35px",
                                            fontWeight: "600",
                                            color: "rgb(226, 255, 101)",
                                            textAlign: "center",
                                        }}
                                    >
                                        Thank You
                                    </Box>
                                    <Box
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Box
                                            mt={2}
                                            style={{
                                                background: "grey",
                                                width: "250px",
                                                padding: "1px",
                                            }}
                                        ></Box>
                                    </Box>
                                    <Box
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Box
                                            style={{
                                                color: "white",
                                                textAlign: "center",
                                                padding: "30px",
                                            }}
                                        >
                                            {" "}
                                            <center>
                                                Log in and earn your points
                                            </center>{" "}
                                            be part of community
                                        </Box>
                                    </Box>
                                </Grid>
                                {/* <Grid item lg={3}></Grid> */}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default ThankYou;
