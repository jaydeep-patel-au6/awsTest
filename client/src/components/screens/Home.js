import React, { Component, useState, useEffect, useContext } from "react";
import { UserContext } from "./../../App";
import { Link } from "react-router-dom";

const Home = () => {
  var [data, setData] = useState([]);
  var { state, dispatch } = useContext(UserContext);


  useEffect(() => {
    fetch("/allpost", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("Home", result);
        setData(result.posts);
      });
  }, []);

  //Like code

  var likepost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ postId: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        var newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        console.log(result);
        setData(newData);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //UNLIKE CODE

  var unlikepost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ postId: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        var newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        console.log(result);
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //COMMENT

  var makecomment = (text, postId) => {
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ postId: postId, text: text }),
    })
      .then((res) => res.json())
      .then((result) => {
        //  console.log(result);
        var newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //DELETEPOST

  var deletePost = (postid) => {
    console.log(postid);
    fetch(`/deletepost/${postid}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("deletepost", result);
        var newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
      });
  };

  return (
    <div className="home">
      {data.map((item) => {
        console.log(item);
        return (
          <div className="card home-card shadow p-3 mb-5 bg-white rounded">
            <h6>
              <Link
                className="text-primary"
                style={{fontFamily:  'Sansita Swashed, cursive', fontSize: 22, color: 'red'}}
                to={
                  item.postedBy._id != state._id
                    ? `/profile/${item.postedBy._id}`
                    : "/profile"
                }
              >
                {item.postedBy.name}
              </Link>

              {item.postedBy._id === state._id && (
                <i
                  className="material-icons"
                  style={{ color: "red", float: "right" }}
                  onClick={() => deletePost(item._id)}
                >
                  delete
                </i>
              )}
            </h6>
            <div className="card-image">
              <img src={item.photo} />
            </div>
            <div className="card-content">
             

              {item.likes.includes(state._id) ? (
                <i
                  className="material-icons"
                  onClick={() => {
                    unlikepost(item._id);
                  }}
                >
                  thumb_up
                </i>
              ) : (
                <i
                  className="material-icons"
                  onClick={() => {
                    likepost(item._id);
                  }}
                >
                  thumb_down
                </i>
              )}

              <h4>{item.likes.length} likes</h4><br></br>
              <h2><b>{item.title}</b></h2>
              <h5>{item.body} </h5><br></br>
              {item.comments.map((record) => {
                return (
                 <div>
                  <h4>
                    <span style={{ fontWeight: "500", fontFamily: 'Dancing Script, cursive' }}>
                      {record.postedBy.name}&nbsp;  : &nbsp;
                    </span>
                    {record.text}
                  </h4>
                  </div>
                );
              })}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  makecomment(e.target[0].value, item._id);
                }}
              >
                <input type="text" placeholder="add comment" />
              </form>
            </div>
          </div>
        );
      })}
    </div>
    
  );
};

export default Home;
