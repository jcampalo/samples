/*global firstProject, Backbone, JST*/
(function () {
  'use strict';

  first_project.Views.TodosView = Backbone.View.extend({
    el: "#todo-app",
    template: JST["app/scripts/templates/todos.ejs"],
    templateFooter: JST["app/scripts/templates/todosFooter.ejs"],
    events: {
      "submit": "createTodo",
      "click #markAllTodos": "markTodos"
    },
    initialize: function () {
      this.render();
      this.$el.html(this.template());
      this.listenTo(this.collection, "add", this.addTodoItem);
      this.listenTo(this.collection, "reset", this.addAllTodoItems);
      this.listenTo(this.collection, "all", this.render);
      this.collection.fetch();
    },
    render: function () {
      var remaining = this.collection.remaining().length;
      var completed = this.collection.completed().length;
      if (remaining || completed) {
        this.$("footer").html(this.templateFooter({ remaining: remaining, completed: completed }));
        this.$("footer").show(1000);
        this.$(".markAll").show();
      } else {
        this.$("footer").hide();
        this.$(".markAll").hide();
      }
      if (typeof $("#markAllTodos")[0] != "undefined")
        this.$("#markAllTodos")[0].checked = !remaining;
    },
    createTodo: function (event) {
      event.preventDefault();
      var title = this.$("#new-todo").val().trim();
      if (title) {
        this.collection.create(new first_project.Models.TodoModel({
          title: title
        }));
        $("#new-todo").val("");
      }
    },
    addTodoItem: function (todo) {
      var view = new first_project.Views.TodoView({
        model: todo
      });
      this.$("ul").append(view.render().el);
    },
    addAllTodoItems: function () {
      this.collection.each(this.addTodoItem, this);
    },
    markTodos: function () {
      var complete = this.$("#markAllTodos")[0].checked;
      this.collection.each(function (todo) {
        todo.save({ completed: complete });
      });
    }
  });

})();
