import React from 'react';
import ReactDOM from 'react-dom';
import TotalEmissions from '../TotalEmissions';

import { render, fireEvent, cleanup } from '@testing-library/react';

afterEach(cleanup);

it('Receives and renders the props', () => {
    const { getByText } = render(<TotalEmissions totalEmissions={200} />);
    const totalEmissions = getByText(/200/i);
    expect(totalEmissions).toBeInTheDocument();
});
