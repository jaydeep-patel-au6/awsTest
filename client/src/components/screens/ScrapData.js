import React, { Component, useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";

const ScrapData = () => {
  var { state, dispatch } = useContext(UserContext);

  var [data, setResult] = useState([]);
  // var [quantity, setQuantity] = useState("");
  // var [image, setImage] = useState("");
  // var [addresss, setAddress] = useState("");
  // var [status, setStatus] = useState("");

  useEffect(() => {
    fetch("/scrapData", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("Scrap data Details", result);

        setResult(result.mypost);
        // setQuantity(result.quantity);
        // setImage(result.photo);
        // setAddress(result.addresss);
        // setStatus(result.status);
        dispatch({ type: "ScrapStatus", payload: result });
      });
  }, []);

  var deletePost = (postid) => {
    console.log(postid);
    fetch(`/deleteScrap/${postid}`, {
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
        setResult(newData);
      });
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Quantity (Kg)</th>
            <th>Address</th>
            <th>Status</th>
            <th>Pic</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => {
            console.log("Scrap item ", item)
             return (
            <tr>
              <td>{item.title}</td>
             <td>{item.quantity}</td>
             <td>{item.addresss}</td>
             <td>{item.status}</td>
             <td><img
            style={{ width: "50px", height: "50px" }}
            src={item.photo}
          /></td>
            
              <td> <i
                  className="material-icons"
                  style={{ color: "red", float: "right" }}
                  onClick={() => deletePost(item._id)}
                >
                  delete
                </i></td>
                <td></td>
                <td></td> 
            </tr>)
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ScrapData;
