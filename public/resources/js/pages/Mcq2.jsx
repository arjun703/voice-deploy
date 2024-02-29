import React, { useState } from "react";
import { Grid, Box, useMediaQuery, useTheme } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RightNavBar from "../components/ResuableComponent/RightNavbar";
import SearchBar from "../components/ResuableComponent/SearchBar";
import { setSurveyId } from "../Reducers/UiReducers";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
const validationSchema = Yup.object().shape({
    comment: Yup.string().required("Questions is required"),
});
const Mcq2 = ({ setPage }) => {
    const { createdsurvey_id } = useSelector((state) => state.ui);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [submitting, setSubmitting] = useState([]);
    const theme = useTheme();
    const medium = useMediaQuery(theme.breakpoints.down("md"));
    const initialValues = {
        comment: "",
    };
    const createdSurveyId = location.state?.createdSurveyId;
    console.log(createdSurveyId);

    const handleSubmit = async (values, { setSubmitting }) => {
        console.log(values);
        try {
            const response = await axios.post("/api/question", {
                mcqSubheading: values["comment"],
                createdSurveyId: createdsurvey_id,
                questionText: values["questionTitle"],
            });
            const recentQuestid2 = response.data.questionId;
            // console.log("Response from API:", response.data.questionId);
            navigate("/dashboard", {
                state: { recentQuestid2: recentQuestid2 },
            });
            setPage("Question4");
        } catch (error) {
            console.error("Error submitting rating:", error);
        }
        setSubmitting(false);
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
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {/* {({ isSubmitting, values }) => (
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
                                                            fontSize: "15px",
                                                        }}
                                                    >
                                                        Write Here Your
                                                        questions
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
                                                    Submit
                                                </button>
                                            </Box>
                                        </Form>
                                    )} */}
                            {({ isSubmitting, values }) => (
                                <Form>
                                    <Box
                                        mt={2}
                                        style={{
                                            color: "#DDDDDD",
                                            fontWeight: "400",
                                            fontSize: "15px",
                                        }}
                                    >
                                        {/* Options field */}
                                        Mcq Questions Heading
                                        {/* Title field */}
                                        <div className="form-floating">
                                            <Field
                                                type="text"
                                                style={{
                                                    background: "#161616",
                                                    color: "white",
                                                    borderColor: "#626262",
                                                }}
                                                className="form-control"
                                                placeholder="Title of the question"
                                                id="questionTitle"
                                                name="questionTitle"
                                            />
                                            <label
                                                htmlFor="questionTitle"
                                                style={{
                                                    color: "#747474",
                                                    fontSize: "15px",
                                                }}
                                            >
                                                Title of the question
                                            </label>
                                        </div>
                                    </Box>
                                    <Box
                                        mt={2}
                                        style={{
                                            color: "#DDDDDD",
                                            fontWeight: "400",
                                            fontSize: "15px",
                                        }}
                                    >
                                        {/* Options field */}
                                        Write options here
                                        <div className="form-floating">
                                            <Field
                                                as="textarea"
                                                style={{
                                                    height: "200px",
                                                    background: "#161616",
                                                    color: "white",
                                                    borderColor: "#626262",
                                                }}
                                                className="form-control"
                                                placeholder="Write options here"
                                                id="comment"
                                                name="comment"
                                            />

                                            <label
                                                htmlFor="options"
                                                style={{
                                                    color: "#747474",
                                                    fontSize: "15px",
                                                }}
                                            >
                                                Write options here (comma
                                                separated)
                                            </label>
                                        </div>
                                    </Box>
                                    {/* Existing textarea field for the question */}
                                    {/* <Box mt={2}>
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
                                                        id="comment"
                                                        name="comment"
                                                    />
                                                    <label
                                                        htmlFor="comment"
                                                        style={{
                                                            color: "#747474",
                                                            fontSize: "15px",
                                                        }}
                                                    >
                                                        Write Here Your question
                                                    </label>
                                                </div>
                                            </Box> */}
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
                                </Form>
                            )}
                        </Formik>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Mcq2;
