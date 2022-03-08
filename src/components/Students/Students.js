import React, { useState, useEffect } from "react";
import "./Students.css";
import axios from "axios";

function Students() {
  const [student, setStudent] = useState([]);
  const [filterGroup, setFilterGroup] = useState([]);

  const getStudentDetails = async () => {
    await axios
      .get("https://bdcl-api.herokuapp.com/api/bdcl/students")
      .then((response) => {
        const detail = response.data;
        // console.log(detail);
        console.log("data fetched successfully");
        setStudent(detail);
        setFilterGroup(detail.slice(0, 6));
      })
      .catch((error) => {
        console.log(error + " Error fetching data");
      });
  };

  useEffect(() => {
    getStudentDetails();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    //   store the user input in the variable value
    let value = e.target.value;
    console.log(value);
    //   create an array to hold the filtered item/items
    let result = [];
    result = student.filter((data) => {
      return (
        data.firstname.search(
          value.charAt(0).toUpperCase() + value.slice(1)
        ) !== -1 ||
        data.lastname.search(value.charAt(0).toUpperCase() + value.slice(1)) !==
          -1
      );
    });
    setFilterGroup(result);
  };

  return (
    <div>
      <div className="searchContainer">
        <label className="searchLabel">search:</label>
        <input
          className="searchInput"
          type="text"
          placeholder="Firstname or Lastname"
          onChange={(e) => {
            e.preventDefault();
            handleSearch(e);
          }}
        />
      </div>
      <div className="mapCards">
        {/* mapping through the collection to get details of only four(4) documents */}
        {filterGroup.map((item) => (
          <div className="cardContainer" key={item.id}>
            <div className="profileImage">
              <img
                src={item.image}
                alt="No image"
                style={{
                  // width: "100%",
                  width: "70px",
                  height: "70px",
                  objectFit: "cover",
                  borderRadius: "50px",
                  border: "3px solid wheat",
                }}
              />
            </div>
            <div className="cardDetail">
              <div className="studentName">
                <div className="firstName">{item.firstname}</div>
                <div className="lastName">{item.lastname}</div>
              </div>
              <div className="studentDetails">
                <div className="course">{item.course}</div>
                <div className="testimony">{item.testimony}</div>
                {/* <div className="testimony">{console.log(item)}</div> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Students;
