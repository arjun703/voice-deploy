import React, { useState, createContext, useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import Login from "../components/Login";
import Dashboard from "../pages/Dashboard";
import FeedbackRating from "../pages/FeedbackRating";
import FeedbackQuestion1 from "../pages/FeedbackQuestion1";
import FeedbackQuestion2 from "../pages/FeedbackQuestion2";
import FeedbackQuestion3 from "../pages/FeedbackQuestion3";
import ThankYou from "../pages/ThankYou";
import store from "../Store";
import CreateNPS from "../pages/Dashboard";
import Surveys from "../pages/Surveys";
import OpenEnded from "../pages/OpenEnded";
import Mcq from "../pages/Mcq";
import Question4 from "../pages/Question4";
import Response from "../pages/Response";
import Response1 from "../pages/Response1";
import Check from "../pages/Check";
import "./App.css";
const UserContext = createContext();

function App() {
    const [userData, setUserData] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Login
                                    setIsLoggedIn={setIsLoggedIn}
                                    login={Login}
                                />
                            }
                        />
                        <Route
                            path="/dashboard"
                            element={
                                <Dashboard setIsLoggedIn={setIsLoggedIn} />
                            }
                        />

                        <Route path="/create" element={<CreateNPS />} />
                        <Route path="/surveys" element={<Surveys />} />
                        <Route
                            path="/feedback/:userSurveyId"
                            element={<FeedbackRating />}
                        />
                        <Route
                            path="/feedbackQ/:userSurveyId"
                            element={<FeedbackQuestion1 />}
                        />
                        <Route
                            path="/feedbackQ2/:userSurveyId"
                            element={<FeedbackQuestion2 />}
                        />
                        <Route
                            path="/feedbackQ3/:userSurveyId"
                            element={<FeedbackQuestion3 />}
                        />
                        <Route path="/thankyou" element={<ThankYou />} />
                        <Route path="/check" element={<Check />} />

                        <Route path="/Open" element={<OpenEnded />} />
                        <Route path="/mcq" element={<Mcq />} />
                        <Route path="/question1" element={<Question4 />} />
                        <Route path="/response1" element={<Response />} />

                        <Route
                            path="/response/:surveyId"
                            element={<Response1 />}
                        />
                    </Routes>
                </BrowserRouter>
            </Provider>
        </UserContext.Provider>
    );
}

export { UserContext };

if (document.getElementById("app")) {
    createRoot(document.getElementById("app")).render(<App />);
	console.log("hello")
}else{
alert('id does not exist')
}
