$(function() {


  // The taskHtml method takes in a JavaScript representation
  // of the task and produces an HTML representation using
  // <li> tags
  function addTaskHtml(task, listElement) {
    var checkedStatus = task.done ? "checked" : ""; // Either-Or
    var liClass = task.done ? "completed" : "";
    var subTasks = task.tasks;
    var newTaskHTML =
        '<li id="listItem-' + task.id + '" data-id="' + task.id +'" data-row-order="' + task.row_order + '" class="' + liClass + '">' +
        '<div class="view"><input class="toggle" type="checkbox"' + " data-id='" + task.id +
        "'" + checkedStatus + '><label>' + task.title + '</label></div></li>';

    listElement.append(newTaskHTML);

    // $( ".todo-list" ).sortable({ connectWith: ".todo-list"}).disableSelection();
  
    if(subTasks && subTasks.length > 0) {
      $("#listItem-"+task.id).append('<ul class="todo-list" data-list-id="' + task.id + '" id="subList-' + task.id + '"></ul>');

      jQuery.each(subTasks, function(index, subTask) { // loop thru each subtask of current task
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
    var baseUrl = $('.todo-list').data('base-url');

    $.post(baseUrl + itemId, {
      _method: "PUT",
      task: {
        done: doneValue
      }
    }).success(function(data) {
      var taskElement = $("#listItem-" + data.id); // extract HTML element from page with jQuery
      taskElement.toggleClass('completed');
    });
  }

  
  var baseUrl = $('.todo-list').data('base-url');
  jQuery.get(baseUrl).success( function(data) { //call success method on obj that $.get returns
    var rootListElement = jQuery('.todo-list');

    jQuery.each(data, function(index, task) { // loops through each task in the database,
      addTaskHtml(task, rootListElement); // adds a task's HTML to an existing list element
    });
    
    jQuery('.toggle').change(toggleTask); // the click-handler thing

    jQuery('.todo-list').sortable({//implement 'sortable' on DOM element with class of todo-list
      connectWith: '.todo-list',
      update: function(e, ui) { // jQuery triggers function when task is reordered (updated)
                                // ui.item is the JS representation of the task that's moved
        var itemId = ui.item.data('id');
        var baseUrl = $('.todo-list').data('base-url');
    
        var newOrder = 0;
        var itemAboveOrder = ui.item.prev().data('row-order');
       
        if(itemAboveOrder != undefined) {
          newOrder = itemAboveOrder + 1;
        }

        var parentListId = ui.item.parent('ul').data('list-id');
        if(parentListId === undefined) {
          parentListId = null;
        }
 
        $.post(baseUrl + itemId, {
           _method: "PUT",
          task: { 
            task_id: parentListId,
            row_order: newOrder
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
    var baseUrl = $('.todo-list').data('base-url');
    $.post(baseUrl, payload).success(function(data) {
      var rootListElement = jQuery('.todo-list');
      addTaskHtml(data, rootListElement);
     
      $('.new-todo').val(''); // Clears the input box after entering a task
    });
  });
});