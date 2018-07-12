class TodolistsController < ApplicationController

  def index
    @todolists = current_user.todolists
    # lists all the to-do lists for the current_user
  end

  def show
    @todolist = Todolist.find(params[:id])
    # shows a single to-do list
  end
end
