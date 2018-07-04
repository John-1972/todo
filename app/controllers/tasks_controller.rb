class TasksController < ApplicationController
  def index
    @tasks = Task.where(task_id: nil).rank(:row_order)
    respond_to do |format|
      # format.json { }
      format.json { render json: Task.rank(:row_order) }
      format.html { }
    end
  end

  def update
    task = Task.find(params[:id])
    task.update_attributes(task_params)
    render json: task
  end

  def create
    task = Task.create(task_params)
    render json: task
  end

  private

  def task_params
    params.require(:task).permit(:done, :title, :row_order) # Added 'row_order' here
  end
end
