const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { format, initialBlogs, nonExistingId, blogsInDb } = require('./test_helper')

describe('when there is initially some blogs saved', async () => {
  beforeAll(async () => {
    await Blog.remove({})
      
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
      
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
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
          
      const response = await api
        .get('/api/blogs')
                
      const contents = response.body.map(r => r.content) 
              
      expect(response.body.length).toBe(initialBlogs.length + 1)
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
    
    
  afterAll(() => {
    server.close()
  })
})