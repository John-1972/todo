class StaticPagesController < ApplicationController
  def index
    if current_user
      redirect_to todolists_url
    # else
    # redirect_to views/static_pages/index.html.erb
    end
  end
end
