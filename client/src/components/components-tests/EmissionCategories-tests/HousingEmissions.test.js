import React from 'react';
import EmissionInput from '../../EmissionCategories/EmissionInput';
import HousingEmissions from '../../EmissionCategories/HousingEmissions';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// describe HousingEmissions Component
describe('HousingEmissions Component', () => {
    it("should call function on input change", () => {
        const onChangeMock = jest.fn();
        const component = shallow(<EmissionInput onInputChange={onChangeMock} />);
        component.find('.emission-input-number').simulate('change');
        expect(onChangeMock).toHaveBeenCalled();
    });

    it("state should be undefined on render", () => {
        const onChangeMock = jest.fn();

        const wrapper = shallow(<HousingEmissions >
            <EmissionInput onInputChange={onChangeMock} type={"electricity"} />
        </HousingEmissions>);

        expect(wrapper.state('electricity')).toBeUndefined();
    });
});