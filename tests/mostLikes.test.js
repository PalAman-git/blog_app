const mostLikes = require("../utils/list_helper").mostLikes;

describe("most Likes ", () => {
  //for testing the most liked author when there is one blog
  const zeroBlog = [];
  test("of zero blog is null", () => {
    expect(mostLikes(zeroBlog)).toBe(null);
  });

  //for testing the most liked author when there is only one author
  const OneBlog = [{ author: "Author1", likes: 10 }];
  test("of one blog is that author itself", () => {
    expect(mostLikes(OneBlog)).toStrictEqual({
      author: "Author1",
      totalLikes: 10,
    });
  });

  //for testing of the most liked author when multiple author are there
  const MultipleBlogs = [
    { author: "Author1", likes: 10 },
    { author: "Author2", likes: 5 },
    { author: "Author1", likes: 15 },
    { author: "Author3", likes: 8 },
    { author: "Author2", likes: 12 },
  ];
  test("of multiple blog of one author is right", () => {
    expect(mostLikes(MultipleBlogs)).toStrictEqual({
      author: "Author1",
      totalLikes: 25,
    });
  });
});
