import './styles.css';
import { Component } from 'react';

import { loadPosts } from '../../utils/load-Posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export class Home extends Component {
  state = {
      posts: [],
      allPosts: [],
      page: 0,
      postsPerPage: 15,
      searchValue: ''
  }

  async componentDidMount() {
    await this.loadPosts();
  }
  loadPosts = async() => {
    const { page, postsPerPage} = this.state
    
    const postsAndPhotos = await loadPosts()
    this.setState({ 
      posts: postsAndPhotos.slice(page , postsPerPage),
      allPosts: postsAndPhotos,
    })
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    
    this.setState({ posts, page: nextPage });
  
  }

  handleChage = (e) => {
    const { value } = e.target
    this.setState({ searchValue: value})
  }

  render(){
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state
    const noMorePosts = page + postsPerPage >= allPosts.length
    const filteredPosts = !!searchValue ? 
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase())
    })
    : 
    posts;
    return (
      <section className='container'>
        <div className='search-container'>
          {!!searchValue && (
            <h2 className='search-title'>Search Results for "<span>{searchValue}</span>"</h2>
          )}

          <TextInput searchValue={searchValue} handleChage={this.handleChage}/>
        </div>
        {filteredPosts.length > 0 && (
            <Posts posts={filteredPosts} />
        )}
        {filteredPosts.length === 0 && (
          <p>Não existem posts disponiveis =( </p>
        )}
        <div className='button-container'>
          {!searchValue && (
            <Button 
              text='Load more posts'
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}

        </div>

      </section>

    );   
  }
}


export default Home;
