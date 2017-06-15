import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Posts } from './posts';

Meteor.methods({
    'posts.insert' (text) {
        check(text, String);
        const currentUser = this.userId;

        if (!currentUser) {
            throw new Meteor.Error('not-authorized');
        }

        var username = Meteor.users.findOne({ _id: currentUser });
        username = username ? username.username : '';

        Posts.insert({
            text,
            createdAt: new Date(),
            createdBy: currentUser,
            username,
        });
    },
    'posts.remove' (postId) {
        check(postId, String);
        const post = Posts.findOne(postId);

        if (post.createdBy != this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Posts.remove(postId);
    },
});