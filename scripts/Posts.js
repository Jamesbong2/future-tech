import {initTabs }  from '../scripts/Tabs.js'

function createPostCard (post) {
    return `<li class="list__item">
      <article class="blog-card container">
        <div class="blog-card__author person-card">
          <img src=${post.authorImage} width="80" height="80">
          <div class="person-card__body">
            <p class="person-card__name">
              ${post.author}
            </p>
            <p class="person-card__topic">
             ${post.topic}
            </p>
          </div>
        </div>
        <div class="blog-card__body">
          <time datetime="2023-10-15" class="blog-card__date h6">
           ${post.date}
          </time>
          <div class="blog-card__info">
            <h4 class="blog-card__title">
             ${post.title}
            </h4>
            <div class="blog-card__desc">
             ${post.description}
            </div>
  
          </div>
          <div class="blog-card__actions blog-actions">
            <ul class="blog-actions__list">
              <li class="blog-actions__item">
                <button type="button" class="blog-actions__button is-active">
                  <span class="blog-actions__icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.70414 17.4255L9.6987 17.4226L9.67982 17.4124C9.66375 17.4037 9.64076 17.3911 9.61131 17.3746C9.55243 17.3418 9.4677 17.2937 9.3608 17.2308C9.14708 17.105 8.84431 16.9199 8.48212 16.6791C7.75895 16.1984 6.79268 15.4917 5.82383 14.5886C3.90651 12.8013 1.875 10.1459 1.875 6.875C1.875 4.43495 3.928 2.5 6.40625 2.5C7.86365 2.5 9.1686 3.16591 10 4.20966C10.8314 3.16591 12.1363 2.5 13.5938 2.5C16.072 2.5 18.125 4.43495 18.125 6.875C18.125 10.1459 16.0935 12.8013 14.1762 14.5886C13.2073 15.4917 12.241 16.1984 11.5179 16.6791C11.1557 16.9199 10.8529 17.105 10.6392 17.2308C10.5323 17.2937 10.4476 17.3418 10.3887 17.3746C10.3592 17.3911 10.3363 17.4037 10.3202 17.4124L10.3013 17.4226L10.2959 17.4255L10.2936 17.4268C10.1103 17.5241 9.88974 17.5241 9.70644 17.4268L9.70414 17.4255Z" stroke="#666666" stroke-width="1.5" stroke-linejoin="round"/>
                    </svg>
                      
                  </span>
                  <span>${post.likes}</span>
                </button>
              </li>
              <li class="blog-actions__item">
                <button type="button" class="blog-actions__button">
                  <span class="blog-actions__icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.07167 15.9906C7.95564 16.4235 8.94952 16.6666 10.0002 16.6666C13.6821 16.6666 16.6668 13.6819 16.6668 9.99992C16.6668 6.31802 13.6821 3.33325 10.0002 3.33325C6.31827 3.33325 3.3335 6.31802 3.3335 9.99992C3.3335 11.3667 3.7448 12.6374 4.45038 13.695M7.07167 15.9906L3.3335 16.6666L4.45038 13.695M7.07167 15.9906L7.07709 15.9897M4.45038 13.695L4.45144 13.6922" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                      
                      
                  </span>
                  <span>${post.comments}</span>
                </button>
              </li>
              <li class="blog-actions__item">
                <button type="button" class="blog-actions__button">
                  <span class="blog-actions__icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.36554 11.6345L3.47679 9.41238C2.80399 9.10656 2.83269 8.14126 3.52248 7.87595L15.7501 3.17301C16.4241 2.9138 17.0863 3.57599 16.8271 4.24995L12.1241 16.4776C11.8588 17.1674 10.8935 17.1961 10.5877 16.5233L8.36554 11.6345ZM8.36554 11.6345L12.0195 7.98071" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <span>${post.shares}</span>
                </button>
              </li>
            </ul>
  
          </div>
  
        </div>
  
        <a class="blog-card__link button">
          <span class="icon icon--arrow-yellow">
            View Blog
          </span>
  
        </a>
      </article>
    </li>`
  
  
  }
  
  function renderPostsList (posts,listElement) {
  
  
  
    
    listElement.innerHTML = posts.map(createPostCard).join('')
  
    
  }
  async function fetchPostsByCategory (category) {
  
    const url = 
      category === 'all'  
      ?   'http://localhost:3001/posts' 
      : 
      `http://localhost:3001/posts?category=${category}`
   
    const response = await fetch(url)
    if(!response.ok) {
      throw new Error('Failed to fetch')
    }
    const data = await response.json()
    return data 
  }
export function initPosts () {
    const tabsElement = document.querySelector('[data-js-tabs-root]')
    initTabs(tabsElement , async  ({category,panel}) => {
        const listElement = panel.querySelector('.list')
        try {
            const posts = await fetchPostsByCategory(category)
            renderPostsList(posts,listElement)
    
        } catch(error) {
            console.log(error)
    
        }
    
    
      })

}