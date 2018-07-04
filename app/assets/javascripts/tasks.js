$(function() {

  // The taskHtml method takes in a JavaScript representation
  // of the task and produces an HTML representation using
  // <li> tags
  function taskHtml(task) {
    var checkedStatus = task.done ? "checked" : "";
    var liClass = task.done ? "completed" : "";
    var liElement = '<li id="listItem-' + task.id + '" data-id="' + task.id +'" class="' + liClass + '">' +
      '<div class="view"><input class="toggle" type="checkbox"' +
      " data-id='" + task.id + "'" + checkedStatus + '><label>' +
      task.title + '</label></div></li>';
    return liElement;
  }

  // toggleTask takes in an HTML representation of
  // an event that fires from an HTML representation of
  // the toggle checkbox and  performs an API request to toggle
  // the value of the `done` field
  function toggleTask(e) {
    var itemId = jQuery(e.target).data("id");

    var doneValue = Boolean($(e.target).is(':checked'));

    $.post("/tasks/" + itemId, {
      _method: "PUT",
      task: {
        done: doneValue
      }
    }).success(function(data) {
      var liHtml = taskHtml(data); // convert JS representation into HTML rep'n
      var $li = $("#listItem-" + data.id); // extract HTML element from page with jQuery
      $li.replaceWith(liHtml); // replace original HTML with newly-generated HTML
      $('.toggle').change(toggleTask); /* New item on page AFTER setup of click handler
      means click handler must be re-registered to toggle the items */
    } );
  }

  jQuery.get("/tasks").success( function(data) { //call success method on obj that $.get returns
    var htmlString = "";                        // then pass returned JSON data to function

    jQuery.each(data, function(index, task) { // loops through each task in the database,
      htmlString += taskHtml(task); // converts JSON to HTML & appends to existing html string
    });
    var ulTodos = jQuery('.todo-list');//create reference to DOM element with class of todo-list
    ulTodos.html(htmlString); // push HTML string into HTML element just referenced

    jQuery('.toggle').change(toggleTask); // the click-handler thing

    jQuery('.todo-list').sortable({//implement 'sortable' on DOM element with class of todo-list
      update: function(e, ui) {// jQuery triggers function when task is reordered (updated).
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

  $('#new-form').submit(function(event) {
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