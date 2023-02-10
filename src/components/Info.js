import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import ReactSearchBox from "react-search-box";

const Person = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(false);
  const [foundUsers, setFoundUsers] = useState(posts);
  const [mail, setMail] = useState("");
  const [fullname,setfullname] = useState("");
  const results = {};
  useEffect(() => {
    fetch("https://randomuser.me/api?results=10&noinfo")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPosts(data.results);
        setFoundUsers(data.results);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const info = async (e) => {
    const index = e.target.closest(".box").dataset.index;
    console.log(index);
    const infoUserSingle = posts.find(post => post.email === index);
    setUser(infoUserSingle);
    setfullname(infoUserSingle.name.title + " "+ infoUserSingle.name.first + " "+ infoUserSingle.name.last );
  };
  
  const filter = (e) => {
    const keyword = e.target.value;
    if (keyword !== "") {
      const results = posts.filter(user => {
        return user.email.toLowerCase().startsWith(keyword.toLowerCase())
      });
      setFoundUsers(results);
    } else {
      setFoundUsers(posts);
    }

    setMail(keyword);
  };
  const exit = async (e) => {
    setUser(false);
  }
  return (
    <div class="columns">
      <div class="column is-one-third">
        <div className="container" >
          <input type="search" value={mail} onChange={filter} className="input" placeholder="Search email" />
          <div className="user-list  user">
            {foundUsers && foundUsers.length  ? (
              foundUsers.map((post, index) => (
                  <div class="box m-0 info"  onClick={info} data-index={post.email}>
                    <article class="media">
                      <div class="media-left">
                        <figure class="image is-64x64">
                          <img src={post.picture.large} alt="Image" />
                        </figure>
                      </div>
                      <div class="media-content">
                        <div class="content">
                          <p>
                            <strong>{post.name.title+" " +post.name.first + " " + post.name.last}</strong>
                          
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
      <div class="column  is-two-thirds ">
        {user ? (
          <div class="card is-centered">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image ">
                    <img src={user.picture.large}/>
                  </figure>
                </div>
                <div class="media-right" onClick={exit}>
                    <p>X</p>
                  </div>
                <div class="media-content">
                  <p class="title is-4">{fullname}</p>
                  <p class="subtitle is-6">@{user.login.username}</p>
                  <p class="subtitle is-6">{user.gender}</p>
                  <p>{user.dob.age}</p>
                </div>
              </div>
              <div class="content">
                <p class="title is-4">Contact</p>
                <p  class="">Phone number: {user.phone}</p>
                <p class="">Email:{user.email}</p>
                <p class="subtitle is-6">Adress:</p>
                <p>{user.location.street.name}{user.location.street.number}</p>
                <p>{user.location.city}{user.location.state}{user.location.country}</p>
                <p>{user.location.postcode}</p>
                <p>Nationality:{user.nat}</p>
                <br />
                <p >Registrer: {user.registered.date}</p>
              </div>
            </div>
          </div>
        ) : (
          <div class="noinfo" >
            
          </div>
        )}
      </div>
    </div>
  );
};

export default Person;
