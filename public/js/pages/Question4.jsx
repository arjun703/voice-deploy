import { React, useEffect, useState } from "react";
import { Grid, Box, useMediaQuery, useTheme } from "@mui/material";
import SearchBar from "../components/ResuableComponent/SearchBar";
import RightNavBar from "../components/ResuableComponent/RightNavbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setRecentquestion_id } from "../Reducers/UiReducers";

const Question4 = ({ setPage }) => {
    const { createdsurvey_id, recentquestion_id } = useSelector(
        (state) => state.ui
    );

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
    const [data, setData] = useState([]);
    const [number, setNumber] = useState("");
    const [select, setSelect] = useState("");
    const [message, setMessage] = useState("");
    const [questions, setQuestions] = useState([]);
    const [questionsmcq, setQuestionsmcq] = useState([]);
    const { createdSurveyId2 } = location.state;
    console.log("frvfr", createdSurveyId2);
    const [surveyId, setSurveyId] = useState([]);
    const [questionId, setQuestionId] = useState([]);
    const [userId, setUserId] = useState([]);
    const { recentQuestid2 } = location.state;
    console.log(recentQuestid2);
    const [showOptions, setShowOptions] = useState(false);
    const [questData, setQuestData] = useState("");
    const [questionType, setQuestionType] = useState("");

    const handleAddQuestionsClick = () => {
        setPage("Open");
    };

    const handleOpenEndedClick = () => {
        navigate(
            "/open"
            // { state: { createdSurveyId: createdSurveyId } }
        );
    };

    const handleMultipleChoiceClick = () => {
        setPage("Mcq2");
        // navigate("/mcq", { state: { createdSurveyId: createdSurveyId } });
    };

    useEffect(() => {
        const getQuestions = async () => {
            try {
                const response = await axios.get(
                    `/api/questions/${userSurveyId}`
                );
                setQuestions(
                    response.data.questions[questionNumber].questionText
                );

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
                    `/api/questionsmcq/${recentquestion_id}`
                );

                console.log(
                    "JSON data",
                    response.data.questionsmcq.question.questionType
                );
                setQuestData(response.data.questionsmcq.question.questionText);
                console.log(
                    "Mohit",
                    response.data.questionsmcq.question.questionText
                );
                setDataa(response.data.questionsmcq.mcqSubheading);
                setQuestionType(
                    response.data.questionsmcq.question.questionType
                );
                console.log(response.data.questionsmcq.question.questionType);
            } catch (error) {
                console.error("Error fetching questions data", error);
            }
        };

        getQuestionmcq();
    }, [questionId]);

    const handleBoxClick = (item) => {
        // console.log("afsdgv", item);
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

    const handleValue = (data) => {
        console.log(data);
        setresData(data);
    };

    const handleSubmit = async (data) => {
        dispatch(setRecentquestion_id(null));
        setPage("Question3");
    };
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
                        <Grid container></Grid>
                        <Grid item lg={7} md={8} sm={8} xs={8} mx="auto">
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
                            {questData ? (
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
                                            onClick={handleAddQuestionsClick}
                                        >
                                            Add Questions
                                        </button>
                                    </div>
                                </Box>
                            )}

                            <Box
                                onClick={() =>
                                    handleValue(
                                        "Which of the following Factors Influenced your answer the most?"
                                    )
                                }
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

                                {questData}
                                {questionType == "Open Ended" ? (
                                    <div className="form-floating">
                                        <textarea
                                            as="textarea"
                                            style={{
                                                height: "400px",
                                                background: "#161616",
                                                color: "white",
                                                borderColor: "#626262",
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
                                            Write here your options (comma
                                            separated)sdv
                                        </label>
                                    </div>
                                ) : (
                                    ""
                                )}

                                {/* <Box mt={2}>
                                    <div className="form-floating">
                                        <textarea
                                            as="textarea"
                                            style={{
                                                height: "400px",
                                                background: "#161616",
                                                color: "white",
                                                borderColor: "#626262",
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
                                            Write here your options (comma
                                            separated)
                                        </label>
                                    </div>
                                </Box> */}
                            </Box>
                            {/* {data.map(())} */}
                            {dataa &&
                                dataa.map((item, i) => (
                                    <Box
                                        key={i}
                                        onClick={() => handleBoxClick(item)}
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
                                            padding: medium ? "6px" : "12px",
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
                                ))}
                            {/* food quality  */}
                            {/* <Box
                                        onClick={() =>
                                            handleBoxClick("Feeling")
                                        }
                                        onDoubleClick={() =>
                                            handleBoxClick("Feeling")
                                        }
                                        mt={2}
                                        className="form-control"
                                        style={{
                                            display: "flex",
                                            borderColor:
                                                select === "Feeling"
                                                    ? "#E2FF66"
                                                    : " #626262",
                                            background: medium
                                                ? "black"
                                                : "#161616",
                                            color: "white",
                                            padding: medium ? "6px" : "12px",
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <Box ml={1}>
                                            {" "}
                                            <input
                                                style={{
                                                    background:
                                                        select === "Feeling"
                                                            ? "#E2FF66"
                                                            : "",
                                                    borderColor:
                                                        select === "Feeling"
                                                            ? "#E2FF66"
                                                            : "",
                                                }}
                                                className="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault1"
                                                checked={
                                                    select === "Feeling"
                                                        ? true
                                                        : false
                                                }
                                            />
                                        </Box>

                                        <Box ml={2}>
                                            {" "}
                                            <Box
                                                onClick={() =>
                                                    handleValue(
                                                        "Feeling & vibes"
                                                    )
                                                }
                                                style={{
                                                    fontWeight: "600",
                                                    fontSize: "16px",
                                                }}
                                            >
                                                {" "}
                                                Feeling & vibes
                                            </Box>{" "}
                                        </Box>
                                    </Box> */}
                            {/* resturant atomosphere  */}
                            {/* <Box
                                        onClick={() =>
                                            handleBoxClick(
                                                "Comfortability & Quietness"
                                            )
                                        }
                                        onDoubleClick={() =>
                                            handleBoxClick(
                                                "Comfortability & Quietness"
                                            )
                                        }
                                        mt={2}
                                        className="form-control"
                                        style={{
                                            display: "flex",
                                            borderColor:
                                                select ===
                                                "Comfortability & Quietness"
                                                    ? "#E2FF66"
                                                    : " #626262",
                                            background: medium
                                                ? "black"
                                                : "#161616",
                                            color: "white",
                                            padding: "12px",
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <Box ml={1}>
                                            {" "}
                                            <input
                                                style={{
                                                    background:
                                                        select ===
                                                        "Comfortability & Quietness"
                                                            ? "#E2FF66"
                                                            : "",
                                                    borderColor:
                                                        select ===
                                                        "Comfortability & Quietness"
                                                            ? "#E2FF66"
                                                            : "",
                                                }}
                                                className="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault1"
                                                checked={
                                                    select ===
                                                    "Comfortability & Quietness"
                                                        ? true
                                                        : false
                                                }
                                            />
                                        </Box>
                                        <Box ml={2}>
                                            {" "}
                                            <Box
                                                onClick={() =>
                                                    handleValue(
                                                        " Comfortability & Quietness"
                                                    )
                                                }
                                                style={{
                                                    fontWeight: "600",
                                                    fontSize: "16px",
                                                }}
                                            >
                                                {" "}
                                                Comfortability & Quietness
                                            </Box>{" "}
                                        </Box>
                                    </Box> */}
                            {/* Staff Behaviour  */}
                            {/* <Box
                                        onClick={() =>
                                            handleBoxClick("Cleanliness")
                                        }
                                        onDoubleClick={() =>
                                            handleBoxClick("Cleanliness")
                                        }
                                        mt={2}
                                        className="form-control"
                                        style={{
                                            display: "flex",
                                            borderColor:
                                                select === "Cleanliness"
                                                    ? "#E2FF66"
                                                    : " #626262",
                                            background: medium
                                                ? "black"
                                                : "#161616",
                                            color: "white",
                                            padding: "12px",
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <Box ml={1}>
                                            {" "}
                                            <input
                                                style={{
                                                    background:
                                                        select === "Cleanliness"
                                                            ? "#E2FF66"
                                                            : "",
                                                    borderColor:
                                                        select === "Cleanliness"
                                                            ? "#E2FF66"
                                                            : "",
                                                }}
                                                className="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault1"
                                                checked={
                                                    select === "Cleanliness"
                                                        ? true
                                                        : false
                                                }
                                            />
                                        </Box>
                                        <Box ml={2}>
                                            {" "}
                                            <Box
                                                onClick={() =>
                                                    handleValue("Cleanliness")
                                                }
                                                style={{
                                                    fontWeight: "600",
                                                    fontSize: "16px",
                                                }}
                                            >
                                                {" "}
                                                Cleanliness
                                            </Box>{" "}
                                        </Box>
                                    </Box> */}

                            {/* other */}
                            {/* Staff Behaviour  */}
                            {/* <Box
                                        onClick={() =>
                                            handleBoxClick("interiors")
                                        }
                                        onDoubleClick={() =>
                                            handleBoxClick("interiors")
                                        }
                                        mt={2}
                                        className="form-control"
                                        style={{
                                            display: "flex",
                                            borderColor:
                                                select === "interiors"
                                                    ? "#E2FF66"
                                                    : " #626262",
                                            background: medium
                                                ? "black"
                                                : "#161616",
                                            color: "white",
                                            padding: "12px",
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <Box ml={1}>
                                            {" "}
                                            <input
                                                style={{
                                                    background:
                                                        select === "interiors"
                                                            ? "#E2FF66"
                                                            : "",
                                                    borderColor:
                                                        select === "interiors"
                                                            ? "#E2FF66"
                                                            : "",
                                                }}
                                                className="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault1"
                                                checked={
                                                    select === "interiors"
                                                        ? true
                                                        : false
                                                }
                                            />
                                        </Box>
                                        <Box ml={2}>
                                            {" "}
                                            <Box
                                                onClick={() =>
                                                    handleValue("The interiors")
                                                }
                                                style={{
                                                    fontWeight: "600",
                                                    fontSize: "16px",
                                                }}
                                            >
                                                {" "}
                                                The interiors
                                            </Box>{" "}
                                        </Box>
                                    </Box> */}
                            <Grid container>
                                <Grid item lg={0} md={0} sm={6} xs={6}></Grid>
                                <Grid item lg={12} md={12} sm={6} xs={6}>
                                    {questData ? (
                                        <Box mt={5}>
                                            <button
                                                onClick={handleSubmit}
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
                                    ) : (
                                        ""
                                    )}
                                </Grid>
                            </Grid>
                            {questData ? (
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
                                    Back
                                </Box>
                            ) : (
                                ""
                            )}
                        </Grid>
                        {/* <Grid item lg={3}></Grid> */}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Question4;
