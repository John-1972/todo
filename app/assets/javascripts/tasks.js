$(function() {

  // The taskHtml method takes in a JavaScript representation
  // of the task and produces an HTML representation using
  // <li> tags
  function addTaskHtml(task, listElement) {
    var checkedStatus = task.done ? "checked" : "";
    var liClass = task.done ? "completed" : "";
    var subTasks = task.tasks; // if task has sub-tasks, I add <ul></ul> tags
    var newTaskHTML =
        '<li id="listItem-' + task.id + '" data-id="' + task.id +'" class="' + liClass + '">' +
        '<div class="view"><input class="toggle" type="checkbox"' + " data-id='" + task.id +
        "'" + checkedStatus + '><label>' + task.title + '</label></div></li>';

    listElement.append(newTaskHTML);
  
    if(subTasks && subTasks.length > 0) {
      $("#listItem-"+task.id).append('<ul id="subList-' + task.id + '"></ul>');

      jQuery.each(subTasks, function(index, subTask) { // loops through each subtask on the current task
         addTaskHtml(subTask, $("#subList-"+task.id)); 
      });
    }
  }

  // toggleTask takes in an HTML representation of
  // an event that fires from an HTML representation of
  // the toggle checkbox and performs an API request to
  // toggle the value of the `done` field
  function toggleTask(e) {
    var itemId = jQuery(e.target).data("id");

    var doneValue = Boolean($(e.target).is(':checked'));

    $.post("/tasks/" + itemId, {
      _method: "PUT",
      task: {
        done: doneValue
      }
    }).success(function(data) {
      var taskElement = $("#listItem-" + data.id); // extract HTML element from page with jQuery
      taskElement.toggleClass('completed');
    });
  }

  jQuery.get("/tasks").success( function(data) { //call success method on obj that $.get returns
    var rootListElement = jQuery('.todo-list');

    jQuery.each(data, function(index, task) { // loops through each task in the database,
      addTaskHtml(task, rootListElement); // converts JSON to HTML & appends to existing html string
    });
    
    jQuery('.toggle').change(toggleTask); // the click-handler thing

    jQuery('.todo-list').sortable({//implement 'sortable' on DOM element with class of todo-list
        update: function(e, ui) { // jQuery triggers function when task is reordered (updated).
                                // ui.item is the JS representation of the task that's moved
        var itemId = ui.item.data('id');
        $.post("/tasks/" + itemId, {
          _method: "PUT",
          task: {
            row_order: ui.item.index()
          }
        });
      }
    });
  });

  jQuery('#new-form').submit(function(event) {
    event.preventDefault();
    var textbox = $('.new-todo');
    var payload = {
      task: {
        title: textbox.val()
      }
    };
    $.post("/tasks", payload).success(function(data) {
      var htmlString = taskHtml(data); // convert JS representation of task into HTML repres.
      var ulTodos = $('.todo-list'); //create reference to DOM element with class of todo-list
      ulTodos.append(htmlString); // add HTML representation of task to bottom of todo-list
      $('.toggle').click(toggleTask); // added click handler so checkbox clicking is recorded
      $('.new-todo').val(''); // Clears the input box after entering a task
    });
  });
});