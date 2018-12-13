import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
jest.mock('./services/blogs')

describe('<App />', () => {
  let app

  describe('when user is not logged in', () => {
    beforeEach(() => {
      app = mount(<App />)
    })

    it('only loginform is shown', () => {
      app.update()
      const blogComponents = app.find(Blog)
      const loginForm = app.find(LoginForm)

      expect(blogComponents.length).toEqual(0)
      expect(loginForm).toHaveLength(1)  
    })
  })

  describe('when user is logged in', () => {
    beforeEach(() => {
      const user = {
        username: "testguest",
        password: "secret",
        name: "Guest the tester",
        token: 123
      }
      localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      app = mount(<App />)
    })

    it('list of blogs is shown', () => {
      app.update()

      expect(app.find(LoginForm)).toHaveLength(0)
      expect(app.find(BlogForm)).toHaveLength(1)
    })
  })


})