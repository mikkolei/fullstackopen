const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.map(blog => blog.likes)
    return likes.reduce((sum, like) => sum + like, 0)
}

const favoriteBlog = (blogs) => {
    let favorite = blogs[0]

    blogs.map(blog => {
        if(blog.likes > favorite.likes) {
            favorite = blog
        }
    })
    const returnBlog = {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
    return returnBlog
}

const mostBlogs = (blogs) => {
    const authors = blogs.map(blog => blog.author)
    let counts = {}
    for (let i = 0; i < authors.length; i++) {
        const current = authors[i]
        counts[current] = counts[current] ? counts[current] + 1 : 1
    }
    let authorWithMostBlogs
    let maxCount = 0
    for (let i = 0; i < authors.length; i++) {
        const current = authors[i]
        if (counts[current] > maxCount) {
            console.log(current)
            console.log(counts[current])
            maxCount = counts[current]
            authorWithMostBlogs = current
        }
    }
    return ({
        author: authorWithMostBlogs,
        blogs: maxCount
    })
}
const mostLikes = (blogs) => {
    const authors = blogs.map(blog => blog.author)
    let counts = {}
    for (let i = 0; i < authors.length; i++) {
        const current = authors[i]
        counts[current] = counts[current] ? counts[current] + blogs[i].likes : blogs[i].likes
    }
    let authorWithMostLikes
    let maxCount = 0
    for (let i = 0; i < authors.length; i++) {
        const current = authors[i]
        if (counts[current] > maxCount) {
            console.log(current)
            console.log(counts[current])
            maxCount = counts[current]
            authorWithMostLikes = current
        } 
    }
    return ({
        author: authorWithMostLikes,
        likes: maxCount
    })
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}