import React from "react";
import expect from "expect";
import { mount } from "enzyme";
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import { configure } from 'enzyme';

import { Signup } from "./Signup";

if (Meteor.isClient) {
    describe('Signup', function () {
        it('should show error message', function () {
            const error = "This is an error message";
            const options = new ReactRouterEnzymeContext();
            const wrapper = mount(<Signup createUser={() => { }} />, options.get());
            wrapper.setState({ error });
            let errorText = wrapper.find('p').text();
            expect(errorText).toBe(error);

            wrapper.setState({ error: '' });
            expect(wrapper.find('p').length).toBe(0);
        });

        it('should call createUser with form data', function () {
            const email = 'durgesh@test.com';
            const password = 'password123';
            const spy = expect.createSpy();
            const options = new ReactRouterEnzymeContext();
            const wrapper = mount(<Signup createUser={spy} />, options.get());

            wrapper.ref('email').value = email;
            wrapper.ref('password').value = password;
            wrapper.find('form').simulate('submit');
            expect(spy.calls[0].arguments[0]).toEqual({ email, password });
        });

        it('should set error if password short', function () {
            const email = 'durgesh@test.com';
            const password = 'pass      ';
            const spy = expect.createSpy();
            const options = new ReactRouterEnzymeContext();
            const wrapper = mount(<Signup createUser={spy} />, options.get());

            wrapper.ref('email').value = email;
            wrapper.ref('password').value = password;
            wrapper.find('form').simulate('submit');
            expect(wrapper.state('error')).toBeTruthy();
        });

        it('should set createUser callback errors', function () {
            const password = 'password123';
            const reason = 'This is some error';
            const spy = expect.createSpy();
            const options = new ReactRouterEnzymeContext();
            const wrapper = mount(<Signup createUser={spy} />, options.get());

            wrapper.ref('password').value = password;
            wrapper.find('form').simulate('submit');

            spy.calls[0].arguments[1]({reason}); //error set
            expect(wrapper.state('error')).toBe(reason);

            spy.calls[0].arguments[1]();
            expect(wrapper.state('error')).toBeFalsy;
        });
    });
}
