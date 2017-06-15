import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { Random } from 'meteor/random';

import { Posts } from './posts.js';

if (Meteor.isServer) {
    describe('posts collection', function() {
        it('insert correctly', function() {

            const postId = Posts.insert({
                text: 'Hello World!',
                createdAt: new Date(),
                createdBy: Random.id(),
            });
            const added = Posts.find({ _id: postId });
            const collectionName = added._getCollectionName();
            const count = added.count();

            assert.equal(collectionName, 'posts');
            assert.equal(count, 1);
        });
    });
}