import { assert } from 'meteor/practicalmeteor:chai';
import { Random } from 'meteor/random';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';

import { Posts } from '../posts.js';
import './publications.js';

describe('posts publications', function() {
    beforeEach(function() {
        Posts.insert({
            text: 'Hello World!',
            createdAt: new Date(),
            createdBy: Random.id(),
        });
    });

    it('sends all posts', function(done) {
        const collector = new PublicationCollector();
        collector.collect('posts.all', (collections) => {
            console.log(collections.posts.length);
            assert.notEqual(collections.posts.length, 0);
            done();
        });
    });

});