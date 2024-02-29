import { React, useEffect, useState } from "react";
import { Grid, Box, useMediaQuery, useTheme } from "@mui/material";
import SearchBar from "../components/ResuableComponent/SearchBar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCreatedsurvey_id } from "../Reducers/UiReducers";

const Questions = ({ setPage }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const { userSurveyId } = useParams();
    console.log(userSurveyId);
    const navigate = useNavigate();
    const location = useLocation();
    const { SurveyChannel, surveyId, merchantId, createdSurveyId } =
        location.state;
    console.log("fefc", merchantId);
    dispatch(setCreatedsurvey_id(createdSurveyId));

    const { surveyName } = location.state;
    const userid = sessionStorage.getItem("userId");

    const medium = useMediaQuery(theme.breakpoints.down("md"));
    const small = useMediaQuery(theme.breakpoints.down("sm"));
    const [isHovered, setIsHovered] = useState("");
    const [data, setData] = useState(false);
    const [number, setNumber] = useState("");
    const [select, setSelect] = useState("");
    const [message, setMessage] = useState("");
    const [merchant, setMerchant] = useState("");
    const [editableContent, setEditableContent] = useState(
        "Based on your last activity at [Company_name], How likely you are to recommend [Company_name] to your friends and families?"
    );

    const handleContentChange = (event) => {
        setEditableContent(event.target.textContent);
    };

    const handleNextButtonClick = async () => {
        try {
            const response = await axios.post("/api/question", {
                questionText: editableContent,
                createdSurveyId: createdSurveyId,
                questionType:"Open Ended",
                mcqSubheading: 'null',
            });
            console.log("Response from API:", response.data);
            navigate("/dashboard", {
                state: { createdSurveyId: createdSurveyId },
            });

            setPage("Question2");
        } catch (error) {
            console.error("Error submitting rating:", error);
        }
    };
    const merchantid = sessionStorage.getItem("merchantId");
    console.log("Merchant", merchantid);

    const handleSubmit = () => {
        sessionStorage.setItem("rating", number);
        navigate("/dashboard", {
            state: {
                rating: number,
                surveyName,
                SurveyChannel,
                userid,
                surveyId,
                merchantId,
            },
        });
        setPage("Question2");
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/merchant/${merchantid}`);
                console.log(response.data.merchant.merchantName);
                setMerchant(response.data.merchant.merchantName);
            } catch (error) {
                // Handle errors
            }
        };

        fetchData();
    }, [merchantid]);

    return (
        <>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <Grid container>
                    <Grid item lg={11} md={11} sm={11} xs={11} mx="auto">
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
                        <Box
                            ml={1}
                            style={{
                                textAlign: "center",
                                color: "#E2FF66",
                                fontWeight: "600",
                                fontSize: "20px",
                            }}
                        >
                            {/* Question # 01 */}
                            <Box
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginBottom: "85px",
                                }}
                            >
                                <Box
                                    style={{
                                        background: "#E2FF66",
                                        padding: "15px",
                                        borderRadius: "15px",
                                    }}
                                ></Box>
                                <Box
                                    style={{
                                        background: "#4c4c4c",
                                        width: "80px",
                                        height: "2px",
                                        marginTop: "13px",
                                    }}
                                ></Box>
                                <Box
                                    style={{
                                        background: "grey",
                                        padding: "15px",
                                        borderRadius: "15px",
                                    }}
                                ></Box>
                                <Box
                                    style={{
                                        background: "#4c4c4c",
                                        width: "80px",
                                        height: "2px",
                                        marginTop: "13px",
                                    }}
                                ></Box>
                                <Box
                                    style={{
                                        background: "grey",
                                        padding: "15px",
                                        borderRadius: "15px",
                                    }}
                                ></Box>
                                <Box
                                    style={{
                                        background: "#4c4c4c",
                                        width: "80px",
                                        height: "2px",
                                        marginTop: "13px",
                                    }}
                                ></Box>
                                <Box
                                    style={{
                                        background: "grey",
                                        padding: "15px",
                                        borderRadius: "15px",
                                    }}
                                ></Box>
                            </Box>
                        </Box>
                        {message === "enter" ? (
                            <Box
                                style={{
                                    color: "red",
                                    textAlign: "center",
                                }}
                            >
                                Please Select a number
                            </Box>
                        ) : (
                            ""
                        )}
                        <Grid container>
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
                                    contentEditable={true}
                                    style={{
                                        textAlign: "center",
                                        lineHeight: "22.85px",
                                    }}
                                    mt={3}
                                    onBlur={handleContentChange}
                                >
                                    Based on your last activity at {merchant} ,
                                    How likely you are to recommend {merchant}{" "}
                                    to your friends and families?
                                </Box>

                                <Box
                                    mt={2}
                                    style={{
                                        textDecoration: "underline",
                                        textAlign: "center",
                                        color: "#979797",
                                        fontSize: "14px",
                                        lineHeight: "18.45px",
                                    }}
                                >
                                    How we calculate the NPS?
                                </Box>
                            </Grid>
                            <Grid container>
                                <Grid
                                    item
                                    lg={10}
                                    md={11}
                                    sm={11}
                                    xs={11}
                                    mx="auto"
                                >
                                    <Grid container>
                                        <Grid
                                            item
                                            lg={0.6}
                                            md={0.6}
                                            sm={0.6}
                                            xs={0}
                                        ></Grid>
                                        <Grid
                                            item
                                            lg={1}
                                            md={1}
                                            sm={1}
                                            xs={1.2}
                                        >
                                            <Box
                                                onClick={() => {
                                                    setNumber("01");
                                                    setData(true);
                                                    setMessage("");
                                                }}
                                                mt={2}
                                                className="form-control"
                                                style={{
                                                    padding: medium
                                                        ? "-5px -5px"
                                                        : "10px",

                                                    borderColor:
                                                        number === "01"
                                                            ? "#E2FF66"
                                                            : "#626262",

                                                    background: "#161616",
                                                    textAlign: "center",
                                                    color: "#DDDDDD",
                                                    borderRadius: "10px",
                                                    cursor: "pointer",
                                                    height: medium
                                                        ? "32px"
                                                        : "",
                                                    fontSize: medium
                                                        ? "10px"
                                                        : "",
                                                    marginRight: "2px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                01
                                            </Box>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={0.2}
                                            md={0.2}
                                            sm={0.2}
                                            xs={0.1}
                                        ></Grid>
                                        <Grid
                                            item
                                            lg={1}
                                            md={1}
                                            sm={1}
                                            xs={1.2}
                                        >
                                            <Box
                                                // onMouseEnter={() => setIsHovered('02')}
                                                // onMouseLeave={() => setIsHovered('')}
                                                onClick={() => {
                                                    setNumber("02");
                                                    setData(true);
                                                    setMessage("");
                                                }}
                                                mt={2}
                                                mr={0.4}
                                                className="form-control"
                                                style={{
                                                    padding: medium
                                                        ? "-5px -5px"
                                                        : "10px",

                                                    borderColor:
                                                        number === "02"
                                                            ? "#E2FF66"
                                                            : "#626262",

                                                    background: "#161616",
                                                    // textAlign: "center",
                                                    color: "#DDDDDD",
                                                    borderRadius: "10px",
                                                    cursor: "pointer",
                                                    height: medium
                                                        ? "32px"
                                                        : "",
                                                    fontSize: medium
                                                        ? "10px"
                                                        : "",
                                                    marginRight: "2px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                02
                                            </Box>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={0.2}
                                            md={0.2}
                                            sm={0.2}
                                            xs={0.1}
                                        ></Grid>
                                        <Grid
                                            item
                                            lg={1}
                                            md={1}
                                            sm={1}
                                            xs={1.2}
                                        >
                                            <Box
                                                onClick={() => {
                                                    setData(true);
                                                    setNumber("03");
                                                    setMessage("");
                                                }}
                                                mt={2}
                                                mr={1}
                                                className="form-control"
                                                style={{
                                                    padding: medium
                                                        ? "-5px -5px"
                                                        : "10px",

                                                    borderColor:
                                                        number === "03"
                                                            ? "#E2FF66"
                                                            : "#626262",

                                                    background: "#161616",
                                                    textAlign: "center",
                                                    color: "#DDDDDD",
                                                    borderRadius: "10px",
                                                    cursor: "pointer",
                                                    height: medium
                                                        ? "32px"
                                                        : "",
                                                    fontSize: medium
                                                        ? "10px"
                                                        : "",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                03
                                            </Box>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={0.2}
                                            md={0.2}
                                            sm={0.2}
                                            xs={0.1}
                                        ></Grid>
                                        <Grid
                                            item
                                            lg={1}
                                            md={1}
                                            sm={1}
                                            xs={1.2}
                                        >
                                            <Box
                                                onClick={() => {
                                                    setData(true);
                                                    setNumber("04");
                                                }}
                                                mt={2}
                                                mr={1}
                                                className="form-control"
                                                style={{
                                                    padding: medium
                                                        ? "-5px -5px"
                                                        : "10px",

                                                    borderColor:
                                                        number === "04"
                                                            ? "#E2FF66"
                                                            : "#626262",

                                                    background: "#161616",
                                                    textAlign: "center",
                                                    color: "#DDDDDD",
                                                    borderRadius: "10px",
                                                    cursor: "pointer",
                                                    height: medium
                                                        ? "32px"
                                                        : "",
                                                    fontSize: medium
                                                        ? "10px"
                                                        : "",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                04
                                            </Box>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={0.2}
                                            md={0.2}
                                            sm={0.2}
                                            xs={0.1}
                                        ></Grid>
                                        <Grid
                                            item
                                            lg={1}
                                            md={1}
                                            sm={1}
                                            xs={1.2}
                                        >
                                            {" "}
                                            <Box
                                                onClick={() => {
                                                    setData(true);
                                                    setNumber("05");
                                                    setMessage("");
                                                }}
                                                mt={2}
                                                mr={1}
                                                className="form-control"
                                                style={{
                                                    padding: medium
                                                        ? "-5px -5px"
                                                        : "10px",

                                                    borderColor:
                                                        number === "05"
                                                            ? "#E2FF66"
                                                            : "#626262",

                                                    background: "#161616",
                                                    textAlign: "center",
                                                    color: "#DDDDDD",
                                                    borderRadius: "10px",
                                                    cursor: "pointer",
                                                    height: medium
                                                        ? "32px"
                                                        : "",
                                                    fontSize: medium
                                                        ? "10px"
                                                        : "",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                05
                                            </Box>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={0.2}
                                            md={0.2}
                                            sm={0.2}
                                            xs={0.1}
                                        ></Grid>
                                        <Grid
                                            item
                                            lg={1}
                                            md={1}
                                            sm={1}
                                            xs={1.2}
                                        >
                                            <Box
                                                onClick={() => {
                                                    setData(true);
                                                    setNumber("06");
                                                    setMessage("");
                                                }}
                                                mt={2}
                                                mr={1}
                                                className="form-control"
                                                style={{
                                                    padding: medium
                                                        ? "-5px -5px"
                                                        : "10px",

                                                    borderColor:
                                                        number === "06"
                                                            ? "#E2FF66"
                                                            : "#626262",

                                                    background: "#161616",
                                                    textAlign: "center",
                                                    color: "#DDDDDD",
                                                    borderRadius: "10px",
                                                    cursor: "pointer",
                                                    height: medium
                                                        ? "32px"
                                                        : "",
                                                    fontSize: medium
                                                        ? "10px"
                                                        : "",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                06
                                            </Box>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={0.2}
                                            md={0.2}
                                            sm={0.2}
                                            xs={0.1}
                                        ></Grid>
                                        <Grid
                                            item
                                            lg={1}
                                            md={1}
                                            sm={1}
                                            xs={1.2}
                                        >
                                            <Box
                                                // onMouseEnter={() => setIsHovered("08")}
                                                // onMouseLeave={() => setIsHovered(false)}
                                                onClick={() => {
                                                    setData(true);
                                                    setNumber("07");
                                                }}
                                                mt={2}
                                                mr={1}
                                                className="form-control"
                                                style={{
                                                    padding: medium
                                                        ? "-5px -5px"
                                                        : "10px",

                                                    borderColor:
                                                        number === "07"
                                                            ? "#E2FF66"
                                                            : "#626262",

                                                    background: "#161616",
                                                    textAlign: "center",
                                                    color: "#DDDDDD",
                                                    borderRadius: "10px",
                                                    cursor: "pointer",
                                                    height: medium
                                                        ? "32px"
                                                        : "",
                                                    fontSize: medium
                                                        ? "10px"
                                                        : "",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                07
                                            </Box>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={0.2}
                                            md={0.2}
                                            sm={0.2}
                                            xs={0.1}
                                        ></Grid>
                                        <Grid
                                            item
                                            lg={1}
                                            md={1}
                                            sm={1}
                                            xs={1.2}
                                        >
                                            {" "}
                                            <Box
                                                onClick={() => {
                                                    setData(true);
                                                    setNumber("09");
                                                    setMessage("");
                                                }}
                                                mt={2}
                                                mr={1}
                                                className="form-control"
                                                style={{
                                                    padding: medium
                                                        ? "-5px -5px"
                                                        : "10px",

                                                    borderColor:
                                                        number === "09"
                                                            ? "#E2FF66"
                                                            : "#626262",

                                                    background: "#161616",
                                                    textAlign: "center",
                                                    color: "#DDDDDD",
                                                    borderRadius: "10px",
                                                    cursor: "pointer",
                                                    height: medium
                                                        ? "32px"
                                                        : "",
                                                    fontSize: medium
                                                        ? "10px"
                                                        : "",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                09
                                            </Box>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={0.2}
                                            md={0.2}
                                            sm={0.2}
                                            xs={0.1}
                                        ></Grid>
                                        <Grid
                                            item
                                            lg={1}
                                            md={1}
                                            sm={1}
                                            xs={1.2}
                                        >
                                            <Box
                                                // onMouseEnter={() => setIsHovered("08")}
                                                // onMouseLeave={() => setIsHovered(false)}
                                                onClick={() => {
                                                    setData(true);
                                                    setNumber("10");
                                                    setMessage("");
                                                }}
                                                mt={2}
                                                mr={1}
                                                className="form-control"
                                                style={{
                                                    padding: medium
                                                        ? "-5px -5px"
                                                        : "10px",

                                                    borderColor:
                                                        number === "10"
                                                            ? "#E2FF66"
                                                            : "#626262",

                                                    background: "#161616",
                                                    textAlign: "center",
                                                    color: "#DDDDDD",
                                                    borderRadius: "10px",
                                                    cursor: "pointer",
                                                    height: medium
                                                        ? "32px"
                                                        : "",
                                                    fontSize: medium
                                                        ? "10px"
                                                        : "",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                10
                                            </Box>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={0.2}
                                            md={0.2}
                                            sm={0.2}
                                            xs={0}
                                        ></Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid
                                    item
                                    lg={5}
                                    md={5}
                                    sm={8}
                                    xs={8}
                                    mx="auto"
                                >
                                    <Grid container>
                                        <Grid
                                            item
                                            lg={0}
                                            md={0}
                                            sm={6}
                                            xs={6}
                                        ></Grid>
                                        <Grid
                                            item
                                            lg={12}
                                            md={12}
                                            sm={6}
                                            xs={6}
                                        >
                                            <Box mt={5}>
                                                <button
                                                    onClick={
                                                        handleNextButtonClick
                                                    }
                                                    //onClick={handleSubmit}
                                                    // onClick={() => {
                                                    //     if (data === true) {
                                                    //         setPage(
                                                    //             "Question2"
                                                    //         );
                                                    //     } else {
                                                    //         setMessage("enter");
                                                    //     }
                                                    // }}
                                                    style={{
                                                        fontWeight: small
                                                            ? "600"
                                                            : "bold",
                                                        background: "#E2FF65",
                                                        color: "#152642",
                                                        fontSize: "20px",
                                                        // padding: "15px",
                                                        borderStyle: "none",
                                                        borderRadius: "6px",
                                                    }}
                                                    className="form-control"
                                                >
                                                    Next
                                                </button>
                                            </Box>
                                        </Grid>
                                    </Grid>

                                    <Box
                                        // onClick={() => setPage("Question2")}
                                        mt={4}
                                        style={{
                                            display: medium ? "none" : "",
                                            borderColor: "#E2FF66",
                                            background: "#161616",
                                            color: "#E2FF66",
                                            textAlign: "center",
                                            fontWeight: "bold",
                                            cursor: "pointer",
                                            fontSize: "20px",
                                        }}
                                        className="form-control"
                                    >
                                        Skip
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Questions;
