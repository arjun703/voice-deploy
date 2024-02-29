import React, { useEffect, useState } from "react";
import { Grid, Box, useMediaQuery, useTheme } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import SearchBar from "../components/ResuableComponent/SearchBar";
import RightNavBar from "../components/ResuableComponent/RightNavbar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setComment } from "../Reducers/UiReducers";

const validationSchema = Yup.object().shape({
    comment: Yup.string().required("comment is required"),
});

const FeedbackQuestion3 = ({ setPage }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const { userSurveyId } = useParams();
    const [userId, setUserId] = useState([]);
    const medium = useMediaQuery(theme.breakpoints.down("md"));
    const initialValues = {
        comment: "",
    };
    const { currquestion } = useSelector((state) => state.ui);
    const [questions, setQuestions] = useState("");

    const [surveyId, setSurveyId] = useState([]);
    const [questionId, setQuestionId] = useState([]);
    const [error,setError]=useState([]);

    const [questionNumber, SetQuestionNumber] = useState(3);

    useEffect(() => {
        const getQuestions = async () => {
            try {
                const response = await axios.get(
                    `/api/questions/${userSurveyId}`
                );
                setQuestions(
                    response.data.questions[questionNumber].questionText
                );
                const surveyId = response.data.questions[3].id;
                const questionId = response.data.questions[3].questionId;
                const userId = response.data.questions[3].user_id;
                setUserId(userId);
                console.log(surveyId, userId, questionId);

                setQuestionId(questionId);
                setSurveyId(surveyId);
                console.log("Survey and question", surveyId, questionId);
            } catch (error) {
                console.error("Error fetching questions data", error);
            }
        };
        getQuestions();
    }, []);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post("/api/feedback", {
                dataSurveyId: surveyId,
                id: questionId,
                // userId,
                rating:0,
                questions1: values["comment"],
            });
            navigate("/thankyou");
        } catch (error) {
            console.error("Error submitting rating:", error);
        }
        setSubmitting(false);
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
                                    lg={5}
                                    md={6}
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
                                    </Box>
                                    <Box
                                        mt={2}
                                        style={{
                                            color: "#DDDDDD",
                                            textAlign: "center",
                                            fontWeight: "400",
                                            fontSize: "16px",
                                        }}
                                    >
                                        {/* Could you elaborate on how the factor
                                        you chose influenced your evaluation? */}
                                        {questions}
                                    </Box>
                                    <Formik
                                        initialValues={initialValues}
                                        validationSchema={validationSchema}
                                        onSubmit={handleSubmit}
                                    >
                                        {({ isSubmitting, values }) => (
                                            <Form>
                                                <Box mt={2}>
                                                    <div className="form-floating">
                                                        <Field
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
                                                        ></Field>
                                                        <label
                                                            for="floatingTextarea2"
                                                            style={{
                                                                color: "#747474",
                                                                fontSize:
                                                                    "15px",
                                                            }}
                                                        >
                                                            You don't have
                                                            to,but we would love
                                                            to hear from you!
                                                        </label>
                                                    </div>
                                                </Box>
                                                <Box
                                                    mt={1}
                                                    ml={1}
                                                    style={{ display: "flex" }}
                                                >
                                                    <Box mr={2}>
                                                        <input
                                                            style={{
                                                                padding: "2px",
                                                            }}
                                                            type="checkbox"
                                                        />
                                                    </Box>
                                                    <Box
                                                        style={{
                                                            color: "white",
                                                        }}
                                                    >
                                                        You can call me if you
                                                        have more questions
                                                    </Box>
                                                </Box>
                                                <Box mt={1}>
                                                    <ErrorMessage
                                                        name="comment"
                                                        component="div"
                                                        className="error"
                                                        style={{ color: "red" }}
                                                    />
                                                </Box>

                                                <Box mt={5}>
                                                    <button
                                                        // type="submit"
                                                        style={{
                                                            fontWeight: "bold",
                                                            background:
                                                                "#E2FF65",
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
                                            </Form>
                                        )}
                                    </Formik>
                                    <Box
                                        onClick={() =>
                                            navigate(
                                                `/feedbackq2/${userSurveyId}`
                                            )
                                        }
                                        mt={4}
                                        style={{
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

export default FeedbackQuestion3;
