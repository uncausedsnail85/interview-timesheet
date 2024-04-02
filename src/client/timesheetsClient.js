import axios from "axios";

const request = axios.create({ // create a configured instance of axios
    withCredentials: true, // turn on cookies
});

export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const TIMESHEETS_API = `${BASE_API}/api/timesheets`;

export const createTimesheet = async(timesheet) => {
    const response = await request.post(`${TIMESHEETS_API}`, timesheet);
    // console.log(JSON.stringify(response.data))
    return response.data;
}

export const updateTimesheet = async(timesheet) => {
    const response = await request.put(`${TIMESHEETS_API}`, timesheet);
    return response.data;
}

export const deleteTimesheet = async(id) => {
    const response = await request.delete(`${TIMESHEETS_API}/${id}`);
    return response.data;
}

export const getAllTimesheets = async() => {
    const response = await request.get(`${TIMESHEETS_API}`);
    // console.log(JSON.stringify(response.data));
    return response.data;
}

export const getTimesheet = async(timesheet, id) => {
    const response = await request.get(`${TIMESHEETS_API}/${id}`, timesheet);
    return response.data;
}