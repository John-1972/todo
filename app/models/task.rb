class Task < ApplicationRecord
  include RankedModel
  ranks :row_order, with_same: [:todolist_id, :task_id]
  
  has_many :tasks, -> { order(row_order: :asc) }
  belongs_to :todolist
end