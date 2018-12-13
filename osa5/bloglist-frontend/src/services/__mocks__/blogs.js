let token = null

const blogs = [
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    user: {
      _id: "5c0ada6723364948c97b20f6",
      username: "username",
      name: "empty"
    }
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    user: {
      _id: "5c0ada6723364948c97b20f6",
      username: "username",
      name: "empty"
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = (newToken) => {

}

export default { getAll, blogs, setToken }