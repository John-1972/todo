$(function() {

  // The taskHtml method takes in a JavaScript representation
  // of the task and produces an HTML representation using
  // <li> tags
  function taskHtml(task) {
    var checkedStatus = task.done ? "checked" : "";
    var liClass = task.done ? "completed" : "";
    var liElement = '<li id="listItem-' + task.id + '" class="' + liClass + '">' +
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
        done: doneValue // This will be repeated with rowOrder: newIndex
      }
    }).success(function(data) {
      var liHtml = taskHtml(data); // convert JS representation into HTML rep'n
      var $li = $("#listItem-" + data.id); // extract HTML element from page with jQuery
      $li.replaceWith(liHtml); // replace original HTML with newly-generated HTML
      $('.toggle').change(toggleTask); /* New item on page AFTER setup of click handler
      means click handler must be re-registered to toggle the items */
    } );
  }

  jQuery.get("/tasks").success( function(data) {
    var htmlString = "";

    jQuery.each(data, function(index, task) {
      htmlString += taskHtml(task);
    });
    var ulTodos = jQuery('.todo-list');
    ulTodos.html(htmlString);

    jQuery('.toggle').change(toggleTask);

    jQuery('.todo-list').sortable({});
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
      var htmlString = taskHtml(data); // convert JS representation of task into HTML rep'n
      var ulTodos = $('.todo-list'); // jQuery extracts item from page...
      ulTodos.append(htmlString); // ...and then appends item to bottom of the list
      $('.toggle').click(toggleTask); // added click handler so checkbox clicking is recorded
      $('.new-todo').val(''); // Clears the input box after entering a task
    });
  });
});