const mostBlogs = require("../utils/list_helper").mostBlogs;

describe("most blog ", () => {
  
  //testing for most blogs by an author among one blog
  const OneBlog = [{ author: "Author A", title: "Blog 1" }];
  test("by a author for one blog is 1",() => {
    expect(mostBlogs(OneBlog)).toStrictEqual({
        author:"Author A",
        blogs:1
    })
  })

  //testing the most blogs by an author among multiple blogs
  const MultipleBlogs = [
    { author: "Author A", title: "Blog 1" },
    { author: "Author B", title: "Blog 2" },
    { author: "Author A", title: "Blog 3" },
    { author: "Author C", title: "Blog 4" },
    { author: "Author B", title: "Blog 5" },
    { author: "Author A", title: "Blog 6" },
  ];
  test(" by a author for multiple blog is right", () => {
    expect(mostBlogs(MultipleBlogs)).toStrictEqual({
      author: "Author A",
      blogs: 3,
    });
  });
});
