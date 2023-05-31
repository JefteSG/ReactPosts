import React, { useCallback, useEffect, useState } from 'react';

import './styles.css';

import { loadPosts } from '../../utils/load-Posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export const Home = () => {

  const [posts, setPosts] = useState([])
  const [allPosts, setAllPosts] = useState([])
  const [page, setPage] = useState(0)
  const [postsPerPage] = useState(15)
  const [searchValue, setSearchValue] = useState('')

  const noMorePosts = page + postsPerPage >= allPosts.length

  const handleLoadPosts = useCallback(async(page, postsPerPage) => {

    const posts = await loadPosts()

    setPosts(posts.slice(page , postsPerPage))
    setAllPosts(posts)
  }, [])
  const filteredPosts = !!searchValue ? 
  allPosts.filter(post => {
    return post.body.toLowerCase().includes(searchValue.toLowerCase())
  })
  : 
  posts;


  useEffect(() => {
    handleLoadPosts(0, postsPerPage)
  }, [handleLoadPosts, postsPerPage]) 

  const loadMorePosts = () => {

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    
    setPosts(posts)
    setPage(nextPage)
  
  }

  const handleChange = (e) => {
    const { value } = e.target
    setSearchValue(value)
  }

  return (
    <section className='container'>
      <div className='search-container'>
        {!!searchValue && (
          <h2 className='search-title'>Search Results for "<span>{searchValue}</span>"</h2>
        )}

        <TextInput searchValue={searchValue} handleChage={handleChange}/>
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
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}

      </div>

    </section>

  ); 
}