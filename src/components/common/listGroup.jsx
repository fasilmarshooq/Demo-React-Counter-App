import React from "react";

const listGroup = ({
  currentGenre,
  ongenreChange,
  items,
  textProperty,
  valueProperty,
}) => {
  return (
    <ul className="list-group" style={{ cursor: "pointer" }}>
      <li
        onClick={() => ongenreChange("All")}
        className={
          "All" === currentGenre
            ? "list-group-item float-left active"
            : "list-group-item float-left"
        }
      >
        <p>All Genere</p>
      </li>
      {items.map((g) => (
        <li
          key={g[valueProperty]}
          onClick={() => ongenreChange(g[textProperty])}
          className={
            g[textProperty] === currentGenre
              ? "list-group-item float-left active"
              : "list-group-item float-left"
          }
        >
          {g[textProperty]}
        </li>
      ))}
    </ul>
  );
};

listGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default listGroup;
