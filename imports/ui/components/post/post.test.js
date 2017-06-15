import { Factory } from 'meteor/dburles:factory';
import { chai } from 'meteor/practicalmeteor:chai';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Posts } from '../../../api/posts/posts';
import { withRenderedTemplate } from '../../test-helpers.js';

import faker from 'faker';

if (Meteor.isClient) {
    import './post.js';

    Factory.define('post', Posts, {
        text: () => faker.lorem.sentence(),
        createdAt: () => new Date(),
    });

    describe('Post', function() {
        beforeEach(function() {
            Template.registerHelper('_', key => key);
        });
        afterEach(function() {
            Template.deregisterHelper('_');
        });
        it('renders correctly with simple data', function() {
            const post = Factory.build('post');
            const data = {
                post: post
            };
            withRenderedTemplate('post', data, el => {
                chai.assert.equal($(el).find('li').length, 1);
            });
        });
    });
}