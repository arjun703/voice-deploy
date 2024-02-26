import { createSlice } from "@reduxjs/toolkit";
const UiReducer = createSlice({
    name: "ui",
    initialState: {
        survey_id: null,
        number: null,
        question: [],
        heading: [],
        // optionshandle: [],

        questionlen: null,
        currquestion: 0,
        questions1: null,
        createdsurvey_id: null,
        recentquestion_id: null,
    },
    reducers: {
        setSurveyId(state, action) {
            state.survey_id = action.payload;
        },
        setNumberr(state, action) {
            state.number = action.payload;
        },
        setFeedbackQuestionss1(state, action) {
            state.questions1 = action.payload;
        },
        // setRestaurantAtmosphere(state, action) {
        //     state.questions2 = action.payload;
        // },
        // setComment(state, action) {
        //     state.questions3 = action.payload;
        // },
        setQuestionstag(state, action) {
            state.question = action.payload;
        },
        setQuestionLen(state, action) {
            state.question = action.payload;
        },
        setCurrQuestion(state, action) {
            state.currquestion = state.currquestion + action.payload;
        },
        setCreatedsurvey_id(state, action) {
            state.createdsurvey_id = action.payload;
        },
        setRecentquestion_id(state, action) {
            state.recentquestion_id = action.payload;
        },
        setHeading(state, action) {
            state.heading = action.payload;
        },
    },
});
const { actions } = UiReducer;
export const {
    setSurveyId,
    setNumberr,
    setFeedbackQuestionss1,
    setRestaurantAtmosphere,
    setComment,
    setQuestionstag,
    setQuestionLen,
    setCurrQuestion,
    setCreatedsurvey_id,
    setRecentquestion_id,
    setHeading,
} = actions;
export default UiReducer;
