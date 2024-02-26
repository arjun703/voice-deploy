import React, { useState } from "react";
import { Grid, Box, useMediaQuery, useTheme } from "@mui/material";
// import LOGO from "../Assets/Images/LOGO.svg";
import Correct from "../components/Assets/Images/Correct.svg";
import SearchBar from "../components/ResuableComponent/SearchBar";
// import "../Style/FontFamily.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PromotedScore = ({ setPage, createdSurveyId }) => {
    // console.log("created", createdSurveyId);
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const SurveyName = location.state && location.state.surveyName;
    const userid = sessionStorage.getItem("userId");
    console.log(userid);
    const SurveyChannel = location.state && location.state.SurveyChannel;
    const surveyId = location.state && location.state.surveyId;
    const merchantId = location.state && location.state.merchantId;
    console.log("surveyTypeid in promoted page", surveyId, merchantId);
    console.log("Name on Promoted Page:", SurveyName, SurveyChannel);

    const medium = useMediaQuery(theme.breakpoints.down("md"));
    const small = useMediaQuery(theme.breakpoints.down("sm"));
    const [data, setData] = useState(false);
    const [select, setSelect] = useState("");
    const [message, setMessage] = useState("");
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

    const handlePassData = () => {
        // navigate("/dashboard", { SurveyName, SurveyChannel, userid, surveyId });
        navigate("/dashboard", {
            state: {
                SurveyName: SurveyName,
                SurveyChannel: SurveyChannel,
                userid: userid,
                surveyId: surveyId,
                merchantId: merchantId,
                createdSurveyId,
            },
        });
        setPage("Question");
    };
    return (
        <Grid item lg={12} md={12} sm={12} xs={12}>
            <Grid container>
                <Grid item lg={11} md={11} sm={11} xs={11} mx="auto">
                    <SearchBar />
                </Grid>
                <Grid
                    style={{
                        background: medium ? "black" : "#161616",
                        paddingTop: medium ? "0px" : "60px",
                        paddingBottom: "80px",
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
                    // onClick={() => setSelect('')}
                >
                    <Box
                        style={{
                            textAlign: "center",
                            color: "white",
                            fontWeight: "500",
                            fontSize: "28px",
                            fontFamily: "Inter",
                            // cursor: "pointer",
                        }}
                    >
                        Net Promoter Score
                    </Box>

                    {message === "enter" ? (
                        <Box style={{ color: "red", textAlign: "center" }}>
                            Please Select at least one option
                        </Box>
                    ) : (
                        ""
                    )}

                    <Grid container>
                        {/* <Grid item lg={3}></Grid> */}
                        <Grid
                            style={{ color: "white" }}
                            item
                            lg={6}
                            md={8}
                            sm={8}
                            xs={8}
                            mx="auto"
                        >
                            <Box
                                style={{
                                    background: medium ? "black" : "#161616",
                                    // #626262
                                    // #E2FF66
                                    // borderColor: "#626262",
                                    borderColor:
                                        select === "customer"
                                            ? "#E2FF66"
                                            : "#626262",
                                    color: "white",
                                    padding: "10px",
                                    display: "flex",
                                    cursor: "pointer",
                                    borderRadius: "8px",
                                }}
                                // onClick={() => {
                                //     setData(true);
                                //     setSelect("customer");
                                //     setMessage("");
                                // }}
                                // onClick={() => set}
                                onClick={() => handleBoxClick("customer")}
                                onDoubleClick={() => handleBoxClick("customer")}
                                className="form-control"
                                mt={5}
                            >
                                <Box>
                                    <img
                                        style={{
                                            marginTop: "10px",
                                            marginLeft: "5px",
                                        }}
                                        src={Correct}
                                        alt=""
                                    />
                                </Box>
                                <Box
                                    className="copied-message"
                                    style={{ marginLeft: "15px" }}
                                >
                                    Customers evaluate their likelihood to
                                    recommend your Products & Services (From 0
                                    to 10)
                                </Box>
                            </Box>
                            <Box
                                // onClick={() => {
                                //     setData(true);
                                //     setSelect("contribute");
                                //     setMessage("");
                                // }}
                                onClick={() => handleBoxClick("contribute")}
                                onDoubleClick={() =>
                                    handleBoxClick("contributr")
                                }
                                className="form-control"
                                style={{
                                    background: medium ? "black" : "#161616",
                                    // borderColor: "#626262",
                                    borderColor:
                                        select === "contribute"
                                            ? "#E2FF66"
                                            : "#626262",
                                    color: "white",
                                    padding: "10px",
                                    display: "flex",
                                    cursor: "pointer",
                                    borderRadius: "8px",
                                }}
                                mt={3}
                            >
                                <Box>
                                    <img
                                        style={{
                                            marginTop: "10px",
                                            marginLeft: "5px",
                                        }}
                                        src={Correct}
                                        alt=""
                                    />
                                </Box>

                                <Box style={{ marginLeft: "15px" }}>
                                    We ask your customers about the factor that
                                    contributed the most in their evaluation.
                                </Box>
                            </Box>
                            <Box
                                // onClick={() => {
                                //     setData(true);
                                //     setSelect("ask");
                                //     setMessage("");
                                // }}
                                onClick={() => handleBoxClick("ask")}
                                onDoubleClick={() => handleBoxClick("ask")}
                                className="form-control"
                                style={{
                                    background: medium ? "black" : "#161616",
                                    borderColor:
                                        select === "ask"
                                            ? "#E2FF66"
                                            : "#626262",
                                    // borderColor: "#626262",
                                    color: "white",
                                    padding: "10px",
                                    display: "flex",
                                    cursor: "pointer",
                                    borderRadius: "8px",
                                }}
                                mt={3}
                            >
                                <Box>
                                    <img
                                        style={{
                                            marginTop: "10px",
                                            marginLeft: "5px",
                                        }}
                                        src={Correct}
                                        alt=""
                                    />
                                </Box>

                                <span style={{ marginLeft: "15px" }}>
                                    We ask the customers to elaborate on their
                                    answers to get qualitative data and gain
                                    deeper insights.
                                </span>
                            </Box>

                            <Grid container>
                                <Grid item lg={0} md={0} sm={6} xs={6}></Grid>
                                <Grid item lg={12} md={12} sm={6} xs={6}>
                                    <Box mt={5}>
                                        <button
                                            // onClick={() => {
                                            //     if (data === true) {
                                            //         setPage("Question");
                                            //     } else {
                                            //         setMessage("enter");
                                            //     }
                                            // }}
                                            onClick={() => setPage("Question")}
                                            style={{
                                                fontWeight: "bold",
                                                background: "#E2FF65",
                                                color: "#152642",
                                                padding: medium ? "" : "15px",
                                                borderStyle: "none",
                                                fontSize: "20px",
                                                borderRadius: "8px",
                                                lineHeight: "28px",
                                            }}
                                            className="form-control"
                                        >
                                            Next
                                        </button>
                                    </Box>
                                </Grid>
                            </Grid>

                            <Box
                                //onClick={() => setPage("Question", { SurveyName, SurveyChannel} )}
                                onClick={handlePassData}
                                mt={4}
                                style={{
                                    display: medium ? "none" : "",
                                    borderColor: "#E2FF66",
                                    background: "#161616",
                                    color: "#E2FF66",
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    lineHeight: "40px",
                                    letterSpacing: "1.5px",
                                    cursor: "pointer",
                                    borderRadius: "8px",
                                }}
                                className="form-control"
                            >
                                Skip Onboarding and create the survey
                            </Box>
                        </Grid>{" "}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default PromotedScore;
