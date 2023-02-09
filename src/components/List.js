import React, { useState, useEffect } from 'react'
import ReactDOM from "react-dom/client";
import Info from "./Info"

const List = () => {
    const [posts, setPosts] = useState([]);
    const [user,setUser] = useState(false);
    const results={};
    useEffect(() => {
       fetch('https://randomuser.me/api?results=5&noinfo')
          .then((response) => response.json())
          .then((data) => {
             console.log(data);
             setPosts(data.results);
             
          })
          .catch((err) => {
             console.log(err.message);
          });
    }, []);
    
    return (
        <ul>
            {posts.map((post,index) => (
          <li>
          <div class="box"   data-index={index} >
          <article class="media">
            <div class="media-left">
              <figure class="image is-64x64">
                <img src={post.picture.medium} alt="Image"/>
              </figure>
            </div>
            <div class="media-content" >
              <div class="content">
                <p>
                  <strong>{post.name.title}</strong> <small>{post.name.first}</small> <small>{post.name.last}</small>
                  <br/>
                  <p>Email:{post.email}</p>
                </p>
              </div>
              <nav class="level is-mobile">
                <div class="level-left">
                  <a class="level-item" aria-label="reply">
                    <span class="icon is-small">
                      <i class="fas fa-reply" aria-hidden="true"></i>
                    </span>
                  </a>
                  <a class="level-item" aria-label="retweet">
                    <span class="icon is-small">
                      <i class="fas fa-retweet" aria-hidden="true"></i>
                    </span>
                  </a>
                  <a class="level-item" aria-label="like">
                    <span class="icon is-small">
                      <i class="fas fa-heart" aria-hidden="true"></i>
                    </span>
                  </a>
                </div>
              </nav>
            </div>
          </article>
        </div>
        </li>
      ))}
        </ul>
    )
}

export default List