import React from "react";
import { mount } from "enzyme";
import expect from "expect";

import moment from 'moment';

import { NoteListHeader } from "./NoteListHeader";

if (Meteor.isClient) {
    describe('NoteListHeader', () => {
        it('should call metorCall on click', () => {
            const spy = expect.createSpy();
            const wrapper = mount(<NoteListHeader meteorCall={spy}/>);
            wrapper.find('button').simulate('click');
            //console.log(spy);
            expect(spy).toHaveBeenCalledWith('notes.insert');
        });

    });
}