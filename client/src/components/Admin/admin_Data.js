import React, { Component, useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";

const AdminData = () => {
  var { state, dispatch } = useContext(UserContext);

  var [data, setResult] = useState([]);
  // var [quantity, setQuantity] = useState("");
  // var [image, setImage] = useState("");
  // var [addresss, setAddress] = useState("");
  var [status, setStatus] = useState("");

  useEffect(() => {
    fetch("/adminAllData", {
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
        dispatch({ type: "AdminScrapStatus", payload: result });
      });
  }, []);

  var deletePost = (postid) => {
    console.log(postid);
    fetch(`/deleteScrap1/${postid}`, {
      method: "delete",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        
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

  var updatePost = (postid) => {
    console.log(postid)
    fetch(`/updateScrap1/${postid}`, {
      method: "put",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        
      },
      body: JSON.stringify({
        status
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("updatepost", result);
        window.location.reload();
        // var newData = data.filter((item) => {
        //   return item._id !== result._id;
        // });
        // setStatus(newData);
      });
    

  }

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
              <td>
              {/* <!-- Button trigger modal --> */}
<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
              Edit
</button>

{/* <!-- Modal --> */}
<div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Status Update</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <input type='text' value={status} onChange={(e) => setStatus(e.target.value)}></input>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={() => updatePost(item._id)}>Save changes</button>
      </div>
    </div>
  </div>
</div>
              </td>
              <td> <i
                  className="material-icons"
                  style={{ color: "red", float: "right" }}
                  onClick={() => deletePost(item._id)}
                >
                  delete
                </i></td>
            </tr>)
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminData;