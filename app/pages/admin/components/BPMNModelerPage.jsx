import React from 'react'
import Iframe from 'react-iframe'
import Spinner from 'react-spinkit';

class BPMNModelerPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modelerUrl: null,
            loading: true,
            failed: false
        };
    }

    componentDidMount() {
        fetch('/api/config')
            .then((response) => {
                return response.json()
            }).then((data) => {
                this.setState({
                    modelerUrl: data.MODELER_URL,
                    loading: false,
                    failed: false
                });
            }).catch(e => {
            this.setState({
                loading: false,
                failed: true
            });
        })
    }

    render() {
        const {loading, failed} = this.state;

        const iframe = failed?  <div>
            <div className="notice">
                <i className="icon icon-important">
                    <span className="visually-hidden">Warning</span>
                </i>
                <strong className="bold-small">
                    Failed to load modeler
                </strong>
            </div>
        </div> : <Iframe url={this.state.modelerUrl}
                         position="absolute"
                         width="80%"
                         id="bpmnModelerId"
                         height="80%"
                         allowFullScreen/>;

        return <div>
            {loading ? <div style={{paddingTop: '20px', display: 'flex', justifyContent: 'center'}}><Spinner
                name="three-bounce" color="#005ea5"/></div> : iframe}
        </div>
    }
}

export default BPMNModelerPage;