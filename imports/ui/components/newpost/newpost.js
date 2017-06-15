import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Posts } from '../../../api/posts/posts.js';

import './newpost.html';

Template.body.events({
    'submit .new-post' (event) {
        event.preventDefault();

        const target = event.target;
        const text = target.text.value;

        Posts.insert({
            text,
            createdAt: new Date(),
            createdBy: Meteor.userId(),
            username: Meteor.user().username
        });
        target.text.value = '';

    },
});