import { Meteor } from "meteor/meteor";
import expect from "expect";

import { Notes } from "./notes";

if (Meteor.isServer) {
    describe('notes', () => {

        const noteOne = {
            _id: 'testNoteId1',
            title: 'My title',
            body: 'My body for note',
            updatedAt: 0,
            userId: 'testUserId1'
        };

        const noteTwo = {
            _id: 'testNoteId2',
            title: 'Go to market',
            body: 'Buy something',
            updatedAt: 0,
            userId: 'testUserId2'
        };

        beforeEach(function() {
            Notes.remove({});
            Notes.insert(noteOne);
            Notes.insert(noteTwo);
        });
        it('should insert new note', () => {
            const userId = 'testid';
            let _id = Meteor.server.method_handlers['notes.insert'].apply({userId});
            expect(Notes.findOne({ _id, userId })).toBeTruthy();
        });

        it('should not insert note if not authenticated', () => {
            expect(() => {
                Meteor.server.method_handlers['notes.insert']();
            }).toThrow();
        });

        it('should remove a notes', () => {
            Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId }, [noteOne._id]);
            expect(Notes.findOne({ _id: noteOne._id}));
        });

        it('should not remove note if unauthenticated', () => {
            expect(() => {
                Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]);
            }).toThrow();
        });

        it('should not remove note if invalid id', () => {
            expect(() => {
                Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId });
            }).toThrow();
        });

        it('should update the note', () => {
            let title = 'This is the updated title';
            Meteor.server.method_handlers['notes.update'].apply({ userId: noteOne.userId }, [
                noteOne._id,
                { title }
            ]);

            let note = Notes.findOne({ _id: noteOne._id });

            expect(note.updatedAt).toBeGreaterThan(noteOne.updatedAt);
            expect(note).toInclude({
                title,
                body: noteOne.body
            })
        });

        it('should throw error if extra updates', () => {
            let title = 'This is the updated title';
            let name = 'This is some extra stuff';
            expect(() => {
                Meteor.server.method_handlers['notes.update'].apply({ userId: noteOne.userId }, [
                    noteOne._id,
                    { title, name },
                ]);
            }).toThrow();
        });

        it('should not update note if user is not creator', () => {
            let title = 'This is the updated title';
            Meteor.server.method_handlers['notes.update'].apply({ userId: 'testUserId2' }, [
                noteOne._id,
                { title }
            ]);

            let note = Notes.findOne({ _id: noteOne._id });
            expect(note).toInclude(noteOne);
        });

        it('should not update note if unauthenticated', () => {
            expect(() => {
                Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id]);
            }).toThrow();
        });

        it('should not update note if invalid id', () => {
            expect(() => {
                Meteor.server.method_handlers['notes.update'].apply({ userId: noteOne.userId });
            }).toThrow();
        });

        it('should return users notes', () => {
            let res = Meteor.server.publish_handlers.notes.apply({ userId: noteOne.userId });
            let notes = res.fetch();

            expect(notes.length).toBe(1);
            expect(notes[0]).toInclude(noteOne);
        });

        it('should return no notes if user has none', () => {
            let res = Meteor.server.publish_handlers.notes.apply({ userId: 'testUserId3' });
            let notes = res.fetch();

            expect(notes.length).toBe(0);
        });
    });   
}