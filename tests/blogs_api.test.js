const mongoose = require('mongoose')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('../utils/test_helper')


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('API get tests', () => {
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blog objects have a key named id, instead of _id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('API post tests', () => {
  test('a valid blog can be added ', async () => {
    await User.deleteMany({})

    const user = new User({
      username: 'FFGG',
      name: 'F G',
      password: 'salasana',
      blogs: []
    })
  
    const savedUser = await user.save()

    const userForToken = {
      username: savedUser.username,
      id: savedUser.id,
    }
  
    const token = jwt.sign(userForToken, process.env.SECRET)

    const newBlog = {
      title: 'F G blog',
      author: 'F G',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(r => r.title)
    expect(contents).toContain(
      'F G blog'
    )
  })

  test('a blog with no likes can be added and has 0 by default ', async () => {
    await User.deleteMany({})

    const user = new User({
      username: 'FFGG',
      name: 'F G',
      password: 'salasana',
      blogs: []
    })
  
    const savedUser = await user.save()

    const userForToken = {
      username: savedUser.username,
      id: savedUser.id,
    }
  
    const token = jwt.sign(userForToken, process.env.SECRET)

    const newBlog = {
      title: 'F G blog',
      author: 'F G',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsAtEnd[helper.initialBlogs.length].likes).toBeDefined() //last one is the most recently added
    expect(blogsAtEnd[helper.initialBlogs.length].likes).toEqual(0)
  })

  test('a blog with no title cannot be added ', async () => {
    await User.deleteMany({})

    const user = new User({
      username: 'FFGG',
      name: 'F G',
      password: 'salasana',
      blogs: []
    })
  
    const savedUser = await user.save()

    const userForToken = {
      username: savedUser.username,
      id: savedUser.id,
    }
  
    const token = jwt.sign(userForToken, process.env.SECRET)

    const newBlog = {
      author: 'F G',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('a blog with no url cannot be added ', async () => {
    await User.deleteMany({})

    const user = new User({
      username: 'FFGG',
      name: 'F G',
      password: 'salasana',
      blogs: []
    })
  
    const savedUser = await user.save()

    const userForToken = {
      username: savedUser.username,
      id: savedUser.id,
    }
  
    const token = jwt.sign(userForToken, process.env.SECRET)
    
    const newBlog = {
      title: 'F G blog',
      author: 'F G',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('a blog cannot be added without authorization', async () => {
    const newBlog = {
      title: 'F G blog',
      author: 'F G',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('API delete tests', () => {
  test('a blog can be deleted ', async () => {
    await User.deleteMany({})

    const user = new User({
      username: 'FFGG',
      name: 'F G',
      password: 'salasana',
      blogs: []
    })
  
    const savedUser = await user.save()

    const userForToken = {
      username: savedUser.username,
      id: savedUser.id,
    }
  
    const token = jwt.sign(userForToken, process.env.SECRET)

    const newBlog = {
      title: 'F G blog',
      author: 'F G',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)

    const blogsAtStart = await helper.blogsInDb()
    expect(blogsAtStart).toHaveLength(helper.initialBlogs.length + 1)
  
    await api
      .delete(`/api/blogs/${blogsAtStart[2].id}`) //third on the array is the latest added blog
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('a blog cannot be deleted without authorization', async () => {
    await User.deleteMany({})

    const user = new User({
      username: 'FFGG',
      name: 'F G',
      password: 'salasana',
      blogs: []
    })
  
    const savedUser = await user.save()

    const userForToken = {
      username: savedUser.username,
      id: savedUser.id,
    }
  
    const token = jwt.sign(userForToken, process.env.SECRET)

    const newBlog = {
      title: 'F G blog',
      author: 'F G',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)

    const blogsAtStart = await helper.blogsInDb()
    expect(blogsAtStart).toHaveLength(helper.initialBlogs.length + 1)
  
    await api
      .delete(`/api/blogs/${blogsAtStart[2].id}`) //third on the array is the latest added blog
      .expect(401)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  })
})

describe('API put tests', () => {
  test('a blog can be modified ', async () => {
   
    const blogsAtStart = await helper.blogsInDb()
    const editedBlog = blogsAtStart[0]
    editedBlog.title = 'edited title'
    editedBlog.author = 'edited author'
    editedBlog.url = 'edited url'
    editedBlog.likes = editedBlog.likes + 100
  
    await api
      .put(`/api/blogs/${blogsAtStart[0].id}`)
      .send(editedBlog)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).toContain('edited title')
    const authors = blogsAtEnd.map(r => r.author)
    expect(authors).toContain('edited author')
    const urls = blogsAtEnd.map(r => r.url)
    expect(urls).toContain('edited url')
    const allLikes = blogsAtEnd.map(r => r.likes)
    expect(allLikes).toContain(105)
  })
})

afterAll(() => {
  mongoose.connection.close()
})