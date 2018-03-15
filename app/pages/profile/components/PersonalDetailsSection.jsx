import React from "react";

const PersonalDetailsSection = (props) => {
    const kc = props.kc;

    return <fieldset>
        <legend>
            <h3 className="heading-medium">Personal Details</h3>
        </legend>
        <div className="form-group">
            <label className="form-label" htmlFor="userName">Username</label>
            <input className="form-control" id="userName" name="userName" type="text"
                   value={kc.tokenParsed.preferred_username} readOnly={true}/>
        </div>
        <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input className="form-control" id="email" name="email" type="text"
                   value={kc.tokenParsed.email} readOnly={true}/>
        </div>
        <div className="form-group">
            <label className="form-label" htmlFor="firstName">First name</label>
            <input className="form-control" id="firstName" name="firstName" type="text"
                   value={kc.tokenParsed.given_name} readOnly={true}/>
        </div>
        <div className="form-group">
            <label className="form-label" htmlFor="lastName">Last name</label>
            <input className="form-control" id="lastName" name="lastName"
                   type="text" value={kc.tokenParsed.family_name} readOnly={true}/>
        </div>

    </fieldset>


};
export default PersonalDetailsSection;