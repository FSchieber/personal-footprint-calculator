import React from 'react';
import EmissionInput from '../../EmissionCategories/EmissionInput';

import { render, fireEvent, cleanup } from '@testing-library/react';

afterEach(cleanup);

//test that EmissionInput renders correctly
it('EmissionInput renders correctly', () => {
    const { asFragment } = render(<EmissionInput />);
    expect(asFragment()).toMatchSnapshot();
});