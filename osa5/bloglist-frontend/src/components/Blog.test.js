import React from 'react'
import { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Blog from './Blog'

describe('<Blog />', () => {
  let blog
  let blogComponent
  
  beforeAll(() => {
    blog = {
      title: "testing",
      author: "newauthor",
      likes: 3
    }
  })

  beforeEach(() => {
    blogComponent = shallow(
      <Blog blog={blog} />
    )
  })

  it('at the start only title and author are shown', () => {
    const div = blogComponent.find('.content')

    expect(div.text()).toContain(blog.title)
    expect(div.text()).toContain(blog.author)
    expect(div.text()).not.toContain(blog.likes)
  })

  it('after clicking more information is shown', () => {
    const div = blogComponent.find('.content')

    div.simulate('click')
    const clickedDiv = blogComponent.find('.content')
    console.log(clickedDiv.html())
    console.log(clickedDiv.text())

    expect(clickedDiv.text()).toContain(blog.title)
    expect(clickedDiv.text()).toContain(blog.author)
    // expect(clickedDiv.text()).toContain(blog.likes)
  })
}) 