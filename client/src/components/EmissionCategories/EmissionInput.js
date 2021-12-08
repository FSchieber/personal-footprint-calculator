import React from 'react';
import { InputNumber, message } from 'antd';
import "./EmissionInput.css";

message.config({ maxCount: 1 });

class EmissionInput extends React.Component {
    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange = (usage) => {
        if (!usage || isNaN(usage) || usage < 0) {
            this.handleInvalidInput(usage);
        } else {
            this.getTotalEmissions(usage);
        }
    }

    handleInvalidInput = (usage) => {
        if (usage !== 0) message.error("Please enter a valid number for " + this.props.title);
        this.updateProps(0);
    }

    getTotalEmissions = (usage) => {
        fetch(`/api/v1/emissions/${this.props.type}?usage=${usage}`)
            .then(res => res.json())
            .then(data => {
                if (data.emissions) {
                    this.updateProps(data.emissions);
                }
            });
    }

    updateProps = (emissions) => {
        this.props.onInputChange(this.props.type, emissions); // sends the total emissions to the parent component
    }

    render() {
        return (
            <div className="emissions-input">
                <div className="emission-input-title">{this.props.title}</div>
                <InputNumber className="emission-input-number" onChange={this.handleInputChange} defaultValue={0} data-testid="emissionInput" />
                <div className="emission-input-unit">{this.props.units}</div>
            </div>
        );
    }
}

export default EmissionInput;