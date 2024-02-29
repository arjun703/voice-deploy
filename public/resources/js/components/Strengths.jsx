import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import graph from "../components/Assets/Images/graph.png";
import axios from "axios";

const Strengths = ({ mcqSubheading, questionId }) => {
    const [option, setOption] = useState([]);
    const [final, setFinal] = useState("");
    const [totalCount, setTotalCount] = useState([]);

    const [newoption, setNewOption] = useState([]);

    let mcqSubheadingno;
    if (mcqSubheading) {
        mcqSubheadingno = mcqSubheading.length;
    }

    const optionno = option.length;
    const datafinal = mcqSubheadingno - optionno;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `/api/singleQuestions/${questionId}`
                );
                if (response.data && response.data.questionData) {
                    const questionData = response.data.questionData;

                    let totalCount = 0;
                    questionData.forEach((item) => {
                        totalCount += item.count;
                    });
                    const updatedOptions = questionData.map((item) => ({
                        ...item,
                        percentage: (item.count / totalCount) * 100,
                    }));
                    setOption(updatedOptions);
                    setTotalCount(totalCount);
                } else {
                    console.error("Data format is not as expected.");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [questionId]);

    return (
        <>
            <Box
                mt={5}
                style={{
                    backgroundColor: "black",

                    borderRadius: "10px",
                    padding: "20px",
                    width: "98%",
                }}
            >
                <Box
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Box
                        style={{
                            fontWeight: "500",
                            fontSize: "22px",
                            color: "white",
                        }}
                    >
                        Strength & Weakness
                    </Box>
                    <Box style={{ color: "white" }}>
                        <CiMenuKebab />
                    </Box>
                </Box>

                <Box
                    style={{
                        fontWeight: "12px",
                        fontWeight: "500",
                        color: "white",
                    }}
                >
                    {" "}
                    Based on the factors
                </Box>
                <Grid container>
                    <Grid item lg={4}>
                        {" "}
                        <Box>
                            <img style={{ width: "100%" }} src={graph} alt="" />
                        </Box>
                    </Grid>
                    <Grid item lg={8}>
                        <Box
                            mt={5}
                            style={{
                                textAlign: "center",
                                alignItems: "center",
                                width: "100%",
                            }}
                        >
                            <Box
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Box>
                                    {Array.isArray(mcqSubheading) &&
                                        mcqSubheading.map((item, i) =>
                                            Array.isArray(item) ? (
                                                <Box
                                                    key={i}
                                                    mt={2}
                                                    style={{
                                                        color: "grey",
                                                        padding: "2px 22px",
                                                        backgroundColor:
                                                            "#393838",
                                                        color: "white",
                                                        textAlign: "center",
                                                        borderRadius: "15px",
                                                        fontSize: "13px",
                                                    }}
                                                >
                                                    {item[0]}
                                                </Box>
                                            ) : null
                                        )}

                                    {/* {mcqSubheading.map((item, index) => {
                                        if (Array.isArray(item)) {
                                            return (
                                                <div key={index}>{item[0]}</div>
                                            );
                                        } else {
                                            return (
                                                <div key={index}>{item}</div>
                                            );
                                        }
                                    })} */}
                                </Box>
                                <Box>
                                    {mcqSubheading &&
                                        option.map((item, i) => (
                                            <Box
                                                key={i}
                                                mt={2}
                                                mx="auto"
                                                style={{
                                                    backgroundColor: "green",
                                                    height: "7px",
                                                    borderRadius: "8px",
                                                    marginLeft: "20px",
                                                    marginTop: "25px",
                                                    width: `${
                                                        item.count * 2
                                                    }vw`,
                                                }}
                                            ></Box>
                                        ))}
                                </Box>
                                <Box>
                                    {mcqSubheading &&
                                        option.map((item, i) => (
                                            <Box
                                                key={i}
                                                mt={2}
                                                style={{
                                                    color: "white",
                                                    marginLeft: "15px",
                                                }}
                                            >
                                                {`${
                                                    item.percentage % 1 === 0
                                                        ? item.percentage
                                                        : item.percentage.toFixed(
                                                              2
                                                          )
                                                }%`}{" "}
                                            </Box>
                                        ))}
                                    {Array.from(
                                        { length: datafinal },
                                        (_, i) => (
                                            <Box
                                                key={i}
                                                mt={2}
                                                style={{
                                                    color: "white",
                                                    marginLeft: "15px",
                                                }}
                                            >
                                                0%
                                            </Box>
                                        )
                                    )}
                                    {/* {final.map((number, index) => (
                                        <Box
                                            key={index}
                                            mt={2}
                                            style={{
                                                color: "white",
                                                marginLeft: "15px",
                                            }}
                                        >
                                            0%
                                        </Box>
                                    ))} */}
                                </Box>
                            </Box>
                            {/* <Box style={{ display: "flex" }}>
                                <Box
                                    mt={2}
                                    mx="auto"
                                    style={{
                                        backgroundColor: "grey",
                                        height: "7px",
                                        borderRadius: "8px",
                                        marginLeft: "20px",
                                        width: "20px",
                                    }}
                                ></Box>
                                <Box mt={2} style={{ color: "white" }}>
                                    0%
                                </Box>
                            </Box>
                            {mcqSubheading.map((item, i) => (
                                <Grid
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                    container
                                >
                                    <Grid item lg={3.5}>
                                        <Box
                                            mt={2}
                                            style={{
                                                color: "grey",
                                                padding: "2px 22px",
                                                backgroundColor: "#393838",
                                                color: "white",
                                                textAlign: "center",
                                                borderRadius: "15px",
                                                fontSize: "13px",
                                            }}
                                        >
                                            {item}
                                        </Box>
                                    </Grid>

                                    <Grid item lg={8}>
                                        {" "}
                                        <Box
                                            mt={2}
                                            mx="auto"
                                            style={{
                                                backgroundColor: "grey",
                                                height: "7px",
                                                borderRadius: "8px",
                                                marginLeft: "20px",
                                                width: "60px",
                                            }}
                                        ></Box>
                                    </Grid>

                                    <Grid item lg={0.5}>
                                        <Box mt={2} style={{ color: "white" }}>
                                            0%
                                        </Box>
                                    </Grid>
                                </Grid>
                            ))} */}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Strengths;
