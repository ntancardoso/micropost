import { Factory } from 'meteor/dburles:factory';
import { chai } from 'meteor/practicalmeteor:chai';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Posts } from '../../../api/posts/posts';
import { withRenderedTemplate } from '../../test-helpers.js';

if (Meteor.isClient) {
    import './body.js';

    describe('Posts', function() {
        beforeEach(function() {
            Template.registerHelper('_', key => key);
        });
        afterEach(function() {
            Template.deregisterHelper('_');
        });
        it('displays multiple post', function() {

            const posts = [
                { text: '1 post', createdAt: new Date() },
                { text: '2 post', createdAt: new Date() },
                { text: '3 post', createdAt: new Date() }
            ];

            const data = {
                posts: posts
            };
            withRenderedTemplate('body', data, el => {
                chai.assert.equal($(el).find('li').length, 2);
            });
        });
    });
}