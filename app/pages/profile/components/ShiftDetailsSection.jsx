import React from 'react'

class ShiftDetailsSection extends React.Component {

    render() {
        return <fieldset>
            <legend>
                <h3 className="heading-medium">Shift Details</h3>
            </legend>
            <div className="form-group">
                <label className="form-label" htmlFor="name">Start Time?</label>
                <div className="form-date">
                    <div className="form-group form-group-day">
                        <label className="form-label" htmlFor="startTimeHour">Hour</label>
                        <input className="form-control" id="startTimeHour" name="startTimeHour" type="number" />
                    </div>
                    <div className="form-group form-group-month">
                        <label className="form-label" htmlFor="startTimeMinute">Minute</label>
                        <input className="form-control" id="startTimeMinute" name="startTimeMinute" type="number" />
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="region">Expected length?</label>
                <div className="form-date">
                    <div className="form-group form-group-day">
                        <label className="form-label" htmlFor="expectedLengthHour">Hours</label>
                        <input className="form-control" id="expectedLengthHour" name="expectedLengthHour" type="number" />
                    </div>
                    <div className="form-group form-group-month">
                        <label className="form-label" htmlFor="expectedLengthMinute">Minutes</label>
                        <input className="form-control" id="expectedLengthMinute" name="expectedLengthMinute" type="number" />
                    </div>
                </div>

            </div>

        </fieldset>
    }
}

export default ShiftDetailsSection;