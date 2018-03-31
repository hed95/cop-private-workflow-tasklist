import React from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import WorkflowModelerPage from "./WorkflowModelerPage";
import FormModelerPage from "./FormModelerPage";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import WorkflowAdminPage from "./WorkflowAdminPage";

class AdminPage extends React.Component {

    componentDidMount() {

        const adminRole = this.props.kc.realmAccess && this.props.kc.realmAccess.roles
            ? this.props.kc.realmAccess.roles.find(role => role === 'platform_admin')
            : null;

        if (!adminRole) {
            this.props.history.push("/profile");
        }

    }

    render() {
        return <div>
            <div>
                <Tabs>
                    <TabList>
                        <Tab>Workflow Modeler</Tab>
                        <Tab>Form Builder</Tab>
                        <Tab>Workflow Admin</Tab>
                    </TabList>

                    <TabPanel>
                        <WorkflowModelerPage/>
                    </TabPanel>
                    <TabPanel>
                        <FormModelerPage/>
                    </TabPanel>
                    <TabPanel>
                        <WorkflowAdminPage/>
                    </TabPanel>
                </Tabs>
            </div>

        </div>
    }
}

export default withRouter(connect((state) => {
    return {
        kc: state.keycloak
    }
}, {})(AdminPage));