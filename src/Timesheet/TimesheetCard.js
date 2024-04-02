import { FcPlus } from "react-icons/fc";
import React, { useEffect, useState } from "react";

function TimesheetCard(timesheet, setTimesheet, lineItem, setLineItem) {

    // helper functions
    const addLineItemToTimesheet = () => {
        setTimesheet({
            ...timesheet,
            lineItems: [...timesheet.lineItems, lineItem]
        })
    }
    const [totalCost, setTotalCost] = useState(0);
    const [totalHours, setTotalHours] = useState(0);

    return (
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
                        <input type="date"
                            value={lineItem.date}
                            onChange={(e) => setLineItem({
                                ...lineItem,
                                date: e.target.value
                            })} />

                        Minutes <input type="number"
                            value={lineItem.minutes}
                            onChange={(e) => setLineItem({
                                ...lineItem,
                                minutes: e.target.value
                            })} />
                    </div>
                ))}

                <form className="ts-addlineitem">
                    <input type="date"
                        value={lineItem.date}
                        onChange={(e) => setLineItem({
                            ...lineItem,
                            date: e.target.value
                        })} />

                    Minutes <input type="number"
                        value={lineItem.minutes}
                        onChange={(e) => setLineItem({
                            ...lineItem,
                            minutes: e.target.value
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
                total hours: {totalHours} <br />
                total cost: {totalCost} <br />
                <label for="description-textarea" class="form-label">description:</label>
                <textarea class="form-control" id="description-textarea" rows="1"
                    value={timesheet.description}
                    onChange={(e) => setTimesheet({
                        ...timesheet,
                        description: e.target.value
                    })} />
                <br />
            </div>
        </div>
    )
}

export default TimesheetCard;