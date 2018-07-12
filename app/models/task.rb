class Task < ApplicationRecord
  include RankedModel
  ranks :row_order, with_same: :task_id
  
  has_many :tasks
  belongs_to :todolist
end
