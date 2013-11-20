/*global firstProject, Backbone*/
(function () {
    first_project.Collections.TodosCollection = Backbone.Collection.extend({
        localStorage: new Backbone.LocalStorage("backbone-generator-todos"),
        initialize: function () {
            this.model = first_project.Models.TodoModel;
        },
        remaining: function () {
            return this.where({ completed: false });
        },
        completed: function () {
            return this.where({ completed: true });
        }
    });
})();
