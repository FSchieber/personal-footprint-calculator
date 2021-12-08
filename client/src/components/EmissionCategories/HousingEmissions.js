import React from 'react';
import { Divider, Row, Col } from 'antd';
import "./HousingEmissions.css";
import { HomeOutlined } from '@ant-design/icons';
import EmissionInput from './EmissionInput';
import EmissionChart from './EmissionChart';

class HousingEmissions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalHousingEmissions: 0,
            chartData: [
                {
                    name: 'You',
                    personalEmissions: this.totalHousingEmissions,
                },
                {
                    name: 'Average Person',
                    averageEmissions: 2960,
                },
            ]
        }
    }

    // The totalHousingEmissions is updated by subtracting the previous value and adding the new value.
    // This avoids having to manually update the totalHousingEmissions() calculation each time a new emission is added.
    // Since this function is called after the state is updated
    // we can trust that the emission type state is up to date.
    updateTotalHousingEmissions = (emissionType, oldStateValue) => {
        let newTotal = this.state.totalHousingEmissions - oldStateValue + this.state[emissionType];
        this.setState({ totalHousingEmissions: newTotal }, () => {
            this.props.onTotalEmissionsChange("housing", this.state.totalHousingEmissions);
            this.updateChartData();
        });
    }

    handleInputChange = (emissionType, totalEmission) => {
        const oldStateValue = this.state[emissionType] || 0; // If the state value is undefined, set it to 0
        // updates the emissions of this emissionType
        this.setState({ [emissionType]: totalEmission }, () => {
            this.updateTotalHousingEmissions(emissionType, oldStateValue);
        });
    }

    updateChartData = () => {
        let newChartData = this.state.chartData;
        newChartData[0].personalEmissions = this.state.totalHousingEmissions;
        // first resets the state to force the chart to re-render
        this.setState({ chartData: [] }, () => {
            this.setState({ chartData: newChartData });
        });
    }

    render() {
        const totalHousingEmissions = this.state.totalHousingEmissions;
        return (
            <div className="housing-emissions">
                <div className="housing-emissions-header">
                    <HomeOutlined className="housing-emissions-icon" />
                    <div className="housing-emissions-title">Housing</div>
                </div>
                <Divider />
                <div className="housing-emissions-value">{(totalHousingEmissions).toLocaleString()} <sub>kgs CO<sub>2</sub>/year</sub></div>
                <div className="housing-emissions-chart">
                    <EmissionChart data={this.state.chartData} />
                </div>
                <Divider />
                <Row gutter={[16, 16]} style={{ paddingBottom: "20px" }}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                        <EmissionInput onInputChange={this.handleInputChange} title="Eletricity" type="electricity" units="kWh/year" />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                        <EmissionInput onInputChange={this.handleInputChange} title="Natural Gas" type="naturalgas" units="therms/year" />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                        <EmissionInput onInputChange={this.handleInputChange} title="Fuel Oil" type="fueloil" units="litres/year" />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                        <EmissionInput onInputChange={this.handleInputChange} title="LPG" type="lpg" units="litres/year" />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                        <EmissionInput onInputChange={this.handleInputChange} title="Waste" type="waste" units="kg/week" />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                        <EmissionInput onInputChange={this.handleInputChange} title="Water" type="water" units="litres/day" />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default HousingEmissions;