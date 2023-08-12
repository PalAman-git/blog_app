const _ = require('lodash');

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum,item) => {
        return sum + item.likes
    },0);
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 0)
        return null
    
    let maxLikes = -1;
    let favorite = null;

    for(const blog of blogs)
    {
        if(blog.likes > maxLikes)
        {
            maxLikes = blog.likes;
            favorite = blog;
        }
    }

    var obj = {
        title:  favorite.title,
        author: favorite.author,
        likes: favorite.likes
      };

    return obj
}

function mostBlogs(blogs) {
  if (_.isEmpty(blogs)) {
    return null;
  }

  const authorCounts = _.countBy(blogs, 'author');
  const topAuthor = _.maxBy(_.keys(authorCounts), author => authorCounts[author]);

  return {
    author: topAuthor,
    blogs: authorCounts[topAuthor]
  };
}

function mostLikes(blogs) {
  if (!Array.isArray(blogs) || blogs.length === 0) {
    return null;
  }

  const authorLikes = _.groupBy(blogs, 'author');

  const authorTotalLikes = _.mapValues(authorLikes, authorBlogs =>
    _.sumBy(authorBlogs, 'likes')
  );

  const mostLikedAuthor = _.maxBy(_.keys(authorTotalLikes), author =>
    authorTotalLikes[author]
  );

  return {
    author: mostLikedAuthor,
    totalLikes: authorTotalLikes[mostLikedAuthor]
  };
}


module.exports = { dummy,totalLikes,favoriteBlog,mostBlogs,mostLikes }