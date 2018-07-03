import React from "react";
import Iframe from "react-iframe";

import queryString from 'query-string';

class ReportPage extends React.Component {

    render() {

        const params = queryString.parse(this.props.location.search);
        const url = params.url;
        return <div>
            <Iframe url={url}
                    id="report"
                    width="95%"
                    height="100%"
                    position="absolute"
                    display="initial"
                    allowFullScreen/>
        </div>
    }
}

export default ReportPage;