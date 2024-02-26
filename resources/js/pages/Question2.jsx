import React, { useEffect, useState } from "react";
import {
    Grid,
    Box,
    Radio,
    FormControlLabel,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import "../../css/app.css";
import SearchBar from "../components/ResuableComponent/SearchBar";
import { useLocation, useNavigate } from "react-router-dom";
import Surveys from "../pages/Surveys";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setRecentquestion_id } from "../Reducers/UiReducers";
import Skeleton from "@mui/material/Skeleton";

const Question2 = ({ setPage }) => {
    const { recentquestion_id } = useSelector((state) => state.ui);
    const dispatch = useDispatch();
    const theme = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const rating = location.state && location.state.rating;
    const {
        surveyName,
        SurveyChannel,
        userid,
        surveyId,
        merchantId,
        createdSurveyId,
    } = location.state;
    // const createdSurveyId = location.state && location.state.createdSurveyId;
    const { recentQuestid } = location.state;
    console.log("recentid", recentQuestid);
    console.log("dcdcd", createdSurveyId);
    const medium = useMediaQuery(theme.breakpoints.down("md"));
    const [data, setData] = useState(false);
    const [select, setSelect] = useState("");
    const [loading, setLoading] = useState(true);
    const [que, setQue] = useState(false);

    const [value, setvalue] = useState("");
    const [message, setMessage] = useState("");
    const [dataa, setDataa] = useState([]);
    const [ques, setQues] = useState("");
    const [questuionType, setQuestuionType] = useState("");
    console.log(ques);
    const [editableContent, setEditableContent] = useState();
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
    // console.log(
    //     "rating",
    //     rating,
    //     SurveyChannel,
    //     surveyName,
    //     userid,
    //     surveyId,
    //     merchantId
    // );
    const handleSubmit = () => {
        console.log(setData);
    };
    const handleNextButtonClick = () => {
        dispatch(setRecentquestion_id(null));
        navigate("/dashboard", {
            state: { createdSurveyId2: createdSurveyId },
        });
        setPage("Question4");
        console.log(editableContent);
    };

    const handleContentChange = (event) => {
        setEditableContent(event.target.textContent);
        console.log(event.target.tectContent);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `/api/questionsmcq/${recentquestion_id}`
                );
                console.log(
                    "JSON",
                    response.data.questionsmcq.question.questionType
                );
                setQue(true);
                setQues(response.data.questionsmcq.question.questionText);
                console.log(
                    "object",
                    response.data.questionsmcq.question.questionText
                );
                setDataa(response.data.questionsmcq.mcqSubheading);
                console.log(
                    "subheading",
                    response.data.questionsmcq.question.questionType
                );
                setQuestuionType(
                    response.data.questionsmcq.question.questionType
                );
                setLoading(false);
                console.log(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleValue = (data) => {
        sessionStorage.setItem("resturant_factors", data);
        navigate("/dashboard", {
            state: {
                resturant_factors: data,
                surveyName,
                SurveyChannel,
                rating,
                userid,
                surveyId,
                merchantId,
            },
        });

        setPage("Question3");
    };
    // const [showOptions, setShowOptions] = useState(false);

    const handleAddQuestionsClick = () => {
        setPage("Open2");
        // setShowOptions(true);
    };

    const handleOpenEndedClick = () => {
        navigate("/open", { state: { createdSurveyId: createdSurveyId } });
    };

    const handleMultipleChoiceClick = () => {
        setPage("Mcq");
        // navigate("/mcq", { state: { createdSurveyId: createdSurveyId } });
    };
    return (
        <>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <Grid container>
                    <Grid item lg={11} md={11} sm={11} mx="auto">
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
                        <Grid item lg={7} md={8} sm={8} xs={8} mx="auto">
                            <Box
                                ml={1}
                                style={{
                                    textAlign: "center",
                                    color: "#E2FF66",
                                    fontWeight: "700",
                                    fontSize: "20px",
                                }}
                            >
                                {/* Question # 02 */}
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
                            <Grid container>
                                <Grid item lg={0} md={0} sm={6} xs={6}></Grid>
                                <Grid item lg={12} md={12} sm={6} xs={6}>
                                    {ques ? (
                                        ""
                                    ) : (
                                        <Box mt={5}>
                                            <div>
                                                <button
                                                    style={{
                                                        fontWeight: "bold",
                                                        background: "#E2FF65",
                                                        color: "#152642",
                                                        borderStyle: "none",
                                                        fontSize: "20px",
                                                        borderRadius: "8px",
                                                        lineHeight: "28px",
                                                    }}
                                                    className="form-control"
                                                    onClick={
                                                        handleAddQuestionsClick
                                                    }
                                                >
                                                    Add Questions
                                                </button>
                                            </div>
                                        </Box>
                                    )}
                                </Grid>
                            </Grid>
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
                                    textAlign: "center",
                                    lineHeight: "22.85px",
                                    color: "#DDDDDD",
                                    fontSize: "16px",
                                    fontWeight: "400",
                                }}
                                mt={2}
                            >
                                {/* Which of the following Factors Influenced your
                                answer the most? */}

                                {ques ? (
                                    <Box>
                                        <Box style={{ color: "white" }}>
                                            {ques}
                                        </Box>
                                        {questuionType == "MCQ" ? (
                                            ""
                                        ) : (
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
                                        )}
                                    </Box>
                                ) : (
                                    <Box style={{ color: "red" }}>
                                        No Question
                                    </Box>
                                )}
                            </Box>
                            {loading && que ? (
                                <Box>
                                    <Skeleton />
                                    <Skeleton animation="wave" />
                                    <Skeleton animation={false} />
                                </Box>
                            ) : (
                                <div>
                                    {dataa &&
                                        dataa.map((item, i) => (
                                            <Box
                                                key={i} // Adding a unique key for each iteration
                                                onClick={() =>
                                                    handleBoxClick("menu")
                                                }
                                                onDoubleClick={() =>
                                                    handleBoxClick("menu")
                                                }
                                                mt={2}
                                                className="form-control"
                                                style={{
                                                    display: "flex",
                                                    borderColor:
                                                        select === "menu"
                                                            ? "#E2FF66"
                                                            : "#626262",
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
                                                <Box
                                                    className="promoter-image q2-radio"
                                                    ml={1}
                                                >
                                                    <input
                                                        style={{
                                                            background:
                                                                select ===
                                                                "menu"
                                                                    ? "#E2FF66"
                                                                    : "",
                                                            borderColor:
                                                                select ===
                                                                "menu"
                                                                    ? "#E2FF66"
                                                                    : "",
                                                        }}
                                                        className="form-check-input q2-radio"
                                                        type="radio"
                                                        name="flexRadioDefault"
                                                        id={`flexRadioDefault${i}`} // Making id unique
                                                        checked={
                                                            select === "menu"
                                                        }
                                                    />
                                                </Box>

                                                <Box ml={2}>
                                                    <Box
                                                        onClick={() =>
                                                            handleValue(
                                                                "Restaurant Menu"
                                                            )
                                                        }
                                                        style={{
                                                            fontWeight: "600",
                                                            fontSize: "16px",
                                                        }}
                                                    >
                                                        {item}
                                                    </Box>
                                                </Box>
                                            </Box>
                                        ))}
                                </div>
                            )}

                            <Grid container>
                                <Grid item lg={0} md={0} sm={6} xs={6}></Grid>
                                <Grid item lg={12} md={12} sm={6} xs={6}>
                                    {ques ? (
                                        <Box mt={5}>
                                            <button
                                                onClick={handleNextButtonClick}
                                                style={{
                                                    fontWeight: "bold",
                                                    background: "#E2FF65",
                                                    color: "#152642",
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
                                    ) : (
                                        ""
                                    )}
                                </Grid>
                            </Grid>
                            {ques ? (
                                <Box
                                    //onClick={() => setPage("Question3")}
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
                                    Skip
                                </Box>
                            ) : (
                                ""
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Question2;
