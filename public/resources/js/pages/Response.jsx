import { React, useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Grid, Box, useMediaQuery, useTheme } from "@mui/material";
import SearchBar from "../components/ResuableComponent/SearchBar";
import RightNavBar from "../components/ResuableComponent/RightNavbar";
import axios from "axios";
import { IoMdContacts } from "react-icons/io";
import { FaArrowUpLong, FaArrowDownLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import Strengths from "../components/Strengths";
import CountriesTable from "../components/CountriesTable";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJs,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import feedback from "../components/Assets/Images/feedback.png";

ChartJs.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Response = () => {
    const location = useLocation();
    const [mcqSubheading, setMcqSubheading] = useState([]);
    const [questionId, setQuestionId] = useState([]);
    // const { surveyId } = useParams();
    const { surveyId } = location.state.surveyId && location.state;
    console.log("Survey id", surveyId);
    const theme = useTheme();
    const navigate = useNavigate();
    const medium = useMediaQuery(theme.breakpoints.down("md"));
    const small = useMediaQuery(theme.breakpoints.down("sm"));
    const merchantId = sessionStorage.getItem("merchantId");
    const [ratingData, setRatingData] = useState("");
    const [rating, setRating] = useState("");
    const [monthData, setMonthData] = useState([]);
    const [monthData1, setMonthData1] = useState([]);
    const [monthData2, setMonthData2] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `/api/disResponse/${surveyId}`
                );
                const numericResponses = response.data.responseDetails.map(
                    (details) => details.numericResponse
                );
                const nonZeroResponses = numericResponses.filter(
                    (response) => response !== "0"
                );

                const nonZeroCount = nonZeroResponses.length;

                const mcqSubheading =
                    response.data.responseDetails[1].mcqSubheading;
                setMcqSubheading(mcqSubheading);
                const questionId = response.data.responseDetails[1].questionId;
                console.log("questionId", questionId);
                setQuestionId(questionId);

                const createdDate = response.data.responseDetails.map(
                    (details) => details.createdDate
                );
                console.log("created date", createdDate);
                console.log("mcqSubheading", mcqSubheading);

                setRatingData(nonZeroResponses);
                setRating(nonZeroCount);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
        return () => {};
    }, [surveyId]);

    let downArrowPercentage = 0;
    let upArrowPercentage = 0;

    if (ratingData) {
        const lowerRangeResponses = ratingData.filter(
            (response) => response >= 1 && response <= 5
        );
        const upperRangeResponses = ratingData.filter(
            (response) => response >= 6 && response <= 10
        );
        // console.log("upper rating", upperRangeResponses);

        const totalResponses = ratingData.length;
        downArrowPercentage =
            (lowerRangeResponses.length / totalResponses) * 100;
        // console.log("lower percentage", downArrowPercentage);
        upArrowPercentage = (upperRangeResponses.length / totalResponses) * 100;
        // console.log("upper percentage", upArrowPercentage);
    }

    let lowerDatasets = [];
    let mediumDatasets = [];
    let highDatasets = [];
    const countOfLowerRatings = "";

    if (ratingData) {
        lowerDatasets = ratingData.filter(
            (dataset) => dataset >= 1 && dataset <= 5
        );
        const countOfLowerRatings = lowerDatasets.length;
        // console.log("Lower datasets", lowerDatasets);

        mediumDatasets = ratingData.filter(
            (dataset) => dataset >= 6 && dataset <= 7
        );
        // console.log("Medium datasets", mediumDatasets);

        highDatasets = ratingData.filter(
            (dataset) => dataset >= 8 && dataset <= 10
        );
        // console.log("High datasets", highDatasets);
        console.log("check_lower", countOfLowerRatings);
        console.log("check_medium", mediumDatasets);
        console.log("check_higher", highDatasets);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `/api/displayResponseByMonth/${surveyId}`
                );
                const monthDatas = response.data.monthWiseData.userSurveys1;
                const monthDatas1 = response.data.monthWiseData.userSurveys2;
                const monthDatas2 = response.data.monthWiseData.userSurveys3;

                // if (Array.isArray(monthDatas)) {
                //     monthDatas.forEach((dataPoint, index) => {
                //         console.log(`Data point ${index}:`, dataPoint);
                //     });
                // } else {
                //     console.error("monthDatas is not an array:", monthDatas);
                // }

                console.log("object", monthDatas, monthDatas1, monthDatas2);
                setMonthData(monthDatas);
                setMonthData1(monthDatas1);
                setMonthData2(monthDatas2);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

        return () => {};
    }, []);

    // const monthDatas = monthData;
    // const counttValues = [];
    // const months = [];

    // monthDatas.forEach((dataPoint) => {
    //     const { countt, month } = dataPoint;
    //     counttValues.push(countt);
    //     months.push(month);
    // });

    const monthDatas = monthData;
    const counttValues = Array(12).fill(0);
    monthDatas.forEach((dataPoint) => {
        const { countt, month } = dataPoint;
        counttValues[month - 1] = countt;
    });

    const monthDatas1 = monthData1;
    const counttValues1 = Array(12).fill(0);

    monthDatas1.forEach((dataPoint) => {
        const { countt, month } = dataPoint;
        counttValues1[month - 1] = countt;
    });

    const monthDatas2 = monthData2;
    const counttValues2 = Array(12).fill(0);

    monthDatas2.forEach((dataPoint) => {
        const { countt, month } = dataPoint;
        counttValues2[month - 1] = countt;
    });

    const data = {
        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "June",
            "July",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        datasets: [
            {
                label: "1-5",
                data: counttValues,
                backgroundColor: "#F25042",
            },
            {
                label: "6-7",
                // data: [7, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
                data: counttValues1,
                backgroundColor: "#F9BC60",
                Color: "white",
            },
            {
                label: "8-10",
                // data: [8, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
                data: counttValues2,
                backgroundColor: "#2CB67D",
                border: "15px solid green",
            },
        ],
    };

    const options = {
        scales: {
            x: {
                border: {
                    // display: false,
                    dash: [1, 1],
                },
                grid: {
                    color: "#6c757d",
                },

                stacked: true,
            },
            y: {
                border: {
                    // display: false,
                    dash: [1, 1],
                },
                grid: {
                    color: "#6c757d",
                },

                stacked: true,
            },
        },
    };
    const customStyle = {
        x: {
            style: {
                background: "red",
                height: "0px",
            },
        },
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
                }}
                container
            >
                <Grid item lg={2} md={2} sm={2} xs={2}>
                    <RightNavBar />
                </Grid>
                <Grid item lg={9.5} md={9.5} sm={12} xs={12}>
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
                                width: "100%",
                                // height: "120vh",
                                marginBottom: "50px",
                            }}
                            item
                            lg={11}
                            md={11}
                            sm={11}
                            xs={11}
                            mx="auto"
                        >
                            <Box style={{ padding: "0px 20px" }}>
                                {/* <Box></Box> */}
                                <Box
                                    ml={2}
                                    style={{
                                        float: "inline-end",
                                        padding: "6px",
                                        marginTop: "-2px",
                                        width: "175px",
                                        border: "1px solid yellow",
                                        backgroundColor: "black",
                                        textAlign: "center",
                                        color: "white",
                                        height: "42px",
                                        borderRadius: "8px",
                                    }}
                                >
                                    <IoMdContacts /> All Channels
                                </Box>
                                <Box
                                    ml={2}
                                    style={{
                                        float: "inline-end",
                                        padding: "6px",
                                        marginTop: "-2px",
                                        width: "175px",
                                        border: "1px solid yellow",
                                        backgroundColor: "black",
                                        textAlign: "center",
                                        color: "white",
                                        height: "42px",
                                        borderRadius: "8px",
                                    }}
                                >
                                    <IoMdContacts /> 01 jun-25 Aug
                                </Box>
                                <Box
                                    // ml={2}
                                    style={{
                                        float: "inline-end",
                                        padding: "6px",
                                        marginTop: "-2px",
                                        width: "175px",
                                        border: "1px solid yellow",
                                        backgroundColor: "black",
                                        textAlign: "center",
                                        color: "white",
                                        height: "42px",
                                        borderRadius: "8px",
                                    }}
                                >
                                    <IoMdContacts /> Segments
                                </Box>
                                <Box
                                    style={{
                                        fontSize: "25px",
                                        color: "white",
                                        width: "80%",
                                        paddingBottom: "20px",
                                    }}
                                >
                                    Net Promoted Scroce (NPS)
                                </Box>
                                <Grid container>
                                    <Grid item mx="auto" lg={8}>
                                        {/* <Box
                                        style={{
                                            float: "inline-end",
                                            padding: "23px",
                                            marginTop: "-63px",
                                            width: "200px",
                                        }}
                                    >
                                        Segments
                                    </Box> */}
                                        <Box
                                            style={{
                                                padding: "25px",
                                                background: "black",
                                                width: "98%",
                                                borderRadius: "10px",
                                            }}
                                        >
                                            <Box
                                                style={{
                                                    fontSize: "20px",
                                                    color: "white",
                                                }}
                                            >
                                                NPS
                                            </Box>
                                            <Box
                                                style={{
                                                    color: "white",
                                                    fontWeight: "lighter",
                                                }}
                                            >
                                                Based on status
                                                <Box
                                                    style={{
                                                        float: "inline-end",
                                                        width: "20px",
                                                        backgroundColor:
                                                            "white",
                                                        border: "1px solid white",
                                                        height: "20px",
                                                        borderRadius: "20px",
                                                    }}
                                                ></Box>
                                                <Box
                                                    style={{
                                                        width: "200px",
                                                        padding: "10px",
                                                        border: "1px solid #161616",
                                                        marginTop: "10px",
                                                        borderRadius: "10px",
                                                        backgroundColor:
                                                            "#161616",
                                                    }}
                                                >
                                                    Score
                                                    <Box
                                                        style={{
                                                            fontSize: "18px",
                                                            fontWeight: "500",
                                                        }}
                                                    >
                                                        15.6%{" "}
                                                        <span
                                                            style={{
                                                                position:
                                                                    "absolute",
                                                                left: "auto",
                                                                marginLeft:
                                                                    "14px",
                                                                fontSize:
                                                                    "12px",
                                                                marginTop:
                                                                    "8px",
                                                                color: "#2CB67D",
                                                            }}
                                                        >
                                                            (<FaArrowUpLong />{" "}
                                                            8%)
                                                        </span>{" "}
                                                    </Box>
                                                </Box>
                                            </Box>

                                            <Box
                                                style={{
                                                    color: "white",
                                                    fontWeight: "lighter",
                                                }}
                                            >
                                                <Box
                                                    style={{
                                                        width: "200px",
                                                        padding: "10px",
                                                        border: "1px solid #161616",
                                                        marginTop: "45px",
                                                        borderRadius: "10px",
                                                        backgroundColor:
                                                            "#161616",
                                                        position: "relative",
                                                        top: "-118px",
                                                        left: "233px",
                                                    }}
                                                >
                                                    Responses
                                                    <Box
                                                        style={{
                                                            fontSize: "18px",
                                                            fontWeight: "500",
                                                        }}
                                                    >
                                                        {/* 1,210{" "} */}
                                                        {rating ? rating : 0}
                                                        {/* {downArrowPercentage > 0 && (
                                                    <span
                                                        style={{
                                                            position:
                                                                "absolute",
                                                            left: "auto",
                                                            marginLeft: "14px",
                                                            fontSize: "12px",
                                                            marginTop: "23px",
                                                            color: "red",
                                                        }}
                                                    >
                                                        <FaArrowDownLong />(
                                                        {downArrowPercentage.toFixed(
                                                            2
                                                        )}
                                                        %)
                                                    </span>
                                                )} */}

                                                        {upArrowPercentage >
                                                            0 && (
                                                            <span
                                                                style={{
                                                                    position:
                                                                        "absolute",
                                                                    left: "auto",
                                                                    marginLeft:
                                                                        "14px",
                                                                    fontSize:
                                                                        "12px",
                                                                    marginTop:
                                                                        "8px",
                                                                    color: "#2CB67D",
                                                                }}
                                                            >
                                                                (
                                                                <FaArrowUpLong />
                                                                {upArrowPercentage.toFixed(
                                                                    2
                                                                )}
                                                                %)
                                                            </span>
                                                        )}
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <Box
                                                style={{
                                                    backgroundColor: "#F25042",
                                                    border: "1px solid #F25042",
                                                    marginTop: "-102px",
                                                    width: "30%",
                                                    borderRadius: "5px",
                                                    height: "6px",
                                                }}
                                            ></Box>
                                            <Box
                                                style={{
                                                    backgroundColor: "#F9BC60",
                                                    border: "1px solid #F9BC60",
                                                    marginTop: "-6px",
                                                    width: "30%",
                                                    marginLeft: "215px",
                                                    borderRadius: "5px",
                                                    height: "6px",
                                                }}
                                            ></Box>
                                            <Box
                                                style={{
                                                    backgroundColor: "#2CB67D",
                                                    border: "1px solid #2CB67D",
                                                    marginTop: "-6px",
                                                    width: "30%",
                                                    marginLeft: "427px",
                                                    borderRadius: "5px",
                                                    height: "6px",
                                                }}
                                            ></Box>
                                            <Box mt={1} mx="auto">
                                                <div
                                                    style={{
                                                        padding: "0px 50px",
                                                        height: "auto",
                                                    }}
                                                >
                                                    <Bar
                                                        data={data}
                                                        options={options}
                                                    ></Bar>
                                                </div>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item lg={4}>
                                        <Box>
                                            <img
                                                style={{
                                                    width: "100%",
                                                    height: "490px",
                                                }}
                                                src={feedback}
                                                alt=""
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Box>
                                    <div
                                        style={{
                                            borderRadius: "15px",
                                            padding: "0 20px",
                                        }}
                                    ></div>
                                    <Strengths
                                        mcqSubheading={mcqSubheading}
                                        questionId={questionId}
                                    />
                                </Box>
                                <Box>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            padding: "5px 37px",
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontWeight: "500",
                                                fontSize: "22px",
                                                color: "white",
                                                padding: "20px",
                                                marginTop: "15px",
                                                marginLeft: "-30px",
                                                paddingBottom: "20px",
                                            }}
                                        >
                                            NPS Feedbacks
                                        </div>
                                        <div
                                            style={{
                                                color: "#D6F550",
                                                marginTop: "45px",
                                                marginLeft: "-30px",
                                                paddingBottom: "20px",
                                            }}
                                        >
                                            View All <FaArrowRightLong />
                                        </div>
                                    </div>
                                    <CountriesTable surveyId={surveyId} />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Response;
