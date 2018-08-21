import { Meteor } from "meteor/meteor";
import React from "react";
import expect from "expect";
import { mount } from "enzyme";
//import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

//configure({ adapter: new Adapter() });
import { PrivateHeader } from "./PrivateHeader";

if (Meteor.isClient) {
    describe('PrivateHeader', () => {
        it('should set button text to logout', function() {
            let wrapper = mount(<PrivateHeader title="My title" handleLogout={() => {}}/>);
            let buttonText = wrapper.find('button').text();

            expect( buttonText ).toBe('Logout');
        });

        it('should use title prop as h1 text', function() {
            const title = 'This is h1 title';
            let wrapper = mount(<PrivateHeader title={title} handleLogout={() => { }}/>);
            let h1Text = wrapper.find('h1').text();

            expect(h1Text).toBe(title);
        });

        it('should call handleLogout on click', function () {
            const spy = expect.createSpy();
            let wrapper = mount(<PrivateHeader title="My title" handleLogout={spy} />);
            wrapper.find('button').simulate('click');
            expect(spy.calls.length).toBe(1);
        });
    });
}