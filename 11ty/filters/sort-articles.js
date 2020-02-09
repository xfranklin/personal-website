function sortArticles(posts) {
  return posts.sort((a, b) => b.data.date - a.data.date);
}
  
module.exports = { sortArticles };  
