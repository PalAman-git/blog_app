const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const helper = require("./test_helper");
const Blog = require("../model/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
});

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

test("the first note is about Sleep is dream", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0].title).toBe("Sleep is dream");
});

test("the unique identifier property of the blog posts is named id", async () => {
  const blogPosts = await api.get("/api/blogs");

  for (const post of blogPosts.body) {
    expect(post.id).toBeDefined(); //check if the 'id' property is defined;
    expect(post._id).toBeUndefined(); //check if the '_id' property is undefined;
  }
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "Give me some Sunshine",
    author: "Gandmra",
    url: "give@give",
    likes: 3,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogPosts = await api.get("/api/blogs");
  expect(blogPosts.body).toHaveLength(helper.initialBlogs.length + 1);

  const blogs = blogPosts.body.map((blog) => blog.title);
  expect(blogs).toContain("Give me some Sunshine");
});

test("default value of like is 0", async () => {
  const newBlog = {
    title: "Deep Work",
    author: "Gaurav",
    url: "fault@fault",
  };

  const blog = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  expect(blog.body.likes).toBe(0);
});

test("error on title or url missing", async () => {
  const newBlog = {
    title: "Give it",
    author: "Aman",
    likes: 7,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
});

test("a blog can be deleted", async () => {
  const blogAtStart = await helper.blogsInDb();
  const blogToDelete = blogAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogAtEnd = await helper.blogsInDb();
  expect(blogAtEnd).toHaveLength(helper.initialBlogs.length - 1);

  const Titles = blogAtEnd.map((r) => r.title);
  expect(Titles).not.toContain(blogToDelete.title);
});

test("a valid blog can be updated", async () => {
  const blogAtStart = await helper.blogsInDb();
  const blogToUpdate = blogAtStart[0];

  const blog = {
    title: "Sleep is dream",
    author: "Aman",
    url: "james@aman",
    likes: 2,
  };

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(blog).expect(201);

  const updatedBlog = await Blog.findById(blogToUpdate.id);
  expect(updatedBlog.likes).toBe(2);
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  const titles = blogsAtEnd.map(r => r.title);
  expect(titles).toContain('Sleep is dream');
});

afterAll(async () => {
  await mongoose.connection.close();
});
