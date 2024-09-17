import React from "react";

const News = () => {
  const id = window.location.pathname.split("/")[2];

  return (
    <div>
      <h1>News</h1>
      <p>News ID: {id}</p>
    </div>
  );
};

export default News;
