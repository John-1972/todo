class TasksController < ApplicationController
  def index
    @tasks = todolist.tasks.where(task_id: nil).rank(:row_order)
    respond_to do |format|
      format.json { render json: @tasks.as_json(include: :tasks) }
      format.html { }
    end
  end

  def update
    task = todolist.tasks.find(params[:id])
    task.update_attributes(task_params)
    render json: task
  end

  def create
    task = todolist.tasks.create(task_params)
    render json: task
  end

  private

  def todolist
    Todolist.find(params[:todolist_id])
  end

  def task_params
    params.require(:task).permit(:done, :title, :row_order, :task_id) # Added 'row_order' here
  end
end
