import React, { Component, useState, useEffect } from "react";
import M from "materialize-css";
import { Link, useHistory } from "react-router-dom";


const ScrapRequest = () => {
  var history = useHistory();
  var [title, setTitle] = useState("");
  var [quantity, setQuantity] = useState("");
  var [image, setImage] = useState("");
  var [addresss, setAddress] = useState("");
  var [url, setUrl] = useState("");
  useEffect(() => {
    //useEffect willl work when image will upload
    if (url) {
      fetch("/scrapRequest", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          quantity,
          addresss,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("CREATE_POST", data);
          if (data.error) {
            M.toast({ html: data.error, classes: "#d50000 red accent-4" });
          } else {
            M.toast({
              html: "Created post successfully",
              classes: "#4caf50 green",
            });
            history.push("/ScrapDetails");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [url]);

  var postDetails = () => {
    
    //File upload
    console.log(title, quantity, addresss, image);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "djztjkizu");
    fetch("	https://api.cloudinary.com/v1_1/djztjkizu/image/upload", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("SCRAP POST DATA",data);
        setUrl(data.url);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    
    <div
      className="card input-field"
      style={{
        margin: "8% auto",
        maxWidth: "500px",
        padding: "20px",
        textAlign: "center",
        
      }}
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        placeholder="Enter scrap title (e.g- papper,plastic)"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter Quantity in kg (e.g- 1, 2)"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <input
        type="text"
        placeholder="Address"
        value={addresss}
        placeholder="Enter your address"
        onChange={(e) => setAddress(e.target.value)}
      />
      <div className="file-field input-field">
        <div className="btn #64b5f6 blue lighten-2">
          <span>Upload Image</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button
        className="btn waves-effect waves-light #64b5f6 blue lighten-2"
        onClick={() => postDetails()}
      >
        Submit Post
      </button>
    </div>
  );
};

export default ScrapRequest;
