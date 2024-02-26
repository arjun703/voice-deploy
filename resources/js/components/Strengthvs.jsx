import { Box, Grid } from "@mui/material";
import React from "react";
import { CiMenuKebab } from "react-icons/ci";

const Strengths = () => {
    return (
        <>
            <Grid container>
                <Grid item lg={12} mx="auto">
                    <Box
                        mt={5}
                        style={{
                            backgroundColor: "black",
                            marginHorizontal: "auto",
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
                            <Grid item lg={0}></Grid>
                            <Grid item lg={10}>
                                <Box
                                    mt={5}
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        textAlign: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box
                                        // mt={2}
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
                                        Resturant Location
                                    </Box>
                                    <Box
                                        style={{
                                            backgroundColor: "grey",
                                            height: "7px",
                                            width: "75%",
                                            borderRadius: "8px",
                                        }}
                                    ></Box>
                                    <Box style={{ color: "white" }}>25%</Box>
                                </Box>
                                <Box
                                    mt={2}
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        textAlign: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box
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
                                        Resturant Location
                                    </Box>
                                    <Box
                                        style={{
                                            backgroundColor: "grey",
                                            height: "7px",
                                            width: "75%",
                                            borderRadius: "8px",
                                        }}
                                    ></Box>
                                    <Box style={{ color: "white" }}>35%</Box>
                                </Box>
                                <Box
                                    mt={2}
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        textAlign: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box
                                        // mt={2}
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
                                        Resturant Location
                                    </Box>
                                    <Box
                                        style={{
                                            backgroundColor: "grey",
                                            height: "7px",
                                            width: "75%",
                                            borderRadius: "8px",
                                        }}
                                    ></Box>
                                    <Box style={{ color: "white" }}>-5%</Box>
                                </Box>
                                <Box
                                    mt={2}
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        textAlign: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box
                                        // mt={2}
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
                                        Resturant Location
                                    </Box>
                                    <Box
                                        style={{
                                            backgroundColor: "grey",
                                            height: "7px",
                                            width: "75%",
                                            borderRadius: "8px",
                                        }}
                                    ></Box>
                                    <Box style={{ color: "white" }}>15%</Box>
                                </Box>
                                <Box
                                    mt={2}
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        textAlign: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box
                                        // mt={2}
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
                                        Resturant Location
                                    </Box>
                                    <Box
                                        style={{
                                            backgroundColor: "grey",
                                            height: "7px",
                                            width: "75%",
                                            borderRadius: "8px",
                                        }}
                                    ></Box>
                                    <Box style={{ color: "white" }}>5%</Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default Strengths;
