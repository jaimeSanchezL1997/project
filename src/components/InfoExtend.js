import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

const Infoperson = () => {
  const [posts, setPosts] = useState([]);
  const results = {};
  useEffect(() => {
    fetch("https://randomuser.me/api?results=5&noinfo")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPosts(data.results);
      })
      .catch((err) => {
        console.log(err.message);
      });}, []);
  return (
    <div class="column is-two-thirds">
      {posts.map((post,index) => (
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image"/>
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"/>
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">{post.name.tittle}</p>
                <p class="subtitle is-6">{post.email}</p>
                <p class="subtitle is-6">{post.gender}</p>
              </div>
            </div>

            <div class="content">
            <p>Nationality:{post.nat}</p>
              <a href="#">#responsive</a>
              <br />
              <time datetime="2016-1-1">Registrer: {post.registere}</time>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Infoperson;
