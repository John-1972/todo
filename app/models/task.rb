class Task < ApplicationRecord
  include RankedModel
  ranks :row_order
  
  has_many :tasks
end
