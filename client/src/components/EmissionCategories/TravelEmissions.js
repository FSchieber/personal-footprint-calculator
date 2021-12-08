import React from 'react';
import { Divider, Row, Col } from 'antd';
import "./TravelEmissions.css";
import { HomeOutlined } from '@ant-design/icons';
import EmissionInput from './EmissionInput';
import EmissionChart from './EmissionChart';

class TravelEmissions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalTravelEmissions: 0,
            chartData: [
                {
                    name: 'You',
                    personalEmissions: this.totalTravelEmissions,
                },
                {
                    name: 'Average Person',
                    averageEmissions: 5766,
                },
            ]
        }
    }

    updateTotalTravelEmissions = (emissionType, oldStateValue) => {
        let newTotal = this.state.totalTravelEmissions - oldStateValue + this.state[emissionType];
        this.setState({ totalTravelEmissions: newTotal }, () => {
            this.props.onTotalEmissionsChange("travel", this.state.totalTravelEmissions);
            this.updateChartData();
        });
    }

    handleInputChange = (emissionType, totalEmission) => {
        const oldStateValue = this.state[emissionType] || 0; // If the state value is undefined, set it to 0
        // updates the emissions of this emissionType
        this.setState({ [emissionType]: totalEmission }, () => {
            this.updateTotalTravelEmissions(emissionType, oldStateValue);
        });
    }

    updateChartData = () => {
        let newChartData = this.state.chartData;
        newChartData[0].personalEmissions = this.state.totalTravelEmissions;
        // first resets the state to force the chart to re-render
        this.setState({ chartData: [] }, () => {
            this.setState({ chartData: newChartData });
        });
    }

    render() {
        const totalTravelEmissions = this.state.totalTravelEmissions;
        return (
            <div className="travel-emissions">
                <div className="travel-emissions-header">
                    <HomeOutlined className="travel-emissions-icon" />
                    <div className="travel-emissions-title">Travel</div>
                </div>
                <Divider />
                <div className="travel-emissions-value">{(totalTravelEmissions).toLocaleString()} <sub>kgs CO<sub>2</sub>/year</sub></div>
                <div className="travel-emissions-chart">
                    <EmissionChart data={this.state.chartData} />
                </div>
                <Divider />
                <Row gutter={[16, 16]} style={{ paddingBottom: "20px" }}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                        <EmissionInput onInputChange={this.handleInputChange} title="Vehicle" type="vehicle" units="km/year" />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                        <EmissionInput onInputChange={this.handleInputChange} title="Bus" type="bus" units="km/year" />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                        <EmissionInput onInputChange={this.handleInputChange} title="Metro" type="metro" units="km/year" />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                        <EmissionInput onInputChange={this.handleInputChange} title="Taxi" type="taxi" units="km/year" />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                        <EmissionInput onInputChange={this.handleInputChange} title="Rail" type="rail" units="km/year" />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                        <EmissionInput onInputChange={this.handleInputChange} title="Flying" type="flying" units="km/year" />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default TravelEmissions;