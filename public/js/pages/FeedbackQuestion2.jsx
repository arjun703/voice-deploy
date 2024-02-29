import { React, useEffect, useState } from "react";
import { Grid, Box, useMediaQuery, useTheme } from "@mui/material";
import SearchBar from "../components/ResuableComponent/SearchBar";
import RightNavBar from "../components/ResuableComponent/RightNavbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const FeedbackQuestion2 = ({ setPage }) => {
    const { currquestion, questionlen } = useSelector((state) => state.ui);
    const dispatch = useDispatch();
    const theme = useTheme();
    const [resData, setresData] = useState(null);
    const { userSurveyId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const medium = useMediaQuery(theme.breakpoints.down("md"));
    const small = useMediaQuery(theme.breakpoints.down("sm"));
    const [isHovered, setIsHovered] = useState("");
    const [questionNumber, SetQuestionNumber] = useState(2);
    const [dataa, setDataa] = useState([]);
    const [error,setError]=useState([]);
    const [data, setData] = useState([]);
    const [number, setNumber] = useState("");
    const [select, setSelect] = useState("");
    const [message, setMessage] = useState("");
    const [questions, setQuestions] = useState([]);
    const [questionsmcq, setQuestionsmcq] = useState([]);

    const [surveyId, setSurveyId] = useState([]);
    const [questionId, setQuestionId] = useState([]);
    const [userId, setUserId] = useState([]);
    const [questionType, setQuestionType] = useState("");
    const [feedbackData, setFeedBackData] = useState("");

    useEffect(() => {
        const getQuestions = async () => {
            try {
                const response = await axios.get(
                    `/api/questions/${userSurveyId}`
                );
                setQuestions(
                    response.data.questions[questionNumber].questionText
                );

                // if (
                //     response.data.questions &&
                //     Array.isArray(response.data.questions)
                // ) {
                //     const uniqueSubheadings = new Set();
                //     let duplicateSubheadingRemoved = false;

                //     response.data.questions.forEach((question) => {
                //         if (question.mcqSubHeading) {
                //             question.mcqSubHeading.forEach((subHeading) => {
                //                 const subheadingString =
                //                     JSON.stringify(subHeading);

                //                 if (
                //                     !duplicateSubheadingRemoved ||
                //                     uniqueSubheadings.has(subheadingString)
                //                 ) {
                //                     uniqueSubheadings.add(subheadingString);
                //                 }
                //             });

                //             duplicateSubheadingRemoved = true;
                //         }
                //     });

                //     const allSubheadings = Array.from(uniqueSubheadings).map(
                //         (subheadingString) => {
                //             const [question, subHeading] =
                //                 JSON.parse(subheadingString);
                //             return { question, subHeading };
                //         }
                //     );

                //     setSubheadings(allSubheadings);
                // }

                const surveyId = response.data.questions[2].id;
                const questionId = response.data.questions[2].questionId;
                const userId = response.data.questions[2].user_id;
                setUserId(userId);
                setQuestionId(questionId);
                setSurveyId(surveyId);
                console.log("Survey and question", surveyId, questionId);
            } catch (error) {
                console.error("Error fetching questions data", error);
            }
        };
        getQuestions();

        const getQuestionmcq = async () => {
            try {
                const response = await axios.get(
                    `/api/questionsmcq/${questionId}`
                );

                console.log(
                    "JSON data",
                    response.data.questionsmcq.mcqSubheading
                );
                setDataa(response.data.questionsmcq.mcqSubheading);
                setQuestionType(
                    response.data.questionsmcq.question.questionType
                );
                console.log(data);
            } catch (error) {
                console.error("Error fetching questions data", error);
            }
        };

        getQuestionmcq();
    }, [questionId]);

    const handleBoxClick = (item) => {
        setFeedBackData(item[0]);
        console.log("vbnm", feedbackData);
        setresData(item);
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

    // const handleValuee = (data) => {
    //     setresData(data);
    //     setFeedBackData(data);
    //     console.log("sd", feedbackData);
    // };

    const handleSubmit = async (data) => {
        console.log("checl", data[0]);
        // dispatch(setCurrQuestion(1));
        try {
            const response = await axios.post("/api/feedback", {
                dataSurveyId: surveyId,
                id: questionId,
                // userId,
                // questions1: resData[0],
                questions1: feedbackData,
                rating:0,
            });

            navigate(`/feedbackQ3/${userSurveyId}`);
        } catch (error) {
            console.error("Error submitting rating:", error);
            setError(error.response.data.errors);
        }
        // setPage("Question2");
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
                                <Grid container></Grid>
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
                                            display: "flex",
                                            marginBottom: "85px",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Box
                                            style={{
                                                background: "#E2FF66",
                                                padding: "15px",
                                                borderRadius: "15px",
                                            }}
                                        ></Box>
                                        {/* {data} */}
                                        {/* {dataa.map((item, i) => (
                                            <div
                                                onClick={() =>
                                                    handleBoxClick(item)
                                                }
                                                style={{ color: "white" }}
                                            >
                                                {item}
                                            </div>
                                        ))} */}
                                        {/* <div
                                            style={{ backgroundColor: "white" }}
                                        >
                                            <ul>
                                                {subheadings.map(
                                                    (item, index) => (
                                                        <li key={index}>
                                                            <p>
                                                                Question:{" "}
                                                                {item.question}
                                                            </p>
                                                            <p>
                                                                Subheading:{" "}
                                                                {
                                                                    item.subHeading
                                                                }
                                                            </p>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div> */}
                                        <Box
                                            style={{
                                                background: "#E2FF66",
                                                width: "80px",
                                                height: "2px",
                                                marginTop: "13px",
                                            }}
                                        ></Box>
                                        <Box
                                            style={{
                                                background: "#E2FF66",
                                                padding: "15px",
                                                borderRadius: "15px",
                                            }}
                                        ></Box>
                                        <Box
                                            style={{
                                                background: "#E2FF66",
                                                width: "80px",
                                                height: "2px",
                                                marginTop: "13px",
                                            }}
                                        ></Box>
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
                                        // onClick={() =>
                                        //     handleValue(
                                        //         "Which of the following Factors Influenced your answer the most?"
                                        //     )
                                        // }
                                        style={{
                                            textAlign: "center",
                                            lineHeight: "22.85px",
                                            color: "#DDDDDD",
                                            fontSize: "16px",
                                            fontWeight: "400",
                                        }}
                                        mt={2}
                                    >
                                        {/* Which of the "Restaurant Atmosphere"
                                        Attributes Influenced your answer the
                                        most? */}

                                        {questions}

                                        {questionType == "Open Ended" ? (
                                            <Box mt={2}>
                                                <div className="form-floating">
                                                    <textarea
                                                        as="textarea"
                                                        style={{
                                                            height: "400px",
                                                            background:
                                                                "#161616",
                                                            color: "white",
                                                            borderColor:
                                                                "#626262",
                                                        }}
                                                        className="form-control"
                                                        placeholder="Write Here"
                                                        id="floatingTextarea2"
                                                        name="comment"
                                                        value={feedbackData}
                                                        onChange={(e) =>
                                                            setFeedBackData(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <label
                                                        for="floatingTextarea2"
                                                        style={{
                                                            color: "#747474",
                                                            fontSize: "15px",
                                                        }}
                                                    >
                                                        Write here your options
                                                        (comma separated)sdv
                                                    </label>
                                                </div>
                                            </Box>
                                        ) : (
                                            <div>
                                                {dataa &&
                                                    dataa.map((item, i) => (
                                                        <Box
                                                            onClick={() =>
                                                                handleBoxClick(
                                                                    item
                                                                )
                                                            }
                                                            onDoubleClick={() =>
                                                                handleBoxClick(
                                                                    item
                                                                )
                                                            }
                                                            mt={2}
                                                            className="form-control"
                                                            style={{
                                                                display: "flex",
                                                                borderColor:
                                                                    select ===
                                                                    item
                                                                        ? "#E2FF66"
                                                                        : "#626262",
                                                                background:
                                                                    medium
                                                                        ? "black"
                                                                        : "#161616",
                                                                color: "white",
                                                                padding: "12px",
                                                                borderRadius:
                                                                    "8px",
                                                                cursor: "pointer",
                                                            }}
                                                            key={i} // Add a unique key for each mapped item
                                                        >
                                                            <Box>
                                                                <Box
                                                                    // onClick={() =>
                                                                    //     handleValuee(
                                                                    //         item
                                                                    //     )
                                                                    // }
                                                                    className="promoter-image q2-radio"
                                                                    ml={1}
                                                                >
                                                                    <input
                                                                        style={{
                                                                            background:
                                                                                select ===
                                                                                item
                                                                                    ? "#E2FF66"
                                                                                    : "",
                                                                            borderColor:
                                                                                select ===
                                                                                item
                                                                                    ? "#E2FF66"
                                                                                    : "",
                                                                        }}
                                                                        className="form-check-input q2-radio"
                                                                        type="radio"
                                                                        name="flexRadioDefault"
                                                                        id="flexRadioDefault1"
                                                                        checked={
                                                                            select ===
                                                                            item
                                                                        }
                                                                        readOnly // Add readOnly attribute to make it readonly
                                                                    />
                                                                </Box>
                                                            </Box>

                                                            <Box
                                                                // onClick={() =>
                                                                //     handleValue(
                                                                //         item[0]
                                                                //     )
                                                                // }
                                                                ml={2}
                                                            >
                                                                <Box
                                                                    style={{
                                                                        fontWeight:
                                                                            "600",
                                                                        fontSize:
                                                                            "16px",
                                                                    }}
                                                                >
                                                                    {item}
                                                                </Box>
                                                                <Box
                                                                    style={{
                                                                        fontWeight:
                                                                            "400",
                                                                        color: "#DDDDDD",
                                                                        fontSize:
                                                                            medium
                                                                                ? "10px"
                                                                                : "16px",
                                                                    }}
                                                                >
                                                                    {item[1]}
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    ))}
                                            </div>
                                        )}
                                    </Box>
                                    {/* {data.map(())} */}
                                    {/* {dataa &&
                                        dataa.map((item, i) => (
                                            <Box
                                                key={i}
                                                onClick={() =>
                                                    handleBoxClick(item)
                                                }
                                                onDoubleClick={() =>
                                                    handleBoxClick(item)
                                                }
                                                mt={2}
                                                className="form-control"
                                                style={{
                                                    display: "flex",
                                                    borderColor:
                                                        select === item
                                                            ? "#E2FF66"
                                                            : " #626262",
                                                    background: medium
                                                        ? "black"
                                                        : "#161616",
                                                    color: "white",
                                                    padding: medium
                                                        ? "6px"
                                                        : "12px",
                                                    borderRadius: "8px",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <Box ml={1}>
                                                    {" "}
                                                    <input
                                                        style={{
                                                            background:
                                                                select === item
                                                                    ? "#E2FF66"
                                                                    : "",
                                                            borderColor:
                                                                select === item
                                                                    ? "#E2FF66"
                                                                    : "",
                                                        }}
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="flexRadioDefault"
                                                        id="flexRadioDefault1"
                                                        checked={
                                                            select === item
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                </Box>

                                                <Box ml={2}>
                                                    {" "}
                                                    <Box
                                                        onClick={() =>
                                                            handleValue(item)
                                                        }
                                                        style={{
                                                            fontWeight: "600",
                                                            fontSize: "16px",
                                                        }}
                                                    >
                                                        {" "}
                                                        {item}
                                                    </Box>{" "}
                                                </Box>
                                            </Box>
                                        ))} */}

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
                                            {error.questions1 && <span style={{ color:"red"}}className="error">{error.questions1}</span>}
                                            <Box onClick={handleSubmit} mt={5}>
                                                <button
                                                    // onClick={() => {
                                                    //     if (data === true) {
                                                    //         setPage("Question3");
                                                    //     } else {
                                                    //         setMessage("enter");
                                                    //     }
                                                    // }}
                                                    style={{
                                                        fontWeight: "bold",
                                                        background: "#E2FF65",
                                                        color: "#152642",
                                                        // padding: small ? "" : "15px",
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
                                        //onClick={() => setPage("Question3")}
                                        onClick={() =>
                                            navigate(
                                                `/feedbackq/${userSurveyId}`
                                            )
                                        }
                                        mt={4}
                                        style={{
                                            display: medium ? "none" : "",
                                            borderColor: "#E2FF66",
                                            background: "#161616",
                                            color: "#E2FF66",
                                            textAlign: "center",
                                            fontWeight: "700",
                                            lineHeight: "40px",
                                            letterSpacing: "1.5px",
                                            cursor: "pointer",
                                            borderRadius: "8px",
                                            fontSize: "20px",
                                        }}
                                        className="form-control"
                                    >
                                        Back
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

export default FeedbackQuestion2;
