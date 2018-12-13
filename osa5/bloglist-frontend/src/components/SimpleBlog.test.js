import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  const blog = {
    title: 'testtitle',
    author: 'testauthor',
    url: 'testurl',
    likes: 2
  }

  it('renders content', () => {
    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const contentDiv = blogComponent.find('.content')

    expect(contentDiv.text()).toContain(blog.title)
    expect(contentDiv.text()).toContain(blog.author)
  })

  it('clicking twice like calls the respective function twice', () => {
    const mockHandler = jest.fn()
    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler}/>)
    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')
    expect(mockHandler.mock.calls.length).toBe(2)
  })
})