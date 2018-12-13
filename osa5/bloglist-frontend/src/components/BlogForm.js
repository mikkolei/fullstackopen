import React from 'react'

const BlogForm = ({ title, author, url, handleFieldChange, addNewBlog }) => {
  return(
    <div>
      <form onSubmit={addNewBlog}>
        <div>
          title:
          <input 
            type="text"
            name="title"
            value={title}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          author:
          <input 
            type="text"
            name="author"
            value={author}
            onChange={handleFieldChange}
          />  
        </div>
        <div>
          url:
          <input
            type="text"
            name="url"
            value={url}
            onChange={handleFieldChange}
          />  
        </div>
        <button type="submit">Add blog</button>
      </form>
    </div>
  )
  
}

export default BlogForm