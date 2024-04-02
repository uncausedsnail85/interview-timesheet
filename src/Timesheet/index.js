import React, { useEffect, useState } from "react";
import axios from "axios";
import * as client from "../client/timesheetsClient"
import { FcPlus } from "react-icons/fc";

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

    // setup timesheets
    const [timesheets, setTimesheets] = useState([{
        "id": "",
        "rate": 3,
        "userId": 0,
        "lineItems": [{
            "date": "2024-04-05",
            "minutes": 3
        }],
        "name": "STORED",
        "description": "stored"
    }]);

    // setup blank timesheet, used for creating new timesheets
    const [timesheet, setTimesheet] = useState({
        id: "",
        rate: 0,
        userId: 0,
        lineItems: [],
        name: "",
        description: ""
    })
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
        setTimesheets([...timesheets, timesheet])
    }

    const calculateTotalMinutes = (lineItems) => {
        return lineItems.reduce((n, { minutes }) => n + minutes, 0);
    }

    useEffect(() => {
        fetchTest();
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
                                    <h6>Name: <input
                                        value={timesheet.name}
                                        placeholder="Job Project"
                                        onChange={(e) => setTimesheet({
                                            ...timesheet,
                                            name: e.target.value
                                        })} /></h6>
                                    <hr />

                                    {timesheet.lineItems.map((lineitem) => (
                                        <div className="w-100">
                                            Date <input type="date"
                                                value={lineitem.date}
                                                onChange={(e) => setNewLineItem({
                                                    ...lineitem,
                                                    date: e.target.value
                                                })} />

                                            Minutes <input type="number"
                                                value={lineitem.minutes}
                                                onChange={(e) => setNewLineItem({
                                                    ...lineitem,
                                                    minutes: e.target.value
                                                })} />
                                        </div>
                                    ))}

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
                                    <textarea class="form-control" id="description-textarea" rows="1"
                                        value={timesheet.description}
                                        onChange={(e) => setTimesheet({
                                            ...timesheet,
                                            description: e.target.value
                                        })} />
                                    <br />
                                </fieldset >
                            </div>
                        </div>
                    )
                })}

                {/* NEW TIMESHEET CARD */}
                <div class="ts-newtimesheet card" >
                    <div class="card-body">
                        new
                        <h6>Name: <input
                            value={timesheet.name}
                            placeholder="Job Project"
                            onChange={(e) => setTimesheet({
                                ...timesheet,
                                name: e.target.value
                            })} /></h6>
                        <hr />

                        {timesheet.lineItems.map((lineitem) => (
                            <div className="w-100">
                                Date <input type="date" disabled
                                    value={lineitem.date}
                                    onChange={(e) => setNewLineItem({
                                        ...lineitem,
                                        date: e.target.value
                                    })} />

                                Minutes <input type="number" disabled
                                    value={lineitem.minutes}
                                    onChange={(e) => setNewLineItem({
                                        ...lineitem,
                                        minutes: e.target.value
                                    })} />
                            </div>
                        ))}

                        <form className="ts-addlineitem">
                            <input type="date"
                                value={newLineItem.date}
                                onChange={(e) => setNewLineItem({
                                    ...newLineItem,
                                    date: e.target.value
                                })} />

                            Minutes <input type="number"
                                value={newLineItem.minutes}
                                onChange={(e) => setNewLineItem({
                                    ...newLineItem,
                                    minutes: Number(e.target.value)
                                })} />
                            <button type="button" class="btn" onClick={addLineItemToTimesheet}>
                                <FcPlus />
                            </button>
                        </form>
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

            timesheet: <pre>{JSON.stringify(timesheet, null, 2)}</pre>
            newLineItem: <pre>{JSON.stringify(newLineItem, null, 2)}</pre>
            timesheets: <pre>{JSON.stringify(timesheets, null, 2)}</pre>
            {/* <pre>{JSON.stringify(testMsg, null, 2)}</pre> */}
        </>
    )
}

export default Timesheet