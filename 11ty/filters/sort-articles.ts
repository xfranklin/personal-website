type Post = {
  data: {
    date?: Date | string | number;
  };
};

function sortArticles(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => {
    const left = a.data.date ? new Date(a.data.date).getTime() : 0;
    const right = b.data.date ? new Date(b.data.date).getTime() : 0;
    return right - left;
  });
}

export { sortArticles };
