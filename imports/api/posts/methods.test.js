import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';
import { sinon } from 'meteor/practicalmeteor:sinon';

import { Posts } from './posts';
import './methods.js';

if (Meteor.isServer) {

    describe('posts methods', () => {
        const userId = Random.id();
        let postId;

        beforeEach(() => {
            Posts.remove({});

            postId = Posts.insert({
                text: 'Hello World!',
                createdAt: new Date(),
                createdBy: userId
            });
        });

        it('cannot post as guest', () => {

            const insertPost = Meteor.server.method_handlers['posts.insert'];

            assert.throws(() => {
                insertPost.apply({}, ["NOT ALLOWED"]);
            }, Meteor.Error, '[not-authorized]');
        });

        it('can post as logged user', () => {

            const insertPost = Meteor.server.method_handlers['posts.insert'];
            const randomText = "This is random: " + Random.id();

            insertPost.apply({ userId }, [randomText]);

            assert.isNotNull(Posts.findOne({ text: randomText }));
        });

        it('can delete own post', () => {

            const deletePost = Meteor.server.method_handlers['posts.remove'];

            deletePost.apply({ userId }, [postId]);

            assert.equal(Posts.find({ _id: postId }).count(), 0);
        });

        it('cannot delete other\'s post', () => {

            const deletePost = Meteor.server.method_handlers['posts.remove'];
            const otherUserId = Random.id();
            //const invocation = { otherUserId };

            assert.throws(() => {
                deletePost.apply({ otherUserId }, [postId]);
            }, Meteor.Error, '[not-authorized]');
        });
    });

}