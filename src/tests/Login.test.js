import React from 'react';
import {shallow} from 'enzyme';
import Login from '../components/Login';
import Register from '../components/Register';
describe('Login Component', () => {
 it('should render without throwing an error', () => {
 expect(shallow(<Login />).find('form.login').exists()).toBe(true)
 })
})

it("renders a name input", () => {
    expect(shallow(<Register />).find("#nameInput").length).toEqual(1);
});

it("renders a name input", () => {
    expect(shallow(<Register />).find("#emailInput").length).toEqual(1);
});