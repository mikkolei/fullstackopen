import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      title: undefined,
      author: undefined,
      url: undefined,
      error: null,
      username: '',
      password: '',
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  } 

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user})
    } catch (exception) {
      this.setState({
        error: 'username or password is wrong'
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    this.setState({ username: '', password: '', user: null })
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  addNewBlog = async (event) => {
    event.preventDefault()
    this.blogForm.toggleVisibility()
    try {
      const blogObject = {
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      }
  
      const res = await blogService.create(blogObject)
      this.setState({
        title: '',
        author: '',
        url: '',
        blogs: this.state.blogs.concat(res),
        error: `${res.title} by ${res.author} created`
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    } catch (exception) { 
      this.setState({ error: 'blog creation failed' })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  likeBlog = (id) => {
    return async () => {
      try {
        const blog = this.state.blogs.find(b => b._id === id)
        const likedBlog = { ...blog, user: blog.user, likes: blog.likes+1 }
        
        await blogService.update(blog._id, likedBlog)
        console.log(likedBlog)
        this.setState({
          blogs: this.state.blogs.map(b => b._id !== blog._id ? b : likedBlog),
          error: 'blog liked successfully'
        })
        setTimeout(() => {
          this.setState({ error: null })
        }, 5000);
      } catch (exception) {
        this.setState({ error: 'something went wrong' })
        setTimeout(() => {
          this.setState({ error: null })
        }, 5000);
      }
    }
  }

  deleteBlog = (id) => {
    return async () => {
      try {
        const blog = this.state.blogs.find(b => b._id === id)
        console.log(blog, id)
        if (window.confirm(`Delete '${blog.title}' by ${blog.author}?`)) {
          await blogService.remove(blog._id)
          this.setState({
            blogs: this.state.blogs.filter(b => b._id !== id),
            error: 'blog removed'
          })
          setTimeout(() => {
            this.setState({ error: null })
          }, 5000);
        }
      } catch (exception) {
        console.log(exception)
        this.setState({error:'something went wrong'})
        setTimeout(() => {
          this.setState({error: null})
        }, 5000);
      }
    }
  }

  render() {
    const blogForm = () => (
      <Togglable buttonLabel="new blog" ref={component => this.blogForm = component}>
        <BlogForm addNewBlog={this.addNewBlog} title={this.state.title} author={this.state.author}
          url={this.state.url} handleFieldChange={this.handleFieldChange} />
      </Togglable>
    )

    const loginForm = () => (
      <Togglable buttonLabel="login">
        <LoginForm username={this.state.username} password={this.state.password} 
          handleFieldChange={this.handleFieldChange} handleSubmit={this.login} />
      </Togglable>
    )

    const sortedBlogs = this.state.blogs.sort((b1, b2) => b2.likes - b1.likes)
    const listSortedBlogs = () => (
      <div>
        {sortedBlogs.map(blog => 
          <Blog key={blog._id} blog={blog} user={this.state.user} likeBlog={this.likeBlog} deleteBlog={this.deleteBlog} />
        )}
      </div>
    )

    return (
      <div>
        <Notification message={this.state.error} />
        {this.state.user === null ? 
          loginForm() :
          <div>
            <p>
              {this.state.user.name} logged in <br></br>
              <button onClick={this.logout}>Logout</button>
            </p>
            <div>
              {blogForm()}
            </div>
            <div>
              <h2>Blogs</h2>
              {listSortedBlogs()}
            </div> 
          </div> 
        }
      </div>
    )
  }
}

export default App;