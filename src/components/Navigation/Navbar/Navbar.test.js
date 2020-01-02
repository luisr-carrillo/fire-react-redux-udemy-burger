import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Navbar from './Navbar';
import NavbarItem from './NavbarItem/NavbarItem';
configure({ adapter: new Adapter() });

describe('<Navbar />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Navbar />);
    });

    it('should render two <NavbarItem /> elements if not authenticated', () => {
        expect(wrapper.find(NavbarItem)).toHaveLength(2);
    });

    it('should render three <NavbarItem /> elements if authenticated', () => {
        wrapper.setProps({ isAuth: true });
        expect(wrapper.find(NavbarItem)).toHaveLength(3);
    });
    it('should be an exact logout button', () => {
        wrapper.setProps({ isAuth: true });
        expect(
            wrapper.contains(<NavbarItem link="/logout">Logout</NavbarItem>)
        ).toEqual(true);
    });
});
