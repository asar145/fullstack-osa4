const Blog = require('../models/blog')
const User = require('../models/user')

const initialUsers = [
  {
    "username": "AABB",
    "name": "A B",
    "password": "salasana",
    "blogs": []
  },
  {
    "username": "CCDD",
    "name": "C D",
    "password": "salasana",
    "blogs": []
  }
]

const initialBlogs = [
  {
    title: 'A B blog',
    author: 'A B',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
  {
    title: 'C D blog',
    author: 'C D',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 4
  }
]
  
  const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

  const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }

  module.exports = {
    initialUsers, initialBlogs, blogsInDb, usersInDb
  }