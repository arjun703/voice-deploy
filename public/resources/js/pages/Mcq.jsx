import React, { useState } from "react";
import { Grid, Box, useMediaQuery, useTheme } from "@mui/material";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RightNavBar from "../components/ResuableComponent/RightNavbar";

import SearchBar from "../components/ResuableComponent/SearchBar";
import { setRecentquestion_id, setSurveyId } from "../Reducers/UiReducers";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { bottom } from "@popperjs/core";
// const validationSchema = Yup.object().shape({
//     comment: Yup.string().required("Questions is required"),
// });

const Mcq = ({ setPage }) => {
    const [questionType, setQuestionType] = useState("");
    const [questionTitlee, setQuestionTitle] = useState("");
    const [mcq, setMcq] = useState("");

    const { createdsurvey_id } = useSelector((state) => state.ui);
    const dispatch = useDispatch();
    const location = useLocation();
    const createdSurveyId = location.state?.createdSurveyId;
    console.log(createdSurveyId);
    const theme = useTheme();
    const [error,setError]=useState([]);
    const medium = useMediaQuery(theme.breakpoints.down("md"));
    // const initialValues = {
    //     comment: "",
    // };
    const navigate = useNavigate();

    const handleQuestionTypeChange = (event) => {
        setQuestionType(event.target.value);
    };

    const handleQuestionTypeChange2 = (event) => {
        setQuestionTitle(event.target.value);
    };

    const handleSubmit = async () => {
        console.log(createdsurvey_id);
        try {
            const response = axios
                .post("/api/question", {
                    questionText: questionTitlee,
                    createdSurveyId: createdsurvey_id,
                    mcqSubheading: (questionType === 'MCQ') ? mcq : "null",
                    questionType: questionType,
                })
                .then((response) => {
                    console.log("Response from API:", response.data.questionId);
                    dispatch(setRecentquestion_id(response.data.questionId));
                    setPage("Question3");
                })
                .catch((error) => {
                    console.error("Error submitting rating:", error);
                    setError(error.response.data.errors);
                });

            // setPage("Question3");
        } catch (error) {
            console.error("Error submitting rating:", error);
        }
        // setSubmitting(false);
    };

    return (
        <>
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
                    <Grid item lg={5} md={6} sm={8} xs={8} mx="auto">
                        <Box
                            ml={1}
                            style={{
                                textAlign: "center",
                                color: "#E2FF66",
                                fontWeight: "600",
                                fontSize: "20px",
                            }}
                        >
                            Question Page
                        </Box>
                        <Box
                            mt={2}
                            style={{
                                color: "#DDDDDD",
                                textAlign: "center",
                                fontWeight: "400",
                                fontSize: "25px",
                            }}
                        >
                            Create Your question here.
                        </Box>
                        {/* <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, values }) => <Form></Form>}
                        </Formik> */}
                        <Box mt={2}>
                            <div className="form-floating">
                                <Box style={{ color: "white" }}>
                                    QuestionTitle
                                </Box>
                                <input
                                    className="form-control"
                                    style={{
                                        // height: "400px",
                                        background: "#161616",
                                        color: "white",
                                        borderColor: "#626262",
                                        marginBottom: "20px",
                                    }}
                                    placeholder="QuestionTitle"
                                    type="text"
                                    value={questionTitlee}
                                    onChange={(e) =>
                                        setQuestionTitle(e.target.value)
                                    }
                                />
                                {error.questionText && <span style={{ color:"red"}}className="error">{error.questionText}</span>}
                            </div>
                            <div className="form-">
                            <label
                                    htmlFor="questionSelect"
                                    style={{
                                        color: "white",
                                       paddingTop:"20px"
                                    }}
                                >
                                    Type of question
                                </label>
                                <select
                                    style={{
                                        background: "#161616",
                                        color: "white",
                                        borderColor: "#626262",
                                    }}
                                    className="form-control"
                                    id="questionSelect"
                                    name="question"
                                    onChange={handleQuestionTypeChange}
                                >
                                    <option value="">Type of question</option>
                                    <option value="Open Ended">
                                        Open Ended
                                    </option>
                                    <option value="MCQ">MCQ</option>
                                </select>
                                {error.questionType && <span style={{ color:"red"}}className="error">{error.questionType}</span>}
                            </div>
                        </Box>
                        {questionType === "MCQ" && (
                            <Box mt={2}>
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
                                        value={mcq}
                                        onChange={(e) => setMcq(e.target.value)}
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
                                {error.mcqSubheading && <span style={{ color:"red"}}className="error">{error.mcqSubheading}</span>}
                            </Box>
                        )}

                        {/* <Box mt={1}>
                            <ErrorMessage
                                name="comment"
                                component="div"
                                className="error"
                                style={{ color: "red" }}
                            />
                        </Box> */}

                        <Box mt={5}>
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                style={{
                                    fontWeight: "bold",
                                    background: "#E2FF65",
                                    color: "#152642",
                                    padding: "15px",
                                    borderStyle: "none",
                                    fontSize: "20px",
                                    borderRadius: "8px",
                                    lineHeight: "28px",
                                }}
                                className="form-control"
                            >
                                Submit
                            </button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Mcq;
