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
  const close = async (e) => {
    setUser(false);
  }
  return (
    <div class="columns">
      <div class="column is-one-third">
        <div className="container" >
          <div class="input-icon">
            
            <input type="search" value={mail} onChange={filter} className="input input-field" placeholder="Search mail" />
          </div>
          
          <div className="user-list  user">
            {foundUsers && foundUsers.length  ? (
              foundUsers.map((post, index) => (
                  <div class="box m-0 info"  onClick={info} data-index={post.email}>
                    <article class="media">
                      <div class="media-left">
                        <figure class="image is-64x64">
                          <img class="imgsmall" src={post.picture.large} alt="Image" />
                        </figure>
                      </div>
                      <div class="media-content">
                        <div class="content">
                          <p class="has-text-white">
                            {post.name.title+" " +post.name.first + " " + post.name.last}
                            <br />
                            @ {post.login.username}
                            <p>Email: {post.email}</p>
                          </p>
                        </div>
                        
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
          <div class="card ">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image ">
                    <img class ="imgsmall"src={user.picture.large}/>
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-1 m-0">{fullname}</p>
                  <p class="subtitle is-3 m-0">@{user.login.username}</p>
                  <p class=" subtitle is-6"><strong>Gender:</strong> {user.gender}&nbsp;<strong>Age:</strong> {user.dob.age}</p>
                  <p></p>
                </div>
                <br />
                <div class="media-right close" onClick={close}>
                  <i class="fa fa-close"></i>
                </div>
              </div>
             
              <div class="columns">
                <div class="column is-half">
                  <p class="title is-4">CONTACT:</p>
                  <p  class="">Phone number: {user.phone}</p>
                  <p  class="">Cell number: {user.cell}</p>
                  <p class="">Email: {user.email}</p>
                </div>
                <div class="column is-half">
                  <p class="title is-4">ADRESS:</p>
                  <p>Street: {user.location.street.name} #{user.location.street.number}</p>
                  <p>{user.location.city},{user.location.state},{user.location.country}</p>
                  <p>Postcode: {user.location.postcode}</p>
                  <p>Nationality: {user.nat}</p>
                </div>
              </div>
            
              <div class="columns register" >
                <div class="column is-four-fifths">
                  <p class="title is-4">REGISTER:</p>
                  <p class="">Registrer: {user.registered.date}</p>
                </div>
                <div class="column is-one-quarter"><br/><br/>
                  <p class="">ID: {user.id.value ? user.id.value : " No ID"}</p>
                </div>
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
