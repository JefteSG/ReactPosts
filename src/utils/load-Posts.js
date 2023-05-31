export const loadPosts = async () => {
  try {
    const response = await fetch('http://localhost:3001/posts');
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error('Erro ao carregar os posts:', error);
    throw error;
  }
};
