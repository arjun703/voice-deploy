import { React, useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Grid, Box, useMediaQuery, useTheme } from "@mui/material";
import SearchBar from "../components/ResuableComponent/SearchBar";
import RightNavBar from "../components/ResuableComponent/RightNavbar";
import axios from "axios";
import { IoMdContacts } from "react-icons/io";
import { FaArrowUpLong, FaArrowDownLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import Strengths from "../components/Strengths";
import CountriesTable from "../components/CountriesTable";
import { LuCalendarDays } from "react-icons/lu";
import { Bar } from "react-chartjs-2";
import { FiFilter } from "react-icons/fi";
import {
    Chart as ChartJs,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import feedback from "../components/Assets/Images/feedback.png";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

ChartJs.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
ChartJs.defaults.plugins.legend.display = false;
ChartJs.defaults.backgroundColor = "#9BD0F5";
const Response1 = () => {
    const { surveyId } = useParams();
    const location = useLocation();
    const [mcqSubheading, setMcqSubheading] = useState([]);
    const [questionId, setQuestionId] = useState([]);
    // const { surveyId } = location.state.surveyId && location.state;
    // console.log("Survey id", surveyId);
    const theme = useTheme();
    const navigate = useNavigate();
    const medium = useMediaQuery(theme.breakpoints.down("md"));
    const small = useMediaQuery(theme.breakpoints.down("sm"));
    const merchantId = sessionStorage.getItem("merchantId");
    const [selectedOptions, setSelectedOptions] = useState([]);

    const [ratingData, setRatingData] = useState("");
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);
    const [percentage1to5, setPercentage1to5] = useState("");
    const [percentage6to7, setPercentage6to7] = useState("");
    const [percentage8to10, setPercentage8to10] = useState("");

    const [option, setOption] = useState("");
    const [option1, setOption1] = useState("");
    const [update, setUpdate] = useState("0");
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const [calendar, setCalendar] = useState("");
    const [changetheme, setChangeTheme] = useState("");

    const [rating, setRating] = useState("");
    const [monthData, setMonthData] = useState([]);
    const [monthData1, setMonthData1] = useState([]);
    const [monthData2, setMonthData2] = useState([]);
    const [newdata, setNewData] = useState([]);

    const [showDateRange, setShowDateRange] = useState(false);
    const [filter, setFilter] = useState([]);
    const [dateState, setDateState] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: "selection",
        },
    ]);
    const currentDate = dayjs();
    const handleStartDateChange = (newDate) => {
        setStartDate(newDate);
        if (endDate !== "") {
            handleDateRangeChange(newDate, endDate);
        }
    };

    const handleEndDateChange = (newDate) => {
        setEndDate(newDate);
        if (startDate !== "") {
            handleDateRangeChange(startDate, newDate);
        }
    };

    const handleDateRangeChange = (startDate, endDate) => {
        axios
            .get(
                `/api/dateFilter?merchantId=${merchantId}&startDate=${startDate.format(
                    "YYYY-MM-DD"
                )}&endDate=${endDate.format("YYYY-MM-DD")}`
            )
            .then((response) => {
                if (response.data.length == 0) {
                    setRating(0);
                    setRatingData(0);
                    setMcqSubheading(null);
                }
                const numericResponses = response.data.map(
                    (details) => details.numericResponse
                );
                const nonZeroResponses = numericResponses.filter(
                    (response) => response !== "0"
                );

                const nonZeroCount = nonZeroResponses.length;

                const count1to5 = nonZeroResponses.filter(
                    (response) => response >= 1 && response <= 5
                ).length;
                const count6to7 = nonZeroResponses.filter(
                    (response) => response >= 6 && response <= 7
                ).length;
                const count8to10 = nonZeroResponses.filter(
                    (response) => response >= 8 && response <= 10
                ).length;

                const totalResponses = nonZeroResponses.length;
                const percentage1to5 = (count1to5 / totalResponses) * 100;
                setPercentage1to5(
                    percentage1to5 % 1 === 0
                        ? percentage1to5.toFixed(0) + "%"
                        : Math.round(percentage1to5 * 100) / 100 + "%"
                );
                const percentage6to7 = (count6to7 / totalResponses) * 100;
                setPercentage6to7(
                    percentage6to7 % 1 === 0
                        ? percentage6to7.toFixed(0) + "%"
                        : Math.round(percentage6to7 * 100) / 100 + "%"
                );
                const percentage8to10 = (count8to10 / totalResponses) * 100;
                setPercentage8to10(
                    percentage8to10 % 1 === 0
                        ? percentage8to10.toFixed(0) + "%"
                        : Math.round(percentage8to10 * 100) / 100 + "%"
                );

                for (let i = 0; i < response.data.length; i++) {
                    const detail = response.data[i];

                    if (detail.questionType === "MCQ") {
                        setMcqSubheading(detail.mcqSubheading);
                        setQuestionId(detail.questionId);
                        break;
                    }
                }
                setRating(nonZeroCount);
                setNewData(response.data);
                setRatingData(nonZeroResponses);
            })
            .catch((error) => {
                console.error("Error:", error);
            });

        const fetchGraph = async () => {
            try {
                const response = await axios.get(
                    `/api/displayResponseByMonthFilter?merchantId=${merchantId}&startDate=${startDate.format(
                        "YYYY-MM-DD"
                    )}&endDate=${endDate.format("YYYY-MM-DD")}`
                );
                console.log(response);
                const monthDatas = response.data.monthWiseData.userSurveys1;
                console.log("ugyg", monthDatas);
                const monthDatas1 = response.data.monthWiseData.userSurveys2;
                const monthDatas2 = response.data.monthWiseData.userSurveys3;
                setMonthData(monthDatas);
                setMonthData1(monthDatas1);
                setMonthData2(monthDatas2);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchGraph();
    };

    const handleAllData = async (option) => {
        setIsChecked3(!isChecked3);
        try {
            const response = await axios.get(
                `/api/filterChannel?options=all&merchantId=${merchantId}`
            );
            console.log(response.data);
            const numericResponses = response.data.responseDetails.map(
                (details) => details.numericResponse
            );
            const nonZeroResponses = numericResponses.filter(
                (response) => response !== "0"
            );
            const count1to5 = nonZeroResponses.filter(
                (response) => response >= 1 && response <= 5
            ).length;
            const count6to7 = nonZeroResponses.filter(
                (response) => response >= 6 && response <= 7
            ).length;
            const count8to10 = nonZeroResponses.filter(
                (response) => response >= 8 && response <= 10
            ).length;

            const totalResponses = nonZeroResponses.length;
            const percentage1to5 = (count1to5 / totalResponses) * 100;
            setPercentage1to5(
                percentage1to5 % 1 === 0
                    ? percentage1to5.toFixed(0) + "%"
                    : Math.round(percentage1to5 * 100) / 100 + "%"
            );
            const percentage6to7 = (count6to7 / totalResponses) * 100;
            setPercentage6to7(
                percentage6to7 % 1 === 0
                    ? percentage6to7.toFixed(0) + "%"
                    : Math.round(percentage6to7 * 100) / 100 + "%"
            );
            const percentage8to10 = (count8to10 / totalResponses) * 100;
            setPercentage8to10(
                percentage8to10 % 1 === 0
                    ? percentage8to10.toFixed(0) + "%"
                    : Math.round(percentage8to10 * 100) / 100 + "%"
            );

            const nonZeroCount = nonZeroResponses.length;

            for (let i = 0; i < response.data.responseDetails.length; i++) {
                const detail = response.data.responseDetails[i];

                if (detail.questionType === "MCQ") {
                    setMcqSubheading(detail.mcqSubheading);
                    setQuestionId(detail.questionId);
                    break;
                }
            }
            setRatingData(nonZeroResponses);
            setRating(nonZeroCount);
        } catch (error) {
            console.error("Error:", error);
        }

        const fetchGraphCheckBox1 = async () => {
            try {
                const response = await axios.get(
                    `/api/displayResponseByMonthFilterCheckBox?option=all&merchantId=${merchantId}`
                );
                const monthDatas = response.data.monthWiseData.userSurveys1;
                const monthDatas1 = response.data.monthWiseData.userSurveys2;
                const monthDatas2 = response.data.monthWiseData.userSurveys3;
                setMonthData(monthDatas);
                setMonthData1(monthDatas1);
                setMonthData2(monthDatas2);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchGraphCheckBox1();
    };

    // const handleCheckboxChange = async (option, checked) => {
    //     console.log("option", option);
    //     let updatedOptions;
    //     if (checked) {
    //         updatedOptions = [...selectedOptions, option];
    //     } else {
    //         updatedOptions = selectedOptions.filter((item) => item !== option);
    //         const fetchData = async () => {
    //             try {
    //                 const response = await axios.get(
    //                     `/api/disResponse/${surveyId}`
    //                 );
    //                 const numericResponses = response.data.responseDetails.map(
    //                     (details) => details.numericResponse
    //                 );
    //                 const nonZeroResponses = numericResponses.filter(
    //                     (response) => response !== "0"
    //                 );
    //                 const count1to5 = nonZeroResponses.filter(
    //                     (response) => response >= 1 && response <= 5
    //                 ).length;
    //                 const count6to7 = nonZeroResponses.filter(
    //                     (response) => response >= 6 && response <= 7
    //                 ).length;
    //                 const count8to10 = nonZeroResponses.filter(
    //                     (response) => response >= 8 && response <= 10
    //                 ).length;

    //                 const totalResponses = nonZeroResponses.length;
    //                 const percentage1to5 = (count1to5 / totalResponses) * 100;
    //                 setPercentage1to5(
    //                     percentage1to5 % 1 === 0
    //                         ? percentage1to5.toFixed(0) + "%"
    //                         : Math.round(percentage1to5 * 100) / 100 + "%"
    //                 );
    //                 const percentage6to7 = (count6to7 / totalResponses) * 100;
    //                 setPercentage6to7(
    //                     percentage6to7 % 1 === 0
    //                         ? percentage6to7.toFixed(0) + "%"
    //                         : Math.round(percentage6to7 * 100) / 100 + "%"
    //                 );
    //                 const percentage8to10 = (count8to10 / totalResponses) * 100;
    //                 setPercentage8to10(
    //                     percentage8to10 % 1 === 0
    //                         ? percentage8to10.toFixed(0) + "%"
    //                         : Math.round(percentage8to10 * 100) / 100 + "%"
    //                 );

    //                 const nonZeroCount = nonZeroResponses.length;

    //                 for (
    //                     let i = 0;
    //                     i < response.data.responseDetails.length;
    //                     i++
    //                 ) {
    //                     const detail = response.data.responseDetails[i];

    //                     if (detail.questionType === "MCQ") {
    //                         setMcqSubheading(detail.mcqSubheading);
    //                         setQuestionId(detail.questionId);
    //                         break;
    //                     }
    //                 }
    //                 setRatingData(nonZeroResponses);
    //                 setRating(nonZeroCount);
    //             } catch (error) {
    //                 console.error("Error fetching data:", error);
    //             }

    //             const fetchGraphCheckBox2 = async () => {
    //                 try {
    //                     const response = await axios.get(
    //                         `/api/displayResponseByMonthFilterCheckBox?option=all&merchantId=${merchantId}`
    //                     );
    //                     const monthDatas =
    //                         response.data.monthWiseData.userSurveys1;
    //                     const monthDatas1 =
    //                         response.data.monthWiseData.userSurveys2;
    //                     const monthDatas2 =
    //                         response.data.monthWiseData.userSurveys3;
    //                     setMonthData(monthDatas);
    //                     setMonthData1(monthDatas1);
    //                     setMonthData2(monthDatas2);
    //                 } catch (error) {
    //                     console.error("Error fetching data:", error);
    //                 }
    //             };
    //             fetchGraphCheckBox2();
    //         };

    //         fetchData();
    //     }

    //     setSelectedOptions(updatedOptions);

    //     if (checked) {
    //         try {
    //             const response = await axios.get(
    //                 `/api/filterChannel?option=${updatedOptions.join(
    //                     ","
    //                 )}&merchantId=${merchantId}`
    //             );
    //             console.log(response.data);
    //             const numericResponses = response.data.responseDetails.map(
    //                 (details) => details.numericResponse
    //             );
    //             const nonZeroResponses = numericResponses.filter(
    //                 (response) => response !== "0"
    //             );

    //             const nonZeroCount = nonZeroResponses.length;
    //             if (response.data.responseDetails.length !== 0) {
    //                 for (
    //                     let i = 0;
    //                     i < response.data.responseDetails.length;
    //                     i++
    //                 ) {
    //                     const detail = response.data.responseDetails[i];

    //                     if (detail.questionType === "MCQ") {
    //                         setMcqSubheading(detail.mcqSubheading);
    //                         setQuestionId(detail.questionId);
    //                         console.log("object", detail.questionType);
    //                         console.log("object1", detail.mcqSubheading);

    //                         break;
    //                     }
    //                 }
    //             } else {
    //                 setRating(0);
    //                 setRatingData(0);
    //                 setMcqSubheading(null);
    //             }
    //             setNewData(response.data.responseDetails);
    //             console.log("mk", mcqSubheading);
    //             setRatingData(nonZeroResponses);
    //             setRating(nonZeroCount);
    //         } catch (error) {
    //             console.error("Error:", error);
    //         }

    //         const fetchGraphCheckBox = async () => {
    //             try {
    //                 const response = await axios.get(
    //                     `/api/displayResponseByMonthFilterCheckBox?option=${updatedOptions.join(
    //                         ","
    //                     )}&merchantId=${merchantId}`
    //                 );
    //                 console.log(response);
    //                 const monthDatas = response.data.monthWiseData.userSurveys1;
    //                 const monthDatas1 =
    //                     response.data.monthWiseData.userSurveys2;
    //                 const monthDatas2 =
    //                     response.data.monthWiseData.userSurveys3;
    //                 setMonthData(monthDatas);
    //                 setMonthData1(monthDatas1);
    //                 setMonthData2(monthDatas2);
    //             } catch (error) {
    //                 console.error("Error fetching data:", error);
    //             }
    //         };
    //         fetchGraphCheckBox();
    //     }
    // };



    const handleCheckboxChange = async (option, checked) => {
        console.log(option);
    
        // Check if "all" checkbox is checked or any other checkbox is checked
        if ((option === "all" && checked) && (option !== "all" && checked)) {
            handleAllData(); // Execute handleAllData() if "all" checkbox is checked or any other checkbox is checked
            return;
        }
    
        // Handle other checkboxes if "all" checkbox is not checked
        let updatedOptions;
        if (checked) {
            updatedOptions = [...selectedOptions, option];
        } else {
            updatedOptions = selectedOptions.filter((item) => item !== option);
        }
        setSelectedOptions(updatedOptions);
    
        try {
            let response;
    
            // Fetch data based on updatedOptions
            if (updatedOptions.length > 0) {
                response = await axios.get(
                    `/api/filterChannel?option=${updatedOptions.join(",")}&merchantId=${merchantId}`
                );
                fetchGraphCheckBox(updatedOptions); // Assuming this function handles graph updates
            } else {
                response = await axios.get(`/api/disResponse/${surveyId}`);
                const responseGraph = await axios.get(
                    `/api/displayResponseByMonth/${surveyId}`
                );
                console.log(responseGraph);
                const monthDatas = responseGraph.data.monthWiseData.userSurveys1;
                const monthDatas1 = responseGraph.data.monthWiseData.userSurveys2;
                const monthDatas2 = responseGraph.data.monthWiseData.userSurveys3;
                setMonthData(monthDatas);
                setMonthData1(monthDatas1);
                setMonthData2(monthDatas2);
            }
    
            console.log(response.data);
            const numericResponses = response.data.responseDetails.map(
                (details) => details.numericResponse
            );
            const nonZeroResponses = numericResponses.filter(
                (response) => response !== "0"
            );
            const count1to5 = nonZeroResponses.filter(
                (response) => response >= 1 && response <= 5
            ).length;
            const count6to7 = nonZeroResponses.filter(
                (response) => response >= 6 && response <= 7
            ).length;
            const count8to10 = nonZeroResponses.filter(
                (response) => response >= 8 && response <= 10
            ).length;
    
            const totalResponses = nonZeroResponses.length;
            const percentage1to5 = (count1to5 / totalResponses) * 100;
            setPercentage1to5(
                percentage1to5 % 1 === 0
                    ? percentage1to5.toFixed(0) + "%"
                    : Math.round(percentage1to5 * 100) / 100 + "%"
            );
            const percentage6to7 = (count6to7 / totalResponses) * 100;
            setPercentage6to7(
                percentage6to7 % 1 === 0
                    ? percentage6to7.toFixed(0) + "%"
                    : Math.round(percentage6to7 * 100) / 100 + "%"
            );
            const percentage8to10 = (count8to10 / totalResponses) * 100;
            setPercentage8to10(
                percentage8to10 % 1 === 0
                    ? percentage8to10.toFixed(0) + "%"
                    : Math.round(percentage8to10 * 100) / 100 + "%"
            );
    
            const nonZeroCount = nonZeroResponses.length;
    
            for (let i = 0; i < response.data.responseDetails.length; i++) {
                const detail = response.data.responseDetails[i];
    
                if (detail.questionType === "MCQ") {
                    setMcqSubheading(detail.mcqSubheading);
                    setQuestionId(detail.questionId);
                    break;
                }
            }
            setRatingData(nonZeroResponses);
            setRating(nonZeroCount);
    
        } catch (error) {
            console.error("Error:", error);
        }
    };
    
    
    const fetchGraphCheckBox = async (updatedOptions) => {
        try {
            const response = await axios.get(
                `/api/displayResponseByMonthFilterCheckBox?option=${updatedOptions.join(",")}&merchantId=${merchantId}`
            );
            console.log(response);
            const monthDatas = response.data.monthWiseData.userSurveys1;
            const monthDatas1 = response.data.monthWiseData.userSurveys2;
            const monthDatas2 = response.data.monthWiseData.userSurveys3;
            setMonthData(monthDatas);
            setMonthData1(monthDatas1);
            setMonthData2(monthDatas2);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    
    
    
    
    
    


























    useEffect(() => {
        (async () => {
            try {
                const result = await axios(`/api/disResponse/${surveyId}`);
                const firstTenData = result.data.responseDetails.slice(0, 5);
                setNewData(firstTenData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        })();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `/api/disResponse/${surveyId}`
                );
                const numericResponses = response.data.responseDetails.map(
                    (details) => details.numericResponse
                );
                const nonZeroResponses = numericResponses.filter(
                    (response) => response !== "0"
                );
                const count1to5 = nonZeroResponses.filter(
                    (response) => response >= 1 && response <= 5
                ).length;
                const count6to7 = nonZeroResponses.filter(
                    (response) => response >= 6 && response <= 7
                ).length;
                const count8to10 = nonZeroResponses.filter(
                    (response) => response >= 8 && response <= 10
                ).length;

                const totalResponses = nonZeroResponses.length;
                const percentage1to5 = (count1to5 / totalResponses) * 100;
                setPercentage1to5(
                    percentage1to5 % 1 === 0
                        ? percentage1to5.toFixed(0) + "%"
                        : Math.round(percentage1to5 * 100) / 100 + "%"
                );
                const percentage6to7 = (count6to7 / totalResponses) * 100;
                setPercentage6to7(
                    percentage6to7 % 1 === 0
                        ? percentage6to7.toFixed(0) + "%"
                        : Math.round(percentage6to7 * 100) / 100 + "%"
                );
                const percentage8to10 = (count8to10 / totalResponses) * 100;
                setPercentage8to10(
                    percentage8to10 % 1 === 0
                        ? percentage8to10.toFixed(0) + "%"
                        : Math.round(percentage8to10 * 100) / 100 + "%"
                );

                const nonZeroCount = nonZeroResponses.length;

                for (let i = 0; i < response.data.responseDetails.length; i++) {
                    const detail = response.data.responseDetails[i];

                    if (detail.questionType === "MCQ") {
                        setMcqSubheading(detail.mcqSubheading);
                        setQuestionId(detail.questionId);
                        break;
                    }
                }
                setRatingData(nonZeroResponses);
                setRating(nonZeroCount);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
        return () => {};
    }, [surveyId]);

    let downArrowPercentage = 0;
    let upArrowPercentage = 0;

    if (ratingData) {
        const lowerRangeResponses = ratingData.filter(
            (response) => response >= 1 && response <= 5
        );
        const upperRangeResponses = ratingData.filter(
            (response) => response >= 6 && response <= 10
        );

        const totalResponses = ratingData.length;
        downArrowPercentage =
            (lowerRangeResponses.length / totalResponses) * 100;
        upArrowPercentage = (upperRangeResponses.length / totalResponses) * 100;
    }

    let lowerDatasets = [];
    let mediumDatasets = [];
    let highDatasets = [];
    const countOfLowerRatings = "";

    if (ratingData) {
        lowerDatasets = ratingData.filter(
            (dataset) => dataset >= 1 && dataset <= 5
        );
        const countOfLowerRatings = lowerDatasets.length;
        mediumDatasets = ratingData.filter(
            (dataset) => dataset >= 6 && dataset <= 7
        );

        highDatasets = ratingData.filter(
            (dataset) => dataset >= 8 && dataset <= 10
        );
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `/api/displayResponseByMonth/${surveyId}`
                );
                const monthDatas = response.data.monthWiseData.userSurveys1;

                const monthDatas1 = response.data.monthWiseData.userSurveys2;
                const monthDatas2 = response.data.monthWiseData.userSurveys3;
                setMonthData(monthDatas);
                setMonthData1(monthDatas1);
                setMonthData2(monthDatas2);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

        return () => {};
    }, []);

    const monthDatas = monthData;
    const countValues = Array(12).fill(0);
    monthDatas.forEach((dataPoint) => {
        const { count, month } = dataPoint;
        if (count > 0) {
            countValues[month - 1] += count;
        }
    });

    const monthDatas1 = monthData1;
    const counttValues1 = Array(12).fill(0);
    monthDatas1.forEach((dataPoint) => {
        const { count, month } = dataPoint;
        if (count > 0) {
            counttValues1[month - 1] += count;
        }
    });

    const monthDatas2 = monthData2;
    const counttValues2 = Array(12).fill(0);
    monthDatas2.forEach((dataPoint) => {
        const { count, month } = dataPoint;
        if (count > 0) {
            counttValues2[month - 1] += count;
        }
    });

    const data = {
        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "June",
            "July",
            "Aug",
            "Sepr",
            "Oct",
            "Nov",
            "Dec",
        ],

        datasets: [
            {
                label: "1-5",
                data: countValues,
                backgroundColor: "#F25042",
            },
            {
                label: "6-7",
                data: counttValues1,
                backgroundColor: "#F9BC60",
                Color: "white",
            },
            {
                label: "8-10",
                data: counttValues2,
                backgroundColor: "#2CB67D",
            },
        ],
    };

    const options = {
        legend: {
            display: false,
        },
        elements: {
            point: {
                radius: 1,
            },
        },
        scales: {
            x: {
                border: {
                    dash: [1, 1],
                },
                grid: {
                    color: "#6c757d",
                },

                stacked: true,
            },
            y: {
                border: {
                    dash: [1, 1, 1, 1],
                },
                grid: {
                    color: "#6c757d",
                },

                stacked: true,
            },
        },
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
                                marginBottom: "50px",
                            }}
                            item
                            lg={11}
                            md={11}
                            sm={11}
                            xs={11}
                            mx="auto"
                        >
                            <Box style={{ padding: "0px 20px" }}>
                                <Box
                                    onClick={() => {
                                        if (option == "") {
                                            setOption("bunty");
                                            setCalendar("");
                                        } else {
                                            setOption("");
                                        }
                                    }}
                                    ml={2}
                                    style={{
                                        float: "right",
                                        padding: "6px",
                                        marginTop: "-2px",
                                        width: "175px",
                                        border: "1px solid #E2FF66",
                                        backgroundColor: "black",
                                        textAlign: "center",
                                        color: "white",
                                        height: "42px",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                    }}
                                >
                                    <FiFilter /> All Channels
                                </Box>
                                {option === "bunty" && (
                                    <Box
                                        style={{
                                            position: "absolute",
                                            zIndex: 100,
                                            background: "white",
                                            color: "black",
                                            padding: "30px",
                                            right: "130px",
                                            top: "205px",
                                            width: "380px",
                                            backgroundColor: "black",
                                            color: "white",
                                        }}
                                    >
                                        <Box
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <Box>
                                                <h4>Filter</h4>
                                            </Box>
                                            <Box style={{ color: "#E2FF66" }}>
                                                Clear all{" "}
                                            </Box>
                                        </Box>
                                        <Box
                                            style={{
                                                backgroundColor: "grey",
                                                width: "100%",
                                                height: "3px",
                                                borderRadius: "5px",
                                            }}
                                        >
                                            {" "}
                                        </Box>
                                        <Box mt={3}>Channels</Box>
                                        <Box
                                            mt={2}
                                            style={{
                                                border: "1px solid grey",
                                                padding: "20px",
                                            }}
                                        >
                                            <div>
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        value="all"
                                                        onChange={(e) =>
                                                            handleCheckboxChange(
                                                                "all",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                    All Channels
                                                    <br />
                                                    <input
                                                        type="checkbox"
                                                        value="option2"
                                                        onChange={(e) =>
                                                            handleCheckboxChange(
                                                                "option2",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                    option2
                                                    <br />
                                                    <input
                                                        type="checkbox"
                                                        value="option3"
                                                        onChange={(e) =>
                                                            handleCheckboxChange(
                                                                "option3",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                    option3
                                                    <br />
                                                </div>
                                            </div>
                                        </Box>
                                    </Box>
                                )}
                                <div>
                                    <Box
                                        ml={2}
                                        style={{
                                            float: "inline-end",
                                            padding: "6px",
                                            marginTop: "-2px",
                                            width: "175px",
                                            border: "1px solid #E2FF66",
                                            backgroundColor: "black",
                                            textAlign: "center",
                                            color: "white",
                                            height: "42px",
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => {
                                            if (calendar == "") {
                                                setCalendar("digit");
                                                setOption("");
                                                set;
                                            } else {
                                                setCalendar("");
                                            }
                                        }}
                                    >
                                        <LuCalendarDays />
                                        01 Jun - 25 Aug
                                        {/* <input type="date" /> */}
                                    </Box>
                                    {calendar == "digit" && (
                                        <Box
                                            style={{
                                                position: "absolute",
                                                zIndex: 100,
                                                background: "black",
                                                color: "white",
                                                padding: "15px",
                                                right: "136px",
                                                top: "205px",
                                                borderRadius: "10px",
                                                width: "366px",
                                                height: "140px",
                                                paddingTop: "32px",
                                            }}
                                        >
                                            <Box
                                                style={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-between",
                                                }}
                                            >
                                                <LocalizationProvider
                                                    dateAdapter={AdapterDayjs}
                                                >
                                                    <DemoContainer
                                                        components={[
                                                            "MobileDatePicker",
                                                        ]}
                                                    >
                                                        <DemoItem label="Start Date">
                                                            <MobileDatePicker
                                                                onChange={
                                                                    handleStartDateChange
                                                                }
                                                                value={
                                                                    startDate
                                                                }
                                                            />
                                                        </DemoItem>
                                                        <span>
                                                            <FaArrowRightLong />
                                                        </span>
                                                        <DemoItem label="End Date">
                                                            <MobileDatePicker
                                                                onChange={
                                                                    handleEndDateChange
                                                                }
                                                                value={endDate}
                                                                // minDate={
                                                                //     currentDate
                                                                // }
                                                            />
                                                        </DemoItem>
                                                    </DemoContainer>
                                                </LocalizationProvider>

                                                <span></span>
                                            </Box>
                                            
                                        </Box>
                                    )}
                                </div>
                                <Box
                                    // ml={2}
                                    style={{
                                        float: "inline-end",
                                        padding: "6px",
                                        marginTop: "-2px",
                                        width: "175px",
                                        border: "1px solid #E2FF66",
                                        backgroundColor: "black",
                                        textAlign: "center",
                                        color: "white",
                                        height: "42px",
                                        borderRadius: "8px",
                                    }}
                                >
                                    <IoMdContacts /> Segments
                                </Box>
                                <Box
                                    style={{
                                        fontSize: "25px",
                                        color: "white",
                                        width: "80%",
                                        paddingBottom: "20px",
                                    }}
                                >
                                    Net Promoted Score (NPS)
                                </Box>
                                <Grid container>
                                    <Grid item mx="auto" lg={8}>
                                        <Box
                                            style={{
                                                padding: "25px",
                                                background: "black",
                                                width: "98%",
                                                borderRadius: "10px",
                                            }}
                                        >
                                            <Box
                                                style={{
                                                    fontSize: "20px",
                                                    color: "white",
                                                }}
                                            >
                                                NPS
                                            </Box>
                                            <Box
                                                style={{
                                                    color: "white",
                                                    fontWeight: "lighter",
                                                }}
                                            >
                                                Based on status
                                                <Box
                                                    style={{
                                                        float: "inline-end",
                                                        width: "20px",
                                                        backgroundColor:
                                                            "white",
                                                        border: "1px solid white",
                                                        height: "20px",
                                                        borderRadius: "20px",
                                                    }}
                                                ></Box>
                                                <Box
                                                    style={{
                                                        width: "200px",
                                                        padding: "10px",
                                                        border: "1px solid #161616",
                                                        marginTop: "10px",
                                                        borderRadius: "10px",
                                                        backgroundColor:
                                                            "#161616",
                                                    }}
                                                >
                                                    Score
                                                    <Box
                                                        style={{
                                                            fontSize: "18px",
                                                            fontWeight: "500",
                                                        }}
                                                    >
                                                        15.6%{" "}
                                                        <span
                                                            style={{
                                                                position:
                                                                    "absolute",
                                                                left: "auto",
                                                                marginLeft:
                                                                    "14px",
                                                                fontSize:
                                                                    "12px",
                                                                marginTop:
                                                                    "8px",
                                                                color: "#2CB67D",
                                                            }}
                                                        >
                                                            (<FaArrowUpLong />{" "}
                                                            8%)
                                                        </span>{" "}
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <Box
                                                style={{
                                                    color: "white",
                                                    fontWeight: "lighter",
                                                }}
                                            >
                                                <Box
                                                    style={{
                                                        width: "200px",
                                                        padding: "10px",
                                                        border: "1px solid #161616",
                                                        marginTop: "45px",
                                                        borderRadius: "10px",
                                                        backgroundColor:
                                                            "#161616",
                                                        position: "relative",
                                                        top: "-118px",
                                                        left: "233px",
                                                    }}
                                                >
                                                    Responses
                                                    <Box
                                                        style={{
                                                            fontSize: "18px",
                                                            fontWeight: "500",
                                                        }}
                                                    >
                                                        {/* 1,210{" "} */}
                                                        {rating ? rating : 0}
                                                        {/* {downArrowPercentage > 0 && (
                                                    <span
                                                        style={{
                                                            position:
                                                                "absolute",
                                                            left: "auto",
                                                            marginLeft: "14px",
                                                            fontSize: "12px",
                                                            marginTop: "23px",
                                                            color: "red",
                                                        }}
                                                    >
                                                        <FaArrowDownLong />(
                                                        {downArrowPercentage.toFixed(
                                                            2
                                                        )}
                                                        %)
                                                    </span>
                                                )} */}

                                                        {upArrowPercentage >
                                                            0 && (
                                                            <span
                                                                style={{
                                                                    position:
                                                                        "absolute",
                                                                    left: "auto",
                                                                    marginLeft:
                                                                        "14px",
                                                                    fontSize:
                                                                        "12px",
                                                                    marginTop:
                                                                        "8px",
                                                                    color: "#2CB67D",
                                                                }}
                                                            >
                                                                (
                                                                <FaArrowUpLong />
                                                                {upArrowPercentage.toFixed(
                                                                    2
                                                                )}
                                                                %)
                                                            </span>
                                                        )}
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <Box
                                                style={{
                                                    display: "flex",
                                                    marginTop: "-90px",
                                                }}
                                            >
                                                <Box
                                                    style={{
                                                        backgroundColor:
                                                            "#F25042",
                                                        border: "1px solid #F25042",

                                                        width: percentage1to5,
                                                        display:
                                                            percentage1to5 ===
                                                            "0%"
                                                                ? "none"
                                                                : "block",
                                                        borderRadius: "5px",
                                                        height: "6px",
                                                    }}
                                                ></Box>{" "}
                                                &nbsp;
                                                <Box
                                                    style={{
                                                        backgroundColor:
                                                            "#F9BC60",
                                                        border: "1px solid #F9BC60",

                                                        width: percentage6to7,
                                                        display:
                                                            percentage6to7 ===
                                                            "0%"
                                                                ? "none"
                                                                : "block",
                                                        // marginLeft: "215px",
                                                        borderRadius: "5px",
                                                        height: "6px",
                                                    }}
                                                ></Box>{" "}
                                                &nbsp;
                                                <Box
                                                    style={{
                                                        backgroundColor:
                                                            "#2CB67D",
                                                        border: "1px solid #2CB67D",

                                                        width: percentage8to10,
                                                        display:
                                                            percentage8to10 ===
                                                            "0%"
                                                                ? "none"
                                                                : "block",
                                                        borderRadius: "5px",
                                                        height: "6px",
                                                    }}
                                                ></Box>
                                            </Box>

                                            <Box mt={1} mx="auto">
                                                <div
                                                    style={{
                                                        padding: "0px 50px",
                                                        height: "auto",
                                                    }}
                                                >
                                                    <Bar
                                                        data={data}
                                                        options={options}
                                                        height={200}
                                                        width={545} // Set the width of the chart
                                                    ></Bar>
                                                </div>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item lg={4}>
                                        <Box>
                                            <img
                                                style={{
                                                    width: "100%",
                                                    height: "auto",
                                                }}
                                                src={feedback}
                                                alt=""
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Box>
                                    <div
                                        style={{
                                            borderRadius: "15px",
                                            padding: "0 20px",
                                        }}
                                    ></div>
                                    <Strengths
                                        mcqSubheading={mcqSubheading}
                                        questionId={questionId}
                                    />
                                </Box>
                                <Box>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            padding: "5px 37px",
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontWeight: "500",
                                                fontSize: "22px",
                                                color: "white",
                                                padding: "20px",
                                                marginTop: "15px",
                                                marginLeft: "-30px",
                                                paddingBottom: "20px",
                                            }}
                                        >
                                            NPS Feedbacks
                                        </div>
                                        <div
                                            style={{
                                                color: "#D6F550",
                                                marginTop: "45px",
                                                marginLeft: "-30px",
                                                paddingBottom: "20px",
                                            }}
                                        >
                                            View All <FaArrowRightLong />
                                        </div>
                                    </div>
                                    {rating == 0 ? (
                                        <Box
                                            style={{
                                                textAlign: "center",
                                                color: "white",
                                            }}
                                        >
                                            {" "}
                                            <h3>
                                                Sorry no records found !!!{" "}
                                            </h3>{" "}
                                        </Box>
                                    ) : (
                                        <CountriesTable
                                            newdata={newdata}
                                            surveyId={surveyId}
                                            update={update}
                                        />
                                    )}
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Response1;
