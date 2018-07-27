import React from "react";
import Iframe from "react-iframe";

import queryString from 'query-string';

class ReportPage extends React.Component {

    render() {

        const params = queryString.parse(this.props.location.search);
        const url = params.url;
        return <div style={{display:'flex', position:'relative', margin:'auto', justifyContent: 'center', height: '100vh'}}>
            <Iframe url={url}
                    id="report"
                    width="100%%"
                    height="100%"
                    position="relative"
                    display="initial"
                    allowFullScreen/>
        </div>
    }
}

export default ReportPage;