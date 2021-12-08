import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export default class EmissionChart extends PureComponent {
    render() {
        return (
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={150}
                    height={150}
                    data={this.props.data}
                    margin={{
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <XAxis style={{ textAnchor: 'middle' }} tick={{ fill: 'white' }} axisLine={false} dataKey="name" />
                    <YAxis tick={{ fill: 'white' }} />
                    <Bar dataKey="personalEmissions" fill="#85e4b9" style={{ color: "white", textShadow: "0px 0px 10px rgba(0,0,0,0.3)" }} />
                    <Bar dataKey="averageEmissions" fill="#63b995ff" />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}
