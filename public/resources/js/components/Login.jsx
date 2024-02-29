import React, { useState } from "react";
import {
    Grid,
    Box,
    useMediaQuery,
    useTheme,
    InputAdornment,
    IconButton,
    Input,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LOGO from "../components/Assets/Images/LOGO.png";
import Google from "../components/Assets/Images/Google.svg";
import bg from "../components/Assets/Images/bg.svg";
import bgprime from "../components/Assets/Images/bgprime.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const navigate = useNavigate();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    const small = useMediaQuery(theme.breakpoints.down("sm"));

    const [user, setUser] = useState(null);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const isValidEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const login = async (e) => {
        e.preventDefault();

        setFormSubmitted(true);

        if (!form.email.trim()) {
            setError("Email field is required.");
            return;
        }

        if (!form.password.trim()) {
            setError("Password field is required.");
            return;
        }

        if (!isValidEmail(form.email)) {
            setError("Please input a valid email address.");
            return;
        }

        try {
            const response = await axios.post("/api/login", form);
            if (response.data.success) {
                const userData = response.data.user;
                //console.log(userData);
                setUser(userData.id);
                const merchantId = userData.merchantId;
                console.log(merchantId);
                sessionStorage.setItem("userId", userData.id);
                sessionStorage.setItem("merchantId", merchantId);
                navigate("/dashboard", {
                    state: { userId: userData.id, merchantId: merchantId },
                });
                setIsLoggedIn(true);
            } else {
                setError("Invalid email or password. Please try again.");
            }
        } catch (error) {
            setError(error.response.data.message);
        }
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
                }}
                container
            >
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Grid item lg={12} md={12} xs={12} xm={12}>
                        <Box ml={5} pt={4}>
                            <img style={{}} src={LOGO} alt="" />
                        </Box>
                    </Grid>

                    <Grid container>
                        <Grid item lg={5} md={6} sm={9} xs={10} mx="auto">
                            <form
                                onSubmit={login}
                                style={{
                                    color: "white",
                                    background: "#444A2B54",
                                    padding: small
                                        ? "20px 2rem 2rem 2rem"
                                        : "3rem 5rem 5rem 5rem",
                                    borderRadius: "10px",
                                    fontFamily: "Inter",
                                    marginTop: matches ? "3rem" : "0px",
                                }}
                            >
                                <Box>
                                    <h2 style={{ fontSize: "32px" }}>
                                        Welcome{" "}
                                        <span style={{ color: "#D6F551" }}>
                                            {" "}
                                            Back
                                        </span>{" "}
                                    </h2>
                                </Box>
                                <Box style={{ color: "#D3D3D3" }}>
                                    Lorem ipsum dolor sit amet. Id vero facere
                                    et culpa <br /> ea dolores natus
                                </Box>
                                <br />

                                {error && (
                                    <div style={{ color: "red" }}>{error}</div>
                                )}

                                <Box style={{ fontSize: "14px" }} mt={3} mb={1}>
                                    Email
                                </Box>
                                <Box>
                                    <input
                                        style={{
                                            background: "#444A2B54",
                                            color: "white",
                                            borderRadius: "8px",
                                            // lineHeight: "20px",
                                            padding: "10px",
                                            borderColor: "#848484",
                                        }}
                                        value={form.email}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                email: e.target.value,
                                            })
                                        }
                                        type="text"
                                        name="email"
                                        className="form-control"
                                        placeholder="user@gmail.com"
                                    />
                                    {formSubmitted && !form.email.trim() && (
                                        <div style={{ color: "red" }}>
                                            Email field is required.
                                        </div>
                                    )}
                                </Box>
                                <Box style={{ fontSize: "14px" }} mt={3} mb={1}>
                                    Password
                                </Box>
                                <Box>
                                    {" "}
                                    <Input
                                        style={{
                                            background: "#444A2B54",
                                            color: "white",
                                            borderRadius: "8px",
                                            borderColor: "#848484",
                                        }}
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        value={form.password}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                password: e.target.value,
                                            })
                                        }
                                        name="password"
                                        className="form-control"
                                        placeholder="password"
                                        endAdornment={
                                            <InputAdornment position="end">
                                                {" "}
                                                <IconButton
                                                    onClick={
                                                        handleTogglePassword
                                                    }
                                                    edge="end"
                                                >
                                                    {" "}
                                                    {showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}{" "}
                                                </IconButton>{" "}
                                            </InputAdornment>
                                        }
                                    />
                                    {formSubmitted && !form.password.trim() && (
                                        <div style={{ color: "red" }}>
                                            Password field is required.
                                        </div>
                                    )}{" "}
                                </Box>
                                <Box
                                    mt={2}
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Box>
                                        {" "}
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            value=""
                                            id="flexCheckDefault"
                                        ></input>
                                        &nbsp;{" "}
                                        <span
                                            style={{
                                                fontSize: "14px",
                                                color: "#A6A6A6",
                                            }}
                                        >
                                            Remember me{" "}
                                        </span>
                                    </Box>
                                    <Box
                                        style={{
                                            color: "#E2FF66",
                                            fontSize: "14px",
                                        }}
                                    >
                                        Forget Password ?
                                    </Box>
                                </Box>
                                <Box mt={2}>
                                    <button
                                        type="submit"
                                        className="form-control"
                                        style={{
                                            color: "black",
                                            fontWeight: "bold",
                                            background: "#D6F551",
                                            borderStyle: "none",
                                            borderRadius: "8px",
                                        }}
                                    >
                                        Login
                                    </button>
                                </Box>
                                <Box
                                    mt={4}
                                    className="form-control"
                                    style={{
                                        fontWeight: "500",
                                        background: "#444A2B54",
                                        color: "white",
                                        textAlign: "center",
                                        borderRadius: "8px",
                                    }}
                                >
                                    <span style={{ marginRight: "10px" }}>
                                        <img src={Google} alt="" />
                                    </span>{" "}
                                    <span> SignUp with Google</span>
                                </Box>
                                <Box
                                    mt={2}
                                    style={{
                                        textAlign: "center",
                                        color: "#D3D3D3",
                                        fontSize: "14px",
                                    }}
                                >
                                    Not Remember?
                                    <span
                                        style={{
                                            color: "#E2FF66",
                                            fontSize: "14px",
                                        }}
                                    >
                                        {" "}
                                        Sign up
                                    </span>
                                </Box>
                            </form>
                        </Grid>
                        <Grid
                            item
                            lg={12}
                            md={12}
                            sm={12}
                            xs={12}
                            mt={5}
                            style={{
                                // width: "100%",
                                height: matches ? "10vh" : "20vh",
                                backgroundImage: `url(${bgprime})`,
                            }}
                        >
                            <Box>
                                <img
                                    style={{
                                        width: "100%",
                                        // height: "50vh",
                                        paddingTop: "55px",
                                        paddingLeft: "20px",
                                        // position: 'absolute'
                                        // zIndex: "1",
                                        // top: "1rem",
                                        // left: "1rem",
                                    }}
                                    src={bg}
                                    alt=""
                                />
                            </Box>

                            {/* <img
                style={{
                  width: "100%",
                  position: "relative",
                  zIndex: "2",
                  top: "-6rem",
                }}
                src={bg}
                alt=""
              /> */}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default Login;
