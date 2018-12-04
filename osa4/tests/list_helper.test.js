const listHelper = require('../utils/list_helper')

describe.skip('list helpers', () => {
    test('dummy is called', () => {
        const blogs = []

        const result = listHelper.dummy(blogs)
        expect(result).toBe(1)
    })

    describe('total likes', () => {
        test('is zero when the list is empty', () => {
            const result = listHelper.totalLikes([])
            expect(result).toBe(0)
        })

        test('when list has only one blog equals to the likes of that', () => {
            const listOfOneBlog = [
                {
                    _id: '5a422aa71b54a676234d17f8',
                    title: 'Go To Statement Considered Harmful',
                    author: 'Edsger W. Dijkstra',
                    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                    likes: 5,
                    __v: 0
                }
            ]
            const result = listHelper.totalLikes(listOfOneBlog)
            expect(result).toBe(5)
        })
        test('of a list that contains several blogs is correct', () => {
            expect(listHelper.totalLikes(blogs)).toBe(36)
        })
    })

    describe('favorite blog', () => {
        test('is found when the list contains multiple blogs',  () => {
            const result = {
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                likes: 12
            }
            expect(listHelper.favoriteBlog(blogs)).toEqual(result)
        })
    })

    describe('most blogs', () => {
        test('author with most blogs is found correctly when list contains multiple blogs', () => {
            const result = {
                author: "Robert C. Martin",
                blogs: 3,
            }
            expect(listHelper.mostBlogs(blogs)).toEqual(result)
        })
    })

    describe('author with most likes', () => {
        test('is found correctly when list contains multiple blogs', () => {
            const result = {
                author: "Edsger W. Dijkstra",
                likes: 17
            }
            expect(listHelper.mostLikes(blogs)).toEqual(result)
        })
    }) 
})


const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]