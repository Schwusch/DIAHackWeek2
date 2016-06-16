import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../ui/body.js';

FlowRouter.notFound = {
    action: function() {
	FlowRouter.go('/');
    }
};

FlowRouter.route('/mainscreen', {
  name: 'mainScreen',
  action() {
    BlazeLayout.render('body', { main: 'mainScreen'});
  },
});


FlowRouter.route('/', {
  name: 'phoneScreen',
  action() {
    BlazeLayout.render('body', { main: 'phoneScreen'});
  },
});

FlowRouter.route('/charts', {
  name: 'charts',
  action() {
    BlazeLayout.render('body', { main: 'charts'});
  },
});