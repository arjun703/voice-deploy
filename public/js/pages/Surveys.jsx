import { React, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, Box, useMediaQuery, useTheme } from "@mui/material";
import SearchBar from "../components/ResuableComponent/SearchBar";
import RightNavBar from "../components/ResuableComponent/RightNavbar";
import axios from "axios";
import Plus from "../components/Assets/Images/plus.png";

const Surveys = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const medium = useMediaQuery(theme.breakpoints.down("md"));
    const small = useMediaQuery(theme.breakpoints.down("sm"));
    const [selectedSurveyType, setSelectedSurveyType] = useState(null);
    const [surveyDetails, setSurveyDetails] = useState([]);
    const merchantId = sessionStorage.getItem("merchantId");
    const handleSubmit = (selectedValue) => {
        let surveyId;

        if (selectedValue === "NPS") {
            surveyId = 2;
            navigate("/dashboard/", {
                state: { surveyId: surveyId, merchantId: merchantId },
            });
        } else {
            surveyId = 1;
            navigate("/dashboard/", {
                state: { surveyId: surveyId, merchantId: merchantId },
            });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `/api/displaySurvey/${merchantId}`
                );
                setSurveyDetails(response.data.surveyDetails);
            } catch (error) {}
        };

        fetchData();
    }, [merchantId]);

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
                                height: "120vh",
                                marginBottom: "50px",
                            }}
                            item
                            lg={11}
                            md={11}
                            sm={11}
                            xs={11}
                            mx="auto"
                        >
                            <Box style={{ paddingLeft: "20px" }}>
                                <Box
                                    style={{ fontSize: "25px", color: "white" }}
                                >
                                    Net Promoted Scroce (NPS)
                                </Box>

                                <Box
                                    mt={5}
                                    style={{
                                        fontSize: "17px",
                                        color: "white",
                                        fontWeight: "500",
                                        marginRight: "20px",
                                        marginTop: "5px",
                                        paddingBottom: "15px",
                                    }}
                                >
                                    NPS is the compose that will guide you to
                                    care about what the customer cares about
                                </Box>
                                <Box
                                    style={{
                                        padding: "25px",
                                        background: "black",
                                        width: "98%",
                                    }}
                                >
                                    <Box style={{ display: "flex" }}>
                                        {/* {surveyDetails.map((survey, index) => */}
                                        {/* survey.surveyTypeId === 2 &&
                                        survey.surveyName ? ( */}
                                        <Box
                                            // key={index}
                                            style={{
                                                padding: "10px 10px",
                                                background: "#161616",
                                                textAlign: "center",
                                                borderRadius: "10px",
                                                color: "white",
                                                paddingTop: "30px",
                                                marginRight: "20px",
                                                width: "18%",
                                                display: "none",
                                            }}
                                        >
                                            {/* Demo */}
                                            {/* {survey.surveyName} */}
                                            {/* <Box
                                                style={{
                                                    padding: "10px 10px",
                                                    background: "#161616",
                                                    paddingTop: "2px",
                                                }}
                                            > */}
                                            {/* Seamless Event Booth */}
                                            {/* {survey.surveyChannel} */}
                                        </Box>
                                        {/* <Box
                                                mt={4}
                                                onClick={() => {
                                                    navigate("/response", {
                                                        state: {
                                                            surveyId:
                                                                survey.surveyId,
                                                        },
                                                    });
                                                }}
                                                style={{
                                                    display: medium
                                                        ? "none"
                                                        : "",
                                                    borderColor: "#E2FF66",
                                                    background: "#161616",
                                                    color: "#E2FF66",
                                                    textAlign: "center",
                                                    fontWeight: "700",
                                                    letterSpacing: "1.5px",
                                                    cursor: "pointer",
                                                    borderRadius: "8px",
                                                    fontSize: "20px",
                                                }}
                                                className="form-control"
                                            >
                                                Enter
                                            </Box> */}
                                        {/* </Box> */}
                                        {/* ) : null */}
                                        {/* )} */}
                                        <Box
                                            style={{
                                                padding: "10px 10px",
                                                background: "#161616",
                                                textAlign: "center",
                                                borderRadius: "10px",
                                                color: "white",
                                                paddingTop: "15px",
                                            }}
                                        >
                                            <Box
                                                style={{
                                                    padding: "0px 0px",
                                                    background: "#161616",
                                                    paddingTop: "2px",
                                                }}
                                            >
                                                {" "}
                                                <img src={Plus} />{" "}
                                            </Box>
                                            <Box
                                                onClick={() => {
                                                    handleSubmit("NPS");
                                                }}
                                                mt={4}
                                                value="NPS"
                                                style={{
                                                    display: medium
                                                        ? "none"
                                                        : "",
                                                    borderColor: "#E2FF66",
                                                    background: "#E2FF66",
                                                    color: "black",
                                                    textAlign: "center",
                                                    fontWeight: "700",
                                                    letterSpacing: "1.5px",
                                                    cursor: "pointer",
                                                    borderRadius: "8px",
                                                    fontSize: "20px",
                                                    width: "180px",
                                                }}
                                                className="form-control"
                                            >
                                                Create
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Box style={{ paddingLeft: "20px" }}>
                                <Box
                                    style={{
                                        fontSize: "25px",
                                        color: "white",
                                        paddingTop: "50px",
                                    }}
                                >
                                    Customer Satisfaction (C-sat)
                                </Box>

                                <Box
                                    mt={5}
                                    style={{
                                        fontSize: "17px",
                                        color: "white",
                                        fontWeight: "500",
                                        marginRight: "20px",
                                        marginTop: "5px",
                                        paddingBottom: "15px",
                                    }}
                                >
                                    C-sat are like sensors you place after each
                                    customer journey to knpw where your brand is
                                    succeeding or failing
                                </Box>
                                <Box
                                    style={{
                                        padding: "25px",
                                        background: "black",
                                        width: "98%",
                                    }}
                                >
                                    <Box style={{ display: "flex" }}>
                                        {/* {surveyDetails.map((survey, index) =>
                                            survey.surveyTypeId === 1 &&
                                            survey.surveyName ? ( */}
                                        <Box
                                            // key={index}
                                            style={{
                                                padding: "10px 10px",
                                                background: "#161616",
                                                textAlign: "center",
                                                borderRadius: "10px",
                                                color: "white",
                                                paddingTop: "30px",
                                                marginRight: "20px",
                                                width: "18%",
                                                display: "none",
                                            }}
                                        >
                                            {/* Demo */}
                                            {/* {survey.surveyName} */}
                                            <Box
                                                style={{
                                                    padding: "10px 10px",
                                                    background: "#161616",
                                                    paddingTop: "2px",
                                                }}
                                            >
                                                {/* Seamless Event Booth */}
                                                {/* {survey.surveyChannel} */}
                                            </Box>
                                            <Box
                                                mt={4}
                                                style={{
                                                    display: medium
                                                        ? "none"
                                                        : "",
                                                    borderColor: "#E2FF66",
                                                    background: "#161616",
                                                    color: "#E2FF66",
                                                    textAlign: "center",
                                                    fontWeight: "700",
                                                    letterSpacing: "1.5px",
                                                    cursor: "pointer",
                                                    borderRadius: "8px",
                                                    fontSize: "20px",
                                                }}
                                                className="form-control"
                                                onClick={() => {
                                                    navigate("/response", {
                                                        state: {
                                                            surveyId:
                                                                survey.surveyId,
                                                        },
                                                    });
                                                }}
                                            >
                                                Enter
                                            </Box>
                                        </Box>
                                        {/* ) : null
                                        )} */}

                                        <Box
                                            style={{
                                                padding: "10px 10px",
                                                background: "#161616",
                                                textAlign: "center",
                                                borderRadius: "10px",
                                                color: "white",
                                                paddingTop: "15px",
                                            }}
                                        >
                                            <Box
                                                style={{
                                                    padding: "0px 0px",
                                                    background: "#161616",
                                                    paddingTop: "2px",
                                                }}
                                            >
                                                {" "}
                                                <img src={Plus} />{" "}
                                            </Box>
                                            <Box
                                                onClick={() => {
                                                    handleSubmit("CSAT");
                                                }}
                                                mt={4}
                                                value="CSAT"
                                                style={{
                                                    display: medium
                                                        ? "none"
                                                        : "",
                                                    borderColor: "#E2FF66",
                                                    background: "#E2FF66",
                                                    color: "black",
                                                    textAlign: "center",
                                                    fontWeight: "700",
                                                    letterSpacing: "1.5px",
                                                    cursor: "pointer",
                                                    borderRadius: "8px",
                                                    fontSize: "20px",
                                                    width: "180px",
                                                }}
                                                className="form-control"
                                            >
                                                Create
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Surveys;
