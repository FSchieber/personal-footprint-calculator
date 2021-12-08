import React from 'react';
import EmissionCategories from '../../EmissionCategories/EmissionCategories';

import { render, cleanup } from '@testing-library/react';

afterEach(cleanup);

it('EmissionCategories renders the children', () => {
    const { getByText } = render(<EmissionCategories children={<p>A children paragraph</p>} />);
    const children = getByText(/A children paragraph/i);
    expect(children).toBeInTheDocument();
});