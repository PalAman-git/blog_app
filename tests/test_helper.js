const Blog = require('../model/blog');


const initialBlogs = [
    {
      title: "Sleep is dream",
      author: "Aman",
      url: "james@aman",
      likes: 3,
    },
    {
      title: "React is dream",
      author: "Lord",
      url: "lord@lord",
      likes: 9,
    },
  ];
  

const nonExistingId = async () => {
	const blog = new Blog({ content: 'willremovethissoon' });
	await blog.save();
	await blog.deleteOne();

	return blog._id.toString();
};

const blogsInDb = async () => {
	const blogs = await Blog.find({});
	return blogs.map(blog => blog.toJSON());
};

module.exports = {
	initialBlogs, nonExistingId, blogsInDb
};