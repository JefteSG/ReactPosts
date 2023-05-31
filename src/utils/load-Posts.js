export const loadPosts = async () => {
  try {
    const response = await fetch('https://posts-52geqcmze-jeftesg.vercel.app/posts');
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error('Erro ao carregar os posts:', error);
    throw error;
  }
};
