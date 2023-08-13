const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const Blog = require("../model/blog");

const initialBlogs = [
  {
    title: 'Sleep is dream',
    author: 'Aman',
    url:'james@aman',
    likes:3
  },
  {
    title: 'React is dream',
    author: 'Lord',
    url:'lord@lord',
    likes:9
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test("notes are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two blogs", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(2);
});

test('the first note is about Sleep is dream', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body[0].title).toBe('Sleep is dream')
  })

afterAll(async () => {
  await mongoose.connection.close();
});
