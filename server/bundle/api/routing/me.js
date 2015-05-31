var controller = require('../controller/meController');

module.exports = {
    endpoint: '/me',
    params: {},
    actions: {
        friends: {
            path: '/friends',
            method: 'GET',
            middleware: controller.friends
        }
    }
};