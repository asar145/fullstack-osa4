const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let amount = 0
  blogs.forEach(blog => {
    amount = amount + blog.likes
  });
  return amount
}

const favorteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }
  let currentIndex = 0
  let favIndex = 0
  let maxAmount = 0
  blogs.forEach(blog => {
    if (blog.likes > maxAmount) {
      maxAmount = blog.likes
      favIndex = currentIndex
    }
    currentIndex = currentIndex + 1
  });
  return {
    title: blogs[favIndex].title,
    author: blogs[favIndex].author,
    likes: blogs[favIndex].likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  } 
  let people = []
  let noMatch = true
  blogs.forEach(blog => {
    people.forEach(person => {
      if (person.author === blog.author) {
        noMatch = false
        person.blogs = person.blogs + 1
      }
    });
    if (noMatch) {
      people.push({author:blog.author,blogs:1})
    }
    noMatch = true
  });
  let currentIndex = 0
  let favIndex = 0
  let maxAmount = 0
  people.forEach(person => {
    if (person.blogs > maxAmount) {
      maxAmount = person.blogs
      favIndex = currentIndex
    }
    currentIndex = currentIndex + 1
  });
  return people[favIndex]
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  } 
  let people = []
  let noMatch = true
  blogs.forEach(blog => {
    people.forEach(person => {
      if (person.author === blog.author) {
        noMatch = false
        person.likes = person.likes + blog.likes
      }
    });
    if (noMatch) {
      people.push({author:blog.author,likes:blog.likes})
    }
    noMatch = true
  });
  let currentIndex = 0
  let favIndex = 0
  let maxAmount = 0
  people.forEach(person => {
    if (person.blogs > maxAmount) {
      maxAmount = person.likes
      favIndex = currentIndex
    }
    currentIndex = currentIndex + 1
  });
  return people[favIndex]
}

module.exports = {
  dummy,
  totalLikes,
  favorteBlog,
  mostLikes,
  mostBlogs
}