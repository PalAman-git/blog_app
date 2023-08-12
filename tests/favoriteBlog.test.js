const favoriteBlog = require("../utils/list_helper").favoriteBlog;

describe("favorite ", () => {
  //for checking the favorite with zero blogs
  const ZeroBlog = [];
  test("of zero blog is null", () => {
    expect(favoriteBlog(ZeroBlog)).toBe(null);
  });

  //for checking the favorite of one blog
  const OneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];
  test("of one blog is that itself", () => {
    expect(favoriteBlog(OneBlog)).toStrictEqual({
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });

  //for checking the favorite among multiple blogs
  const Multipleblog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Deep Work",
      author: "MIss",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 3,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Atomic Habbit",
      author: "Fuddu",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 4,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Limitless",
      author: "Kiwk",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 2,
      __v: 0,
    },
  ];
  test("of multiple blog is right", () => {
    expect(favoriteBlog(Multipleblog)).toStrictEqual({
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });
});
