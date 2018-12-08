const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const { initialBlogs, nonExistingId, blogsInDb, usersInDb } = require('./test_helper')

describe('when there is initially some blogs saved', async () => {
  beforeAll(async () => {
    await Blog.remove({})
      
    let blogObjects = initialBlogs.map(b => new Blog(b))
    await Promise.all(blogObjects.map(b => b.save()))
  }) 

  test('all blogs are returned as json by GET /api/notes', async () => {
    const blogsInDatabase = await blogsInDb()
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(blogsInDatabase.length)
    const returnedBlogTitles = response.body.map(b => b.title)
    blogsInDatabase.forEach(blog => {
      expect(returnedBlogTitles).toContain(blog.title)
    })
  })
  
  describe('addition of a new blog', async () => {
    test('a valid blog can be added', async () => {
      const blogsAtStart = await blogsInDb()

      const newBlog = {
        title: "New Blog",
        author: "Author",
        url: "url",
        likes: 4
      }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
          
      const blogsAfterOperation = await blogsInDb()
                
      const blogTitles = blogsAfterOperation.map(r => r.title) 
              
      expect(blogTitles).toContain('New Blog')
    })
      
    test('when a valid blog is added without likes determined the value is zero', async () => {
      const newBlog = {
        title: "Blog",
        author: "Author",
        url: "url"
      }
      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
          
      expect(response.body.likes).toBe(0)  
    })
      
    test('a blog without url is not created', async () => {
      const newBlog = {
        title: "Title",
        author: "Author"
      }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })
          
    test('a blog without title is not created', async () => {
      const newBlog = {
        author: "Author",
        url: "url"
      }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })
  })

  describe('deletion of a blog', async () => {
    let addedBlog

    beforeAll(async () => {
      addedBlog = new Blog({
        title: "deletable",
        author: "author",
        url: "notreallyurl",
        likes: 2
      })
      await addedBlog.save()
    })

    test('a blog can be deleted', async () => {
      const blogsAtBeginning = await blogsInDb()
      
      await api
        .delete(`/api/blogs/${addedBlog._id}`)
        .expect(204)
      
      const blogsAfterDeletion = await blogsInDb()
      
      const contents = blogsAfterDeletion.map(b => b.title)

      expect(contents).not.toContain(addedBlog.title)
      expect(blogsAfterDeletion.length).toBe(blogsAtBeginning.length - 1)
    })
  })  
  describe('updating a blog', async () => {
    let blogToBeUpdated

    beforeAll(async () => {
      blogToBeUpdated = new Blog({
        title: "title",
        author: "author",
        url: "noturl",
        likes: 4
      })
      await blogToBeUpdated.save()
    })

    test('a blog can be updated', async () => {
      let updatedBlog = blogToBeUpdated
      
      updatedBlog.likes = 10
      await api
        .put(`/api/blogs/${blogToBeUpdated._id}`)
        .send(updatedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(updatedBlog.likes).toBe(10)  
    })
  })

  describe('when there is initially one user at db', async () => {
    beforeAll(async () => {
      await User.remove({})
      const user = new User({ username: 'root', name: 'tester', password: 'sekred', adult: true })
      await user.save()
    })

    test('POST /api/users succeeds with a fresh username', async () => {
      const usersBeforeOperation = await usersInDb()

      const newUser = {
        username: 'newUser',
        name: 'testerdude',
        password: 'secred',
        adult: true
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const usersAfterOperation = await usersInDb()
      expect(usersAfterOperation.length).toBe(usersBeforeOperation.length + 1)
      const usernames = usersAfterOperation.map(u => u.username)
      expect(usernames).toContain(newUser.username)  
    })

    test('POST /api/users fails with proper statuscode and message if username is already taken', async () => {
      const usersBeforeOperation = await usersInDb()

      const newUser = {
        username: 'root',
        name: 'newname',
        password: 'supersecred',
        adult: true
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body).toEqual({ error: 'username must be unique' })
      const usersAfterOperation = await usersInDb()
      expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)  
    })

    test('POST /api/users fails with too short password', async () => {
      const usersBeforeOperation = await usersInDb()
      const newUser = { username: 'userdude', name: 'name', password: "sh", adult: true }
      const result = await api 
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body).toEqual({ error: 'password must be at least 3 characters long' })
      const usersAfterOperation = await usersInDb()
      expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
    })

    test('POST /api/users succeeds and sets adult field to true when it is not defined', async () => {
      const usersBeforeOperation = await usersInDb()
      const newUser = { username: 'dude', name: 'name', password: 'goodenough' }
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(result.body.adult).toBe(true)  
    })
  })
    
    
  afterAll(() => {
    server.close()
  })
})