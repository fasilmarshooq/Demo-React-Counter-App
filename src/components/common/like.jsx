import React from "react";

const Like = ({ movie, onLike }) => {
  let classes = "fa fa-thumbs-";
  classes += !movie.IsLiked ? "o-up" : "up";
  return (
    <i
      onClick={() => onLike()}
      className={classes}
      style={{ cursor: "pointer" }}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
