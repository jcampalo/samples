/*global firstProject, $*/
window.first_project = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function () {
    new this.Views.TodosView({
      collection: new this.Collections.TodosCollection()
    });
  }
};

$(document).ready(function () {
  first_project.init();
});
