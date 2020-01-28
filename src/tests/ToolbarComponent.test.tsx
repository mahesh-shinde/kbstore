import * as React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import { create, ReactTestRenderer } from 'react-test-renderer';

import ToolbarComponent from '../Components/ToolbarComponent';

let snapshot: ReactTestRenderer;



describe('<toolbar />', () => {
    let wrapper;
    beforeEach(() => {
       
    });

    test('it matches the snapshot', () => {
        const toolbar = <ToolbarComponent />;

        let wrapper = shallow(toolbar);
        snapshot = create(toolbar);

        expect(snapshot.toJSON()).toMatchSnapshot();
    });

    it('it should show toolbar container', () => {
        const toolbar = <ToolbarComponent />;

        let wrapper = shallow(toolbar);

        const container = wrapper.find('.toolbarContainer');

        expect(container.length).toBe(1);
    });

    it('it should show search button when logged in user', () => {
        const toolbar = <ToolbarComponent />;

        let wrapper = shallow(toolbar);

        const buttons = wrapper.find('.button-icon');

        expect(buttons.length).toBe(1);
    });

    it('it should show search, Add and delete button when user role is admin', () => {
        const toolbar = <ToolbarComponent IsAdmin ={true} />;

        let wrapper = shallow(toolbar);

        const buttons = wrapper.find('.button-icon');

        expect(buttons.length).toBe(3);
    });
});