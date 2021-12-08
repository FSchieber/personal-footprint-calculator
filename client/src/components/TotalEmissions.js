import "./TotalEmissions.css";
import React from "react";

class TotalEmissions extends React.Component {
    render() {
        const { totalEmissions } = this.props;
        return (
            <div className="total-emissions">
                <div className="total-emissions-container">
                    <h1 className="total-emissions__title">Your Total CO<sub>2</sub> Emissions:</h1>
                    <h2 className="total-emissions__value">{totalEmissions} <sub>kgs/year</sub></h2>
                </div>
            </div>
        )
    }
}

export default TotalEmissions;