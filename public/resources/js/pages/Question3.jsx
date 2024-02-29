import React, { useEffect, useState } from "react";
import { Grid, Box, useMediaQuery, useTheme } from "@mui/material";
// import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/ResuableComponent/SearchBar";
import { setSurveyId } from "../Reducers/UiReducers";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
// const validationSchema = Yup.object().shape({
//     comment: Yup.string().required("comment is required"),
// });
// const { createdSurveyId } = location.state;
// console.log("questio 3 page", createdSurveyId);
// const rating = sessionStorage.getItem("rating");
// const name = sessionStorage.getItem("name");
// const channel = sessionStorage.getItem("channel");
const Question3 = ({ setPage }) => {
    const { recentquestion_id, createdsurvey_id } = useSelector(
        (state) => state.ui
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [questionType, setQuestionType] = useState("");
    const theme = useTheme();
    const [ques, setQues] = useState("");
    const [loading, setLoading] = useState(true);

    const [dataa, setDataa] = useState("");
    const medium = useMediaQuery(theme.breakpoints.down("md"));

    const [showOptions, setShowOptions] = useState(false);
    const [questData, setQuestData] = useState("");

    const handleAddQuestionsClick = () => {
        setPage("Mcq");
    };

    const handleOpenEndedClick = () => {
        setPage("Open2");
    };

    const handleMultipleChoiceClick = () => {
        setPage("Mcq2");
        // navigate("/mcq", { state: { createdSurveyId: createdSurveyId } });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `/api/questionsmcq/${recentquestion_id}`
                );
                console.log(
                    "JSON",
                    response.data.questionsmcq.question.questionText
                );
                setQues(response.data.questionsmcq.question.questionText);
                setLoading(false);
                setDataa(response.data.questionsmcq.mcqSubheading);
                console.log(
                    "subheading",
                    response.data.questionsmcq.mcqSubheading
                );
                setQuestionType(
                    response.data.questionsmcq.question.questionType
                );
                console.log(response.data.questionsmcq.question.questionType);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = () => {
        setPage("feedback");
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
                        <Grid container>{/* <Grid item lg={3}></Grid> */}</Grid>
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
                                {/* Question # 03 */}
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
                            </Box>
                            <Box mt={5}>
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
                                {/* Could you elaborate on how the factor you chose
                                influenced your evaluation? */}
                                {ques}
                            </Box>
                            {/* <Formik
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
                                                        background: "#161616",
                                                        color: "white",
                                                        borderColor: "#626262",
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
                                                        fontSize: "15px",
                                                    }}
                                                >
                                                    Write Here
                                                </label>
                                            </div>
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
                                                type="submit"
                                                onclick={handleSubmit}
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
                                                Next
                                            </button>
                                        </Box>
                                    </Form>
                                )}
                            </Formik> */}
                            {questionType == "Open Ended" ? (
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
                                        />
                                        <label
                                            for="floatingTextarea2"
                                            style={{
                                                color: "#747474",
                                                fontSize: "15px",
                                            }}
                                        >
                                            Write Here
                                        </label>
                                    </div>
                                </Box>
                            ) : (
                                ""
                            )}

                            {/* <Box mt={1}>
                                <ErrorMessage
                                    name="comment"
                                    component="div"
                                    className="error"
                                    style={{ color: "red" }}
                                />
                            </Box> */}
                            {ques ? (
                            <Box onClick={handleSubmit} mt={5}>
                                <button
                                    type="submit"
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
                            ) : (
                                ""
                            )}

                            {/* {ques ? ( */}
                            {/* <Box
                                    onClick={() => setPage("feedback")}
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
                                    Skip
                                </Box> */}
                            {/* ) : (
                                ""
                            )} */}
                        </Grid>
                        {/* <Grid item lg={3}></Grid> */}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Question3;
