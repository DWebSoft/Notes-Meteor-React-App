import React from "react";
import { Meteor } from "meteor/meteor";
import { mount } from "enzyme";
import expect from "expect";

import moment from 'moment';

import NoteListItem from "./NoteListItem";

if( Meteor.isClient ){
    describe('NoteListItem', () => {
        it('should render title and timestamp', () => {
            const title = "This is the title";
            const timestamp = 1534844011939;
            const wrapper = mount(<NoteListItem note={{ title, timestamp }} />);

            expect(wrapper.find('h5').text()).toBe(title);
            expect(wrapper.find('p').text()).toBe(moment(timestamp).format('M/DD/YY'));
        });

        it('should set default title if not title set', () => {
            const timestamp = 1534844011939;
            const wrapper = mount(<NoteListItem note={{ timestamp }} />);

            expect(wrapper.find('h5').text()).toBe('Untitled note');
        });
    });
}