import { React, useState } from "react";
import { Grid, Box, useMediaQuery, useTheme } from "@mui/material";
import LOGO from "../components/Assets/Images/LOGO.png";
import PromotedScore from "./PromotedScore";
import Questions from "./Questions";
import QRFeedback from "./QRFeedback";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Question2 from "./Question2";
import Question3 from "./Question3";
import RightNavBar from "../components/ResuableComponent/RightNavbar";
import CreateNps from "./CreateNps";
import Surveys from "./Surveys";
import { useLocation } from "react-router-dom";
import Mcq from "./Mcq";
import Question4 from "./Question4";
import Mcq2 from "./Mcq2";
import Open2 from "./Open2";
import OpenEnded from "./OpenEnded";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    channel: Yup.string().required("Channel is required"),
});

const CreateNPS = (props) => {
    const [page, setPage] = useState("create");
    const location = useLocation();
    const userId = location.state && location.state.userId;
    const merchantId = location.state && location.state.merchantId;
    const surveyId = location.state && location.state.surveyId;
    const { createdSurveyId } = location.state && location.state;
    const { createdSurveyId2 } = location.state && location.state;
    const { recentQuestid } = location.state;
    const { recentQuestid2 } = location.state;
    console.log("Recent questin id", recentQuestid);
    console.log("CreatedSurveydscdcvd Id", createdSurveyId2);
    console.log("merchantId", merchantId);

    // console.log("userid",userId);
    const initialValues = {
        name: "",
        channel: "",
    };
    const handleSubmit = (values, { setSubmitting }) => {
        console.log(values);
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
                {/* <Surveys></Surveys> */}
                <Grid item lg={9.5} md={9.5} sm={12} xs={12}>
                    {page === "create" ? (
                        <CreateNps
                            setPage={setPage}
                            userid={userId}
                            surveyId={surveyId}
                            merchantId={merchantId}
                        />
                    ) : page === "promoted" ? (
                        <PromotedScore
                            setPage={setPage}
                            createdSurveyId={createdSurveyId}
                        />
                    ) : page === "Question" ? (
                        <Questions setPage={setPage} />
                    ) : page === "Question2" ? (
                        <Question2
                            setPage={setPage}
                            recentQuestid={recentQuestid}
                        />
                    ) : page === "Question3" ? (
                        <Question3
                            setPage={setPage}
                            userid={userId}
                            createdSurveyId={createdSurveyId}
                        />
                    ) : page === "Question4" ? (
                        <Question4
                            setPage={setPage}
                            createdSurveyId2={createdSurveyId2}
                            recentQuestid2={recentQuestid2}
                        />
                    ) : page === "feedback" ? (
                        <QRFeedback />
                    ) : page === "Surveys" ? (
                        <Surveys />
                    ) : page === "Mcq" ? (
                        <Mcq setPage={setPage} />
                    ) : page === "Mcq2" ? (
                        <Mcq2 setPage={setPage} />
                    ) : page === "Open2" ? (
                        <Open2 setPage={setPage} />
                    ) : page === "Open" ? (
                        <OpenEnded setPage={setPage} />
                    ) : (
                        ""
                    )}
                    ;
                </Grid>
            </Grid>
        </>
    );
};

export default CreateNPS;
