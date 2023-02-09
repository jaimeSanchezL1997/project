import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import ReactSearchBox from "react-search-box";

const Person = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(false);
  const [foundUsers, setFoundUsers] = useState(posts);
  const [name, setName] = useState("");
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
      });
  }, []);

  const info = async (e) => {
    const index = e.target.closest(".box").dataset.index;
    setUser(posts[index]);
    console.log(user);
  };

  const handleChange = async (e) => {
    const index = e.target.closest(".box").dataset.index;
    setUser(posts[index]);
    console.log(user);
  };

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = posts.filter((user) => {
        return user.email.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundUsers(results);
    } else {
      setFoundUsers(posts);
      // If the text field is empty, show all users
    }

    setName(keyword);
  };

  return (
    <div class="columns">
      <div class="column is-one-third">
        <div className="container">
          <input type="search" value={name} onChange={filter} className="input" placeholder="Filter" />
          <div className="user-list">
            {foundUsers && foundUsers.length  ? (
              foundUsers.map((post, index) => (    
                  <div class="box" onClick={info} data-index={index}>
                    <article class="media">
                      <div class="media-left">
                        <figure class="image is-64x64">
                          <img src={post.picture.medium} alt="Image" />
                        </figure>
                      </div>
                      <div class="media-content">
                        <div class="content">
                          <p>
                            <strong>{post.name.title}</strong>{" "}
                            <small>{post.name.first}</small>{" "}
                            <small>{post.name.last}</small>
                            <br />
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
                                <i
                                  class="fas fa-retweet"
                                  aria-hidden="true"
                                ></i>
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
              ))
            ) : (
              <h1>No results found!</h1>
            )}
          </div>
        </div>
      </div>
      <div class="column  is-half  ">
        {user ? (
          <div class="card is-centered">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src={user.picture.large} />
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <img
                      src="https://bulma.io/images/placeholders/96x96.png"
                      alt="Placeholder image"
                    />
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-4"></p>
                  <p class="subtitle is-6">{user.email}</p>
                  <p class="subtitle is-6">{user.gender}</p>
                </div>
              </div>
              <div class="content">
                <p>Nationality:{user.nat}</p>

                <br />
                <time datetime="2016-1-1">Registrer: {user.registere}</time>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <img src={user ? user.picture : "./img/mosaico.jpg"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Person;
