import React from "react";

function CharacterCard({ name, status, gender, image }) {
  return (
    <div className="w-64 bg-white rounded-lg ">
      <h1>NAME:{name}</h1>
      <p>Status:{status}</p>
      <p>gender:{gender}</p>
      <img className="rounded-b-lg" src={image}></img>
    </div>
  );
}

export default CharacterCard;
