# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Seeds.rb text: (I've manually added 'id' numbers. I don't know if Rails will allow this.)

user = User.new(
  email: 'jack_r_henderson@yahoo.co.uk', 
  password: 'top-secret', 
  password_confirmation: 'top-secret'
)
# user.skip_confirmation!
user.save!

Todolist.create(name: 'Chores', user_id: '1')
Todolist.create(name: 'Coding', user_id: '1')

Task.create(title: 'Vacuum the carpet', done: 'false', todolist_id: '1')
Task.create(title: 'Wash the dishes', done: 'false', todolist_id: '1')
Task.create(title: 'Fetch the clothes', done: 'false', todolist_id: '1')
Task.create(title: 'Get detergent', done: 'false', todolist_id: '1')
Task.create(title: 'Do the laundry', done: 'false', todolist_id: '1')
Task.create(title: 'Javascript', done: 'false', todolist_id: '2')
Task.create(title: 'Codewars', done: 'false', todolist_id: '2')
Task.create(title: 'Ruby', done: 'false', todolist_id: '2')