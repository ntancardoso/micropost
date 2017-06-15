import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './post.html';

Template.post.helpers({
    isOwner() {
        return this.createdBy === Meteor.userId();
    },
});

Template.post.events({
    'click .delete' () {
        Meteor.call('posts.remove', this._id, (error) => {
            if (error) {
                alert(error.error);
            }
        });
    },
});