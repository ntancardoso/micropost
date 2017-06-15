import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Posts } from '../../../api/posts/posts.js';

import './body.html';
import '../../components/newpost/newpost.js';
import '../../components/post/post.js';

Template.body.onCreated(function bodyOnCreated() {
    Meteor.subscribe('posts.all');
});

Template.body.helpers({
    posts() {
        return Posts.find({}, { sort: { createdAt: -1 } });
    },
});