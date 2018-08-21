import React from "react";
import expect from "expect";
import { mount } from "enzyme";
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { Login } from "./Login";

if (Meteor.isClient) {
    describe('Login', function () {
        it('should show error message', function () {
            const error = "This is an error message";
            const options = new ReactRouterEnzymeContext();
            const wrapper = mount(<Login loginWithPassword={() => { }} />, options.get());
            wrapper.setState({ error });
            let errorText = wrapper.find('p').text();
            expect(errorText).toBe(error);

            wrapper.setState({ error: ''});
            expect(wrapper.find('p').length).toBe(0);
        });

        it('should call loginWithPassword with form data', function() {
            const email = 'durgesh@test.com';
            const password = 'password123';
            const spy = expect.createSpy();
            const options = new ReactRouterEnzymeContext();
            const wrapper = mount(<Login loginWithPassword={spy}/>, options.get());

            wrapper.ref('email').value = email;
            wrapper.ref('password').value = password;
            wrapper.find('form').simulate('submit');

            expect(spy.calls[0].arguments[0]).toEqual({email});
            expect(spy.calls[0].arguments[1]).toBe(password);
        });

        it('should set loginWithPassword callback errors', function() {
            const spy = expect.createSpy();
            const options = new ReactRouterEnzymeContext();
            const wrapper = mount(<Login loginWithPassword={spy} />, options.get());

            wrapper.find('form').simulate('submit');
            spy.calls[0].arguments[2]({}); //error set
            expect(wrapper.state('error')).toBe(undefined);

            spy.calls[0].arguments[2]();
            expect(wrapper.state('error')).toBeFalsy;
        });
    });
}
