import React, { Component, useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";
//import UserProfile from './UserProfile';
const UserProfile = () => {
  var [userProfile, setProfile] = useState(null);
  var [showfollow, setshowfollow] = useState();
  var { state, dispatch } = useContext(UserContext);
  var { userid } = useParams();
  // console.log("params",userid)
  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("UserPROFILE", result);
        setProfile(result);
      });
  }, []);

  //FOLLOW_USER

  var followUser = () => {
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState,
              followers: [...prevState.user.followers, data._id],
            },
          };
        });
        setshowfollow(false);
      });
  };

  //UNFOLLOW

  var unfollowUser = () => {
    fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setProfile((prevState) => {
          var newFollwer = prevState.user.followers.filter(
            (item) => item !== data._id
          );
          return {
            ...prevState,
            user: {
              ...prevState,
              followers: newFollwer,
            },
          };
        });
        setshowfollow(false);
      });
  };

  return (
    <>
      {userProfile ? (
        <div style={{ maxWidth: "550px", margin: "0px auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              margin: "18px 0px",
              borderBottom: "1px solid grey",
            }}
          >
            <div>
              <img
                style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "80px",
                }}
                src={userProfile.user.pic}
              />
            </div>
            <div>
              <h4>{userProfile.user.name}</h4>
              <h4>{userProfile.user.email}</h4>
              <div
                style={{
                  display: "flex",
                  width: "108%",
                  justifyContent: "space-between",
                }}
              >
                {/* <h6>{userProfile.posts.length} Posts</h6>
                <h6> {userProfile.user.followers.length} Followers</h6>
                <h6>{userProfile.user.following.length} Following</h6> */}
              </div>
              {/* {showfollow ? (
                <button
                  className="btn waves-effect waves-light #64b5f6 blue lighten-2"
                  onClick={() => followUser()}
                >
                  Follow
                </button>
              ) : (
                <button
                  className="btn waves-effect waves-light #64b5f6 blue lighten-2"
                  onClick={() => unfollowUser()}
                >
                  UnFollow
                </button>
              )} */}
            </div>
          </div>
          <div className="gallery">
            {userProfile.posts.map((item) => {
              return <img className="item" src={item.photo} alt={item.title} />;
            })}
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
};

export default UserProfile;
