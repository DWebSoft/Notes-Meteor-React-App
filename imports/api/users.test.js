import { Meteor } from "meteor/meteor";
import expect from "expect";

import { validateNewUser } from "./users";

if (Meteor.isServer) {
    describe('users', function() {
        it('should allow valid email address', function() {
            const user = {
                emails: [
                    {
                        address: 'test@example.com'
                    }
                ]
            };

            const res = validateNewUser(user);
            expect(res).toBeTruthy();
        });
        it('should reject invalid email address', function () {
            const user = {
                emails: [
                    {
                        address: 'testexample.com'
                    }
                ]
            };
            expect(() => {
                validateNewUser(user);
            }).toThrow();
        });
    });
}