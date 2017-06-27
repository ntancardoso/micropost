import { Factory } from 'meteor/dburles:factory';
import { chai } from 'meteor/practicalmeteor:chai';
import { Template } from 'meteor/templating';
import { Random } from 'meteor/random';
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

        describe('as guest', function() {

            beforeEach(function() {
                // Ensure that user is guest
                if (Meteor.userId())
                    Meteor.logout();
            });

            it('cannot insert directly from client', function(done) {

                const post = Factory.build('post');

                const postId = Posts.insert(post, function(err, result) {
                    chai.assert.isDefined(err);
                    chai.assert.equal(err.error, 403);
                    done();
                });

            });

            it('cannot insert through server call', function(done) {

                Meteor.call('posts.insert', "Hello World!", function(err) {
                    chai.assert.isDefined(err);
                    chai.assert.equal(err.error, 'not-authorized');
                    done();
                });
            });

            it('cannot remove directly from client', function(done) {

                const post = Factory.build('post');

                Posts.insert(post, function(err, result) {

                    chai.assert.isDefined(result);

                    Posts.remove({ _id: result }, function(err) {
                        chai.assert.isDefined(err);
                        chai.assert.equal(err.error, 403);
                        done();
                    });
                });
            });
        });

        describe('as user', function() {

            before(function(done) {
                const currentUser = { username: "testclient", password: "test" };
                if (!Meteor.user()) {
                    Accounts.createUser(currentUser, function(err) {
                        Meteor.loginWithPassword(currentUser.username, currentUser.password, function() {
                            done();
                        });
                    });

                }
            });

            after(function() {
                if (Meteor.userId()) {
                    Meteor.logout();
                }
            });

            it('can insert directly from client', function(done) {

                const post = Factory.build('post');
                post.createdBy = Meteor.userId();
                const postId = Posts.insert(post, function(err, result) {
                    chai.assert.isUndefined(err);
                    chai.assert.equal(Posts.find({ _id: postId }).count(), 1);
                    done();
                });
            });

            it('cannot remove directly from client', function(done) {

                const post = Factory.build('post');
                post.createdBy = Meteor.userId();

                const postId = Posts.insert(post, function(err, result) {
                    chai.assert.isUndefined(err);
                    Posts.remove({ _id: postId }, function(err) {
                        chai.assert.isDefined(err);
                        chai.assert.equal(err.error, 403);
                        done();
                    });
                });
            });

            it('can remove using server call', function(done) {

                const post = Factory.build('post');
                post.createdBy = Meteor.userId();

                const postId = Posts.insert(post, function(err, result) {
                    chai.assert.isUndefined(err);
                    Meteor.call('posts.remove', postId, (error) => {
                        chai.assert.isUndefined(err);
                        chai.assert.equal(Posts.find({ _id: postId }).count(), 0);
                        done();
                    });
                });
            });
        });
    });
}