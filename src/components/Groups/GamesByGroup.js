import React, { useState, useEffect } from "react";
import "./GamesByGroup.css";
const axios = require("axios");

function GamesByGroup() {
  const [allData, setAllData] = useState([]);
  const [search, setSearch] = useState([]);
  const [filterValue, setFilter] = useState([]);

  const getAPIdata = async () => {
    await axios
      .get(
        "https://partners.9ijakids.com/index.php?partnerId=555776&accessToken=l0lawtvv-94bv-oi4d-u808-5ubz&action=catalogfilter"
      )
      .then((responds) => {
        // console.log(responds);
        setAllData(responds.data);
        setSearch(responds.data);
        setFilter(responds.data);
      })
      .catch((error) => {
        console.log(error + ": Error fetching data");
      });
  };

  useEffect(() => {
    getAPIdata();
  }, []);

  // handler for search input
  const handleSearch = (e) => {
    //   store the user input in the variable value
    let value = e.target.value;
    console.log(value);
    //   create an array to hold the filtered items
    let result = [];
    result = allData.filter((data) => {
      return (
        data.Topic.search(value.charAt(0).toUpperCase() + value.slice(1)) !== -1
      );
    });
    console.log(result);
    setSearch(result);
  };

  // handle selections
  const handleChange = (e) => {
    let value = e.target.value;
    return value;
  };

  // filter by groups
  const handleGroups = () => {
    let result = [];
    result = allData.filter((data) => {
      return data.Group === data.value;
    });
    console.log(result);
    setSearch(result);
  };

  // filter by levels

  return (
    <div>
      <div className="searchFilter">
        <div className="searchBarWrapper">
          <label style={{ marginRight: "5px" }}>search:</label>
          <input
            type="input"
            placeholder="Search Topic"
            onChange={(e) => {
              handleSearch(e);
            }}
          />
        </div>
        <div>
          <label>
            <select onChange={handleChange}>
              <option
                value="Academic"
                onClick={() => {
                  handleGroups();
                }}
              >
                Academic
              </option>
              <option
                value="Financial Literacy"
                onClick={() => {
                  handleGroups();
                }}
              >
                Financial Literacy
              </option>
            </select>
          </label>
        </div>
      </div>
      <div className="parentWrapper">
        <div className="cardWrapper">
          {search.map((item) => (
            <div className="cardContainer" key={item.id}>
              <div className="gameImage">
                <img
                  style={{
                    height: "150px",
                    width: "300px",
                    objectFit: "cover",
                    borderRadius: "5px 5px 0 0",
                  }}
                  src={item.GameImage}
                  alt="game images"
                />
              </div>
              <div className="parentText">
                <div className="gameTitle">{item.GameTitle}</div>
                <div className="gameDescription">{item.GameDescription}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GamesByGroup;
