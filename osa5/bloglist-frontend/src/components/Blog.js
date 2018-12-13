import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      extend: false
    }
  }

  clickToExtend = () => {
    this.setState({ extend: !this.state.extend })
  }

  render () {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    return (
      <div style={blogStyle} className="content">
        {this.state.extend ?
          <div onClick={this.clickToExtend} >
            <p className="click">{this.props.blog.title} {this.props.blog.author}</p>
            <a href={this.props.blog.url}>{this.props.blog.url}</a>
            <p>{this.props.blog.likes} likes
              <button value={this.props.blog} onClick={this.props.likeBlog(this.props.blog._id)}>like</button>
            </p>
            <p>Added by {this.props.user.name}</p>
            <button value={this.props.blog} onClick={this.props.deleteBlog(this.props.blog._id)}>delete</button>
          </div> 
          :
          <div onClick={this.clickToExtend}>
            {this.props.blog.title} {this.props.blog.author}
          </div>  
        }
      </div>  
    )
  }

}

export default Blog