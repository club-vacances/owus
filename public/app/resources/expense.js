(function(){
    'use strict';

    angular.module('app')
        .factory('Expense', ['$resource', function($resource){
            return $resource('/api/expenses/:id', {id: '@_id'}, {
                edit: {
                    method: 'PUT'
                },
                mine: {
                    method: 'GET',
                    url: '/api/expenses/mine',
                    isArray: true
                }
            });
        }]);
})();