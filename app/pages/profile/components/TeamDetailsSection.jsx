import React, {PropTypes} from 'react';
import Autocomplete from 'accessible-autocomplete/react'
import {createStructuredSelector} from "reselect";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {getLocations, getRegions, getTeams} from "../selectors";
import * as actions from '../actions';

class TeamDetailsSection extends React.Component {

    regionLookUp(query, populateResults) {
        this.props.fetchRegions(query);
        const regions = this.props.regions.get('data').map((region) => {
            return region.get('name');
        }).toArray();
        populateResults(regions)
    }

    locationLookUp(query, populateResults) {
        const locations = this.props.locations.get('data').map((location) => location.get('name'))
            .filter(l => l.toLowerCase().indexOf(query.toLowerCase()) !== -1).toArray();
        populateResults(locations)
    }

    teamLookUp(query, populateResults) {
        const teams = this.props.teams.get('data').map((team) => team.get('name'))
            .filter(l => l.toLowerCase().indexOf(query.toLowerCase()) !== -1).toArray();
        populateResults(teams)
    }


    locationConfirmed(confirmed) {
        if (this.props.locations && this.props.locations.get('data')) {
            const locationSelected = this.props.locations.get('data').find((location) => {
                return location.get('name') === confirmed;
            });
            if (locationSelected) {
                const teamsUrl = locationSelected.getIn(['_links', 'teams', 'href']);
                this.props.fetchTeams(teamsUrl);
            }
        }
    }


    regionConfirmed(confirmed) {
        if (this.props.regions.get('data')) {
            const regionSelected = this.props.regions.get('data').find((region) => {
                return region.get('name') === confirmed;
            });
            if (regionSelected) {
                const locationsUrl = regionSelected.getIn(['_links', 'locations', 'href']);
                this.props.fetchLocations(locationsUrl);
            }
        }
    }


    render() {

        return <fieldset>
            <legend>
                <h3 className="heading-medium">Team Details</h3>
            </legend>
            <div className="form-group">
                <label className="form-label" htmlFor="region">Region</label>
                <Autocomplete id='region' name="region" source={this.regionLookUp.bind(this)}
                              defaultValue={'South'} onConfirm={this.regionConfirmed.bind(this)}/>
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="location">Location</label>
                <Autocomplete id='location'
                              source={this.locationLookUp.bind(this)}
                              showAllValues={true} onConfirm={this.locationConfirmed.bind(this)}/>
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="team">Name</label>
                <Autocomplete id='teams' source={this.teamLookUp.bind(this)} showAllValues={true}/>
            </div>

        </fieldset>
    }
}

TeamDetailsSection.propTypes = {
    fetchRegions: PropTypes.func.isRequired,
    fetchLocations: PropTypes.func.isRequired,
    fetchTeams:  PropTypes.func.isRequired,
    regions: ImmutablePropTypes.map.isRequired,
    locations: ImmutablePropTypes.map.isRequired,
    teams: ImmutablePropTypes.map.isRequired
};

const mapStateToProps = createStructuredSelector({
    regions: getRegions,
    locations: getLocations,
    teams: getTeams
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TeamDetailsSection);
