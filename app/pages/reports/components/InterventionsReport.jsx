import React from "react";
import dc from "dc";
import crossfilter from "crossfilter";
import * as d3 from "d3";
import 'dc/style/dc.scss';

class InterventionsReport extends React.Component {
    componentDidMount() {
        this.renderReport = this.renderReport.bind(this);

        fetch("/api/platform-data/report_eventpeople")
            .then(response => response.json())
            .then(data => this.renderReport(data));
    }

    renderReport(data) {
        const ringChart = dc.pieChart("#chart-ring"),
            martialRowChart = dc.rowChart("#chart-row-martial"),
            genderRowChart = dc.rowChart("#chart-row-gender");

        const eventData = data;

        const ndx = crossfilter(eventData),
            hourDim = ndx.dimension(function (d) {
                return d.hour;
            }),
            martialDim = ndx.dimension(function (d) {
                return d.maritalcode;
            }),
            genderDim = ndx.dimension(function (d) {
                return d.gender;
            }),
            eventByHourGroup = hourDim.group(),
            martialStatusByGroup = martialDim.group(),
            genderByGroup = genderDim.group();

        ringChart
            .dimension(hourDim)
            .group(eventByHourGroup)
            .innerRadius(50)
            .legend(dc.legend())
            .label((d) =>  d.value)
            .controlsUseVisibility(true);
        genderRowChart
            .renderTitleLabel(true)
            .dimension(genderDim)
            .title((d) => d.gender)
            .legend(dc.legend())
            .group(genderByGroup)
            .elasticX(true)
            .controlsUseVisibility(true);
        martialRowChart
            .dimension(martialDim)
            .group(martialStatusByGroup)
            .elasticX(true)
            .controlsUseVisibility(true)
            .legend(dc.htmlLegend().container('#martial-legend').horizontal(true).highlightSelected(true));

        function show_empty_message(chart) {
            const is_empty = d3.sum(chart.group().all().map(chart.valueAccessor())) === 0;
            const data = is_empty ? [1] : [];
            let empty = chart.svg().selectAll('.empty-message').data(data);
            empty.exit().remove();
            empty = empty
                .enter()
                .append('text')
                .text('No data available for chart')
                .attr('text-anchor', 'middle')
                .attr('alignment-baseline', 'middle')
                .attr('class', 'empty-message')
                .style('opacity', 0)
                .merge(empty);
            empty.transition().duration(1000).style('opacity', 1);
        }

        martialRowChart.on('pretransition', show_empty_message);
        genderRowChart.on('pretransition', show_empty_message);
        dc.renderAll();
    }


    render() {
        return <div style={{paddingTop: '20px'}}>

            <h3 className="heading-medium">Interventions Report</h3>

            <div className="grid-row" style={{paddingTop: '10px'}}>

                <div className="column-one-third">
                    <div id="chart-ring" style={{width: '300px', height: '300px'}}><span>Events by hour</span>
                    </div>
                </div>

                <div className="column-one-third">
                    <div id="chart-row-martial" style={{width: '300px', height: '300px'}}><span>Events by Martial Status</span>
                    </div>
                    <div id="martial-legend" className="dc-html-legend-container"/>

                </div>

                <div className="column-one-third">
                    <div id="chart-row-gender" style={{width: '300px', height: '300px'}}><span>Events by Gender</span>
                    </div>
                </div>

            </div>
        </div>
    }
}

export default InterventionsReport;