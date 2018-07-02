class Task < ApplicationRecord
  include RankedModel
  ranks :row_order
  # I'll need another property here; parent_task_id

  #has_many :tasks, 
end
