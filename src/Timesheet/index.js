import React, { useEffect, useState } from "react";
import axios from "axios";
import * as client from "../client/timesheetsClient"
import { FcPlus } from "react-icons/fc";
import { FaTrashCan } from "react-icons/fa6";

import TimesheetCard from "./TimesheetCard";

// Component that displays a timesheet
function Timesheet() {

    // setting up test to fetch from server
    const [testMsg, setTestMsg] = useState();
    const fetchTest = async () => {
        const timesheet = {
            "id": "",
            "userId": 0,
            "rate": 13,
            "lineItems": [{ "name": "lineitem1" }, { "name": "lineitem2" }]
        };
        const results = await client.getAllTimesheets(timesheet);
        setTestMsg(results);
    }

    // firebase functions
    const getAllTimesheets = async () => {
        try {
            const response = await client.getAllTimesheets();
            setTimesheets(response);
        } catch (err) {
            // setError(err.response.data.message);
        }
    }
    const createTimesheetinFirebase = async () => {
        try {
            const response = await client.createTimesheet(timesheet);
            return response;
        } catch (err) {
            // setError(err.response.data.message);
        }
    }
    const deleteTimesheetInFirebase = async (id) => {
        try {
            await client.deleteTimesheet(id);
            setTimesheets(timesheets.filter(
                (timesheet) => timesheet.id !== id));
        } catch (err) {
            // setError(err.response.data.message);
        }
    }

    // setup all timesheets
    const [timesheets, setTimesheets] = useState([]);

    // setup blank timesheet, used for creating new timesheets
    const [timesheet, setTimesheet] = useState({
        id: "",
        rate: 0,
        userId: 0,
        lineItems: [],
        name: "",
        description: ""
    })
    // dynamic lineItem inside new timesheets
    const [newLineItem, setNewLineItem] = useState({
        date: "",
        minutes: 0
    });

    // helper functions
    const addLineItemToTimesheet = () => {
        setTimesheet({
            ...timesheet,
            lineItems: [...timesheet.lineItems, newLineItem]
        })
    }

    const addTimesheetToTimesheets = async () => {
        var newId = await createTimesheetinFirebase(timesheet);
        setTimesheets([...timesheets, { ...timesheet, id: newId }]);
    }
    const calculateTotalMinutes = (lineItems) => {
        return lineItems.reduce((n, { minutes }) => n + minutes, 0);
    }

    useEffect(() => {
        fetchTest();
        getAllTimesheets();
    }, []);

    return (
        <>
            <h1>Your timesheets</h1>

            <div className="d-flex flex-wrap">

                {/* STORED TIMESHEET CARDS */}
                {timesheets.map((timesheet) => {
                    return (
                        <div class="ts-newtimesheet card" >
                            <div class="card-body">
                                <fieldset disabled>
                                    <div class="input-group">
                                        <span class="input-group-text" >Title </span>
                                        <input
                                            className="form-control"
                                            id="name"
                                            value={timesheet.name}
                                            placeholder="Job Project"
                                            onChange={(e) => setTimesheet({
                                                ...timesheet,
                                                name: e.target.value
                                            })} />
                                    </div>
                                    <hr />

                                    {timesheet.lineItems.map((lineitem) => (
                                        <div className="w-100 input-group">
                                            <span class="input-group-text" >Date </span>
                                            <input type="date"
                                                className="form-control"
                                                value={lineitem.date}
                                                onChange={(e) => setNewLineItem({
                                                    ...lineitem,
                                                    date: e.target.value
                                                })} />
                                            <span class="input-group-text" >Time </span> <input type="number"
                                                className="form-control"
                                                value={lineitem.minutes}
                                                onChange={(e) => setNewLineItem({
                                                    ...lineitem,
                                                    minutes: e.target.value
                                                })} />
                                            <span class="input-group-text" >mins </span>
                                        </div>
                                    ))}

                                    <hr />

                                    <div className=" input-group">
                                        <span class="input-group-text" >Rate </span>
                                        <input type="number"
                                            value={timesheet.rate}
                                            onChange={(e) => setTimesheet({
                                                ...timesheet,
                                                rate: e.target.value
                                            })} />
                                        <span class="input-group-text" >$/ min </span>
                                    </div>
                                    Total minutes: {calculateTotalMinutes(timesheet.lineItems)} <br />
                                    Total cost: {timesheet.rate * calculateTotalMinutes(timesheet.lineItems)} <br />
                                    <label for="description-textarea" class="form-label">description:</label>
                                    <textarea class="form-control" id="description-textarea" rows="1"
                                        value={timesheet.description}
                                        onChange={(e) => setTimesheet({
                                            ...timesheet,
                                            description: e.target.value
                                        })} />
                                    <br />
                                </fieldset >
                                <button type="button" className="btn btn-danger" onClick={() => deleteTimesheetInFirebase(timesheet.id)}>
                                    <FaTrashCan /></button>
                            </div>
                        </div>
                    )
                })}

                {/* NEW TIMESHEET CARD */}
                <div class="ts-newtimesheet card" >
                    <div class="card-body">
                        new
                        <div class="input-group">
                            <span class="input-group-text" >Title </span>
                            <input
                                className="form-control"
                                id="name"
                                value={timesheet.name}
                                placeholder="Project XYZ"
                                onChange={(e) => setTimesheet({
                                    ...timesheet,
                                    name: e.target.value
                                })} />
                        </div>
                        <hr />

                        {timesheet.lineItems.map((lineitem) => (
                            <div className="w-100 input-group">
                                <span class="input-group-text" >Date </span>
                                <input type="date"
                                    className="form-control"
                                    value={lineitem.date}
                                    onChange={(e) => setNewLineItem({
                                        ...lineitem,
                                        date: e.target.value
                                    })} />
                                <span class="input-group-text" >Time </span> <input type="number"
                                    className="form-control"
                                    value={lineitem.minutes}
                                    onChange={(e) => setNewLineItem({
                                        ...lineitem,
                                        minutes: e.target.value
                                    })} />
                                <span class="input-group-text" >mins </span>
                            </div>
                        ))}
                        <div className="ts-addlineitem w-100 input-group">
                            <span class="input-group-text" >Date </span>
                            <input type="date"
                                className="form-control"
                                value={newLineItem.date}
                                onChange={(e) => setNewLineItem({
                                    ...newLineItem,
                                    date: e.target.value
                                })} />
                            <span class="input-group-text" >Time </span> <input type="number"
                                className="form-control"
                                value={setNewLineItem.minutes}
                                onChange={(e) => setNewLineItem({
                                    ...setNewLineItem,
                                    minutes: e.target.value
                                })} />
                            <span class="input-group-text" >mins </span>
                            <button type="button" class="btn" onClick={addLineItemToTimesheet}>
                                <FcPlus />
                            </button>
                        </div>

                        <hr />

                        Rate: <input type="number"
                            value={timesheet.rate}
                            onChange={(e) => setTimesheet({
                                ...timesheet,
                                rate: e.target.value
                            })} /> <br />
                        total minutes: {calculateTotalMinutes(timesheet.lineItems)} <br />
                        total cost: {timesheet.rate * calculateTotalMinutes(timesheet.lineItems)} <br />
                        <label for="description-textarea" class="form-label">description:</label>
                        <textarea class="form-control" id="description-textarea" rows="1" placeholder="Enter Description"
                            value={timesheet.description}
                            onChange={(e) => setTimesheet({
                                ...timesheet,
                                description: e.target.value
                            })} />
                        <br />

                        <button type="button" className="btn btn-primary" onClick={addTimesheetToTimesheets}>
                            Save
                        </button>
                    </div>
                </div>

            </div>

            {/* timesheet: <pre>{JSON.stringify(timesheet, null, 2)}</pre> */}
            {/* newLineItem: <pre>{JSON.stringify(newLineItem, null, 2)}</pre> */}
            {/* timesheets: <pre>{JSON.stringify(timesheets, null, 2)}</pre> */}
            {/* <pre>{JSON.stringify(testMsg, null, 2)}</pre> */}
        </>
    )
}

export default Timesheet