import React from "react";
import { Meteor } from "meteor/meteor";
import { mount } from "enzyme";
import expect from "expect";
import moment from 'moment';

import { notes } from "../fixtures/fixtures";
import { NoteListItem } from "./NoteListItem";

if( Meteor.isClient ){
    describe('NoteListItem', () => {
        let Session;
        beforeEach(() => {
            Session = {
                set: expect.createSpy()
            };
        });

        it('should render title and timestamp', () => {
            const wrapper = mount(<NoteListItem note={notes[0]} Session={Session}/>);

            expect(wrapper.find('h5').text()).toBe(notes[0].title);
            expect(wrapper.find('p').text()).toBe(moment(notes[0].updatedAt).format('M/DD/YY'));
        });

        it('should set default title if not title set', () => {
            const wrapper = mount(<NoteListItem note={notes[1]} Session={Session}/>);

            expect(wrapper.find('h5').text()).toBe('Untitled note');
        });

        it('should set on click',() => {
            const wrapper = mount(<NoteListItem note={notes[1]} Session={Session} />);
            wrapper.find('div').simulate('click');
            expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[1]._id);
        });
    });
}