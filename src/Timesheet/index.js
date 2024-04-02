import React, { useEffect, useState } from "react";
import axios from "axios";
import * as client from "../client/timesheetsClient"

// Component that displays a timesheet
function Timesheet() {

    // setting up test to fetch from server
    const [testMsg, setTestMsg] = useState();
    const fetchTest = async () => {
        const timesheet = {
            "userId": 0,
            "rate": 13,
            "lineItems": [{ "name": "lineitem1" }, { "name": "lineitem2" }]
        };
        const results = await client.getAllTimesheets(timesheet);
        setTestMsg(results);
    }

    useEffect(() => {
        fetchTest();
    }, []);

    return (
        <>
            <h1>timesheet</h1>

            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>

            <pre>{JSON.stringify(testMsg, null, 2)}</pre>
        </>
    )
}

export default Timesheet