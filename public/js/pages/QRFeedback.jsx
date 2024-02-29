import { React, useState } from "react";
import { Grid, Box, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Correct from "../components/Assets/Images/Correct.svg";

import ClipBoard from "../components/Assets/Images/ClipBoard.svg";
import line from "../components/Assets/Images/line.svg";
import QR from "../components/Assets/Images/QR.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import SearchBar from "../components/ResuableComponent/SearchBar";
import QRCode from "react-qr-code";
import { useSelector } from "react-redux";

const QRFeedback = ({ setPage }) => {
    const { createdsurvey_id } = useSelector((state) => state.ui);
    console.log(createdsurvey_id);
    const theme = useTheme();
    const navigate = useNavigate();
    const medium = useMediaQuery(theme.breakpoints.down("md"));
    const small = useMediaQuery(theme.breakpoints.down("sm"));
    const xstra = useMediaQuery(theme.breakpoints.down("xs"));

    const [copied, setCopied] = useState(false);
    const [select, setSelect] = useState("");
    const textToCopy1 = "Place the QR Code in a visible area in your store.";
    const textToCopy2 = "Send the Survey to your customer base.";
    const textToCopy3 =
        "Place the code in your main page and the survey will pop out to the customers every two weeks.";
    const containerStyle = {
        padding: "10px",
        background: "#fff",
    };

    // const base64EncodedEncryptedId = btoa(
    //     "104voice2" + createdsurvey_id + "#voice$104"
    // );

    const base64EncodedEncryptedId = btoa(
        "104voice2" + createdsurvey_id + "#voice$104"
    );
    console.log(base64EncodedEncryptedId);
    const handleCopy = () => {
        setCopied(true);
    };
    setTimeout(() => {
        setCopied(false);
    }, 3000);

    const handleClick = () => {
        navigate(`/feedback/${base64EncodedEncryptedId}`);
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
                            paddingBottom: "60px",
                            borderRadius: "20px",
                            fontFamily: "Inter",
                            marginBottom: "50px",
                        }}
                        item
                        lg={11}
                        md={11}
                        sm={8}
                        xs={8}
                        mx="auto"
                    >
                        <Box
                            mb={3}
                            style={{
                                textAlign: "center",
                                color: "#E2FF66",
                                fontWeight: "500",
                                fontSize: "25px",
                            }}
                        >
                            <Box
                                style={{
                                    zIndex: "1",
                                    position: "relative",
                                    top: "-110px",
                                }}
                            >
                                {copied && (
                                    <span
                                        style={{
                                            color: "white",
                                            position: "absolute",
                                            zIndex: "5",
                                        }}
                                    >
                                        Copied!
                                    </span>
                                )}
                            </Box>
                            Start Collecting Feedback via Multiple Ways
                        </Box>
                        <Grid style={{ color: "white" }} container>
                            <Grid
                                item
                                lg={5.5}
                                md={11}
                                sm={11}
                                xs={11}
                                mx="auto"
                            >
                                <Box
                                    mt={5}
                                    className="form-control"
                                    style={{
                                        display: "flex",
                                        borderColor:
                                            select === "please"
                                                ? "#E2FF66"
                                                : "#626262",
                                        background: medium
                                            ? "black"
                                            : "#161616",
                                        color: "white",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                    }}
                                >
                                    <Box mt={1} ml={1}>
                                        <img src={Correct} alt="" />
                                    </Box>
                                    <Box ml={2}>
                                        <Box>QR Code</Box>
                                        <Box>
                                            Place the QR Code in a visible area
                                            in your
                                        </Box>
                                    </Box>

                                    <CopyToClipboard
                                        text={textToCopy1}
                                        onCopy={handleCopy}
                                    >
                                        <Box
                                            onClick={() => setSelect("please")}
                                            style={{
                                                cursor: "pointer",
                                                marginLeft: medium
                                                    ? ""
                                                    : "105px",
                                                display: "flex",
                                                justifyContent: "flex-end",
                                            }}
                                            mt={1.5}
                                        >
                                            <Box>
                                                <img src={ClipBoard} alt="" />
                                            </Box>
                                        </Box>
                                    </CopyToClipboard>
                                </Box>
                                <Box
                                    mt={3}
                                    className="form-control"
                                    style={{
                                        display: "flex",
                                        borderColor:
                                            select === "share"
                                                ? "#E2FF66"
                                                : "#626262",
                                        background: medium
                                            ? "black"
                                            : "#161616",
                                        color: "white",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                    }}
                                >
                                    <Box mt={1}>
                                        <img src={Correct} alt="" />
                                    </Box>
                                    <Box ml={3}>
                                        <Box>Share Link</Box>
                                        <Box>
                                            Send the Survey to your customer
                                            base.
                                        </Box>
                                    </Box>
                                    <Box
                                        style={{
                                            display: "flex",
                                            borderColor:
                                                select === "share"
                                                    ? "#E2FF66"
                                                    : "#626262",
                                            justifyContent: "flex-end",
                                            marginLeft: "120px",
                                            cursor: "pointer",
                                        }}
                                        mt={1.5}
                                        // ml={5}
                                    >
                                        <CopyToClipboard
                                            text={textToCopy2}
                                            onCopy={handleCopy}
                                        >
                                            <Box
                                                onClick={() =>
                                                    setSelect("share")
                                                }
                                            >
                                                <img src={ClipBoard} alt="" />
                                            </Box>
                                        </CopyToClipboard>
                                    </Box>
                                </Box>
                                <Box
                                    mt={3}
                                    className="form-control"
                                    style={{
                                        display: "flex",
                                        borderColor:
                                            select === "pop"
                                                ? "#E2FF66"
                                                : "#626262",
                                        background: medium
                                            ? "black"
                                            : "#161616",
                                        color: "white",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                    }}
                                >
                                    <Box mt={1} ml={1}>
                                        <img src={Correct} alt="" />
                                    </Box>
                                    <Box ml={3}>
                                        <Box>
                                            Add the Snippet code to your website
                                            or App
                                        </Box>
                                        <Box>
                                            Place the code in your main page and
                                            the survey will pop out to the
                                            customers every two weeks.
                                        </Box>
                                    </Box>
                                    <CopyToClipboard
                                        text={textToCopy3}
                                        onCopy={handleCopy}
                                    >
                                        <Box
                                            onClick={() => setSelect("pop")}
                                            style={{ cursor: "pointer" }}
                                            mt={2.5}
                                            ml={1}
                                        >
                                            {" "}
                                            <img src={ClipBoard} alt="" />
                                        </Box>
                                    </CopyToClipboard>
                                </Box>{" "}
                                <Box mt={5}>
                                    <button
                                        onClick={() => setPage("Question2")}
                                        style={{
                                            fontWeight: "bold",
                                            background: "#E2FF65",
                                            color: "#152642",
                                            padding: "15px",
                                            borderStyle: "none",
                                            borderRadius: "8px",
                                        }}
                                        className="form-control"
                                    >
                                        Configuration
                                    </button>
                                </Box>
                                <Box
                                    mt={4}
                                    style={{
                                        borderColor: "#E2FF66",
                                        background: "#161616",
                                        color: "#E2FF66",
                                        textAlign: "center",
                                        fontWeight: "bold",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                    }}
                                    className="form-control"
                                    onClick={handleClick}
                                >
                                    Dashboard
                                </Box>
                            </Grid>
                            <Grid item lg={0.5} md={0} sm={0} xs={0} mx="auto">
                                <Box
                                    style={{ display: medium ? "none" : "" }}
                                    mt={4}
                                >
                                    <img src={line} alt="" />
                                </Box>
                            </Grid>
                            <Grid
                                style={{ textAlign: "center" }}
                                item
                                lg={4}
                                md={11}
                                sm={11}
                                mx="auto"
                            >
                                {/* <Box mt={5}>
                                    <img src={QR} alt="" />
                                </Box> */}
                                <Box mt={5}>
                                    <div style={containerStyle}>
                                        <QRCode
                                            size={210}
                                            bgColor="white"
                                            fgColor="black"
                                            value={`http://192.168.29.152:8000/feedback/${base64EncodedEncryptedId}`}
                                        />
                                    </div>
                                </Box>
                                {/* </Box> */}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default QRFeedback;
