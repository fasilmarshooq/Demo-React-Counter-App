import React from "react";

const InputDropDown = ({ enumValues, label, onChange, value, name, error }) => {
  return (
    <div className="for-group">
      <label className="m-1" htmlFor="genre">
        {label}
      </label>

      <select
        onChange={onChange}
        value={value}
        name={name}
        className="custom-select"
        id={name}
      >
        <option value="" />
        {enumValues.map((e) => (
          <option key={e._id} value={e._id}>
            {e.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger mt-1 ">{error}</div>}
    </div>
  );
};

export default InputDropDown;
