class TodolistsController < ApplicationController

  def index
    @todolists = current_user.todolists
    # lists all the to-do lists for the current_user
  end

  def show
    @todolist = Todolist.find(params[:id])
    # shows a single to-do list
  end

  def new
    @todolist = Todolist.new
  end

  def create
    # @todolist = Todolist.create(todolist_params.merge(user: current_user))

    # or the above and then check if @todolist.valid?
    @todolist = Todolist.new(todolist_params)
    @todolist.user = current_user
    if @todolist.save
      redirect_to todolist_path(@todolist)
    else
      render :new
    end
  end

  def destroy
    @todolist = Todolist.find(params[:id])
    if @todolist.user == current_user
      @todolist.destroy
      redirect_to todolists_path
    else
      redirect_to todolists_path
    end
  end

  private

  def todolist_params
    params.require(:todolist).permit(:name, :current_user)
  end
end
