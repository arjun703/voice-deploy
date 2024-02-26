import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Box, useMediaQuery, useTheme } from "@mui/material";
import SearchBar from "../components/ResuableComponent/SearchBar";
import RightNavBar from "../components/ResuableComponent/RightNavbar";
import LOGO from "../components/Assets/Images/LOGO.png";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    setQuestionstag,
    setQuestionLen,
    setCurrQuestion,
} from "../Reducers/UiReducers";
import axios from "axios";
import FeedbackQuestion1 from "./FeedbackQuestion1";

const FeedbackRating = ({ setPage }) => {
    const { currquestion } = useSelector((state) => state.ui);
    const { userSurveyId } = useParams();
    console.log("frdf",userSurveyId);
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const numbers = Array.from({ length: 11 }, (_, index) => index);

    const medium = useMediaQuery(theme.breakpoints.down("md"));
    const small = useMediaQuery(theme.breakpoints.down("sm"));
    const [isHovered, setIsHovered] = useState("");
    const [data, setData] = useState(false);
    const [number, setNumber] = useState("");
    const [questionNumber, SetQuestionNumber] = useState(0);
    const [error,setError]=useState([]);

    const [select, setSelect] = useState("");
    const [message, setMessage] = useState("");
    const [questiondata, setQuestiondata] = useState("");
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const [questions, setQuestions] = useState([]);
    const [surveyId, setSurveyId] = useState([]);
    const [questionId, setQuestionId] = useState([]);
    const [userId, setUserId] = useState([]);

    const [currentPage, setCurrentPage] = useState(0);
    const questionsPerPage = 1;

    useEffect(() => {
        const getQuestions = async () => {
            try {
                const response = await axios.get(
                    `/api/questions/${userSurveyId}`
                );
                setQuestions(
                    response.data.questions[
                        questionNumber
                    ].questionText.replace(
                        /\[Company_name\]/g,
                        response.data.questions[questionNumber].merchantName
                    )
                );
                dispatch(setQuestionstag(response.data.questions));
                dispatch(setQuestionLen(response.data.questions.length));
                console.log("data", response.data.questions);
                const surveyId = response.data.questions[0].id;
                const questionId = response.data.questions[0].questionId;
                const userId = response.data.questions[0].user_id;
                setQuestionId(questionId);
                setSurveyId(surveyId);
                setUserId(userId);
            } catch (error) {
                console.error("Error fetching questions data", error);
            }
        };
        getQuestions();
    }, [userSurveyId]);


    const handleNextClick = async () => {
        try {
            const response = await axios.post("/api/feedback", {
                rating: number,
                dataSurveyId: surveyId,
                id: questionId,
                questions1:"Null"
                // userId,
            });
            console.log(response.data);
            navigate(`/feedbackQ/${userSurveyId}`);
            dispatch(setCurrQuestion(1));
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                navigate(`/feedbackQ/${userSurveyId}`);
            }
        } catch (error) {
            console.error("Error submitting rating:", error.response.data.errors);
            setError(error.response.data.errors);
        }
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
                                height: "100vh",
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
                                <Grid
                                    style={{ color: "white" }}
                                    item
                                    lg={4}
                                    md={6}
                                    sm={7}
                                    xs={7}
                                    mx="auto"
                                >
                                    <Box
                                        style={{
                                            textAlign: "center",
                                            marginTop: "-20px",
                                            marginBottom: "50px",
                                        }}
                                        ml={3}
                                        mt={5}
                                        mb={4}
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

                                    <Box
                                        style={{
                                            display: "flex",
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
                                    <Box
                                        style={{
                                            textAlign: "center",
                                            lineHeight: "22.85px",
                                        }}
                                        mt={3}
                                    >
                                        {/* Based on your last activity at [Company_name], How likely you are to recommend [Company_name] to your friends and families? */}
                                        
                                        
                                        {questions}
                                    </Box>
                                    
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
                                                lg={6}
                                                md={6}
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
                                                <Grid container>
                                                    {numbers.map((num) => (
                                                        <Grid
                                                            key={num}
                                                            item
                                                            lg={1}
                                                            md={1}
                                                            sm={1}
                                                            xs={1.2}
                                                            style={{
                                                                marginRight:
                                                                    "3px",
                                                            }}
                                                        >
                                                            <Box
                                                                onClick={() => {
                                                                    setNumber(
                                                                        num
                                                                            .toString()
                                                                            .padStart(
                                                                                2,
                                                                                "0"
                                                                            )
                                                                    );
                                                                    setData(
                                                                        true
                                                                    );
                                                                    setMessage(
                                                                        ""
                                                                    );
                                                                }}
                                                                mt={2}
                                                                className="form-control"
                                                                style={{
                                                                    padding:
                                                                        medium
                                                                            ? "-5px -5px"
                                                                            : "10px",
                                                                    borderColor:
                                                                        number ===
                                                                        num
                                                                            .toString()
                                                                            .padStart(
                                                                                2,
                                                                                "0"
                                                                            )
                                                                            ? "#E2FF66"
                                                                            : "#626262",
                                                                    background:
                                                                        "#161616",
                                                                    textAlign:
                                                                        "center",
                                                                    color: "#DDDDDD",
                                                                    borderRadius:
                                                                        "10px",
                                                                    cursor: "pointer",
                                                                    height: medium
                                                                        ? "32px"
                                                                        : "",
                                                                    fontSize:
                                                                        medium
                                                                            ? "10px"
                                                                            : "",
                                                                    marginRight:
                                                                        "2px",
                                                                    display:
                                                                        "flex",
                                                                    alignItems:
                                                                        "center",
                                                                    justifyContent:
                                                                        "center",
                                                                }}
                                                            >
                                                                {num}
                                                            </Box>
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Box
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                marginTop: "20px",
                                            }}
                                        >
                                            <Box
                                                ml={1}
                                                style={{ color: "white" }}
                                            >
                                                Least Likely
                                            </Box>
                                            <Box
                                                mr={1}
                                                style={{ color: "white" }}
                                            >
                                                Most likely
                                            </Box>
                                            
                                        </Box>
                                        {error.rating && <span style={{ color:"red"}}className="error">{error.rating}</span>}
                                        <Box
                                            onClick={handleNextClick}
                                            mt={4}
                                            style={{
                                                display: medium ? "none" : "",
                                                borderColor: "#E2FF66",
                                                background: "#E2FF66",
                                                color: "black",
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
                                            Next
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default FeedbackRating;
