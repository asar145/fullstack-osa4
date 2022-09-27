const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of an empty list', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when there is only one blog', () => {
    const blogs = [{
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }]
    expect(listHelper.totalLikes(blogs)).toBe(5)
  })

  test('when there are multiple blogs', () => {
    const blogs = [{
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },{
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }]
    expect(listHelper.totalLikes(blogs)).toBe(10)
  })
})

describe('favorite blog', () => {
  test('of an empty list', () => {
    expect(listHelper.favorteBlog([])).toEqual({})
  })

  test('when there is only one blog', () => {
    const blogs = [{
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }]
    expect(listHelper.favorteBlog(blogs)).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('when there are multiple blogs', () => {
    const blogs = [{
      _id: '5a422aa71b54a676234d17f8',
      title: 'blog 1',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 3,
      __v: 0
    },{
      _id: '5a422aa71b54a676234d17f8',
      title: 'blog 2',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },{
      _id: '5a422aa71b54a676234d17f8',
      title: 'blog 3',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },{
      _id: '5a422aa71b54a676234d17f8',
      title: 'blog 4',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 2,
      __v: 0
    }]
    expect(listHelper.favorteBlog(blogs)).toEqual({
      title: 'blog 2',
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })
})

describe('author with most blogs', () => {
  test('of an empty list', () => {
    expect(listHelper.mostBlogs([])).toEqual({})
  })

  test('when there is only one blog', () => {
    const blogs = [{
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }]
    expect(listHelper.mostBlogs(blogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })

  test('when there are multiple blogs', () => {
    const blogs = [{
      _id: '5a422aa71b54a676234d17f8',
      title: 'blog 1',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 3,
      __v: 0
    },{
      _id: '5a422aa71b54a676234d17f8',
      title: 'blog 2',
      author: 'P M',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },{
      _id: '5a422aa71b54a676234d17f8',
      title: 'blog 3',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },{
      _id: '5a422aa71b54a676234d17f8',
      title: 'blog 4',
      author: 'K L',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 2,
      __v: 0
    }]
    expect(listHelper.mostBlogs(blogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 2
    })
  })
})

describe('author with most cumulative likes', () => {
  test('of an empty list', () => {
    expect(listHelper.mostLikes([])).toEqual({})
  })

  test('when there is only one blog', () => {
    const blogs = [{
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }]
    expect(listHelper.mostLikes(blogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('when there are multiple blogs', () => {
    const blogs = [{
      _id: '5a422aa71b54a676234d17f8',
      title: 'blog 1',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 3,
      __v: 0
    },{
      _id: '5a422aa71b54a676234d17f8',
      title: 'blog 2',
      author: 'P M',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },{
      _id: '5a422aa71b54a676234d17f8',
      title: 'blog 3',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },{
      _id: '5a422aa71b54a676234d17f8',
      title: 'blog 4',
      author: 'K L',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 6,
      __v: 0
    }]
    expect(listHelper.mostLikes(blogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 8
    })
  })
})

