import React, { Component } from "react";

class counter extends Component {
  render() {
    let canDisableDecrementBtn = this.props.counter.value === 0;
    return (
      <div className="Container">
        <div className="row">
          <div className="col-1">
            <span className={this.getBadgeClasses()}>
              {this.props.counter.value}
            </span>
          </div>
          <div className="col">
            <button
              onClick={() => this.props.onIncrement(this.props.counter)}
              className="btn btn-outline-primary btn-sm "
            >
              +
            </button>
            <button
              onClick={() => this.props.onDecrement(this.props.counter)}
              className="btn btn-outline-primary btn-sm m-2"
              disabled={canDisableDecrementBtn}
            >
              -
            </button>
            <button
              onClick={() => this.props.onDelete(this.props.counter.id)}
              className="btn btn-outline-danger btn-sm "
            >
              X
            </button>
          </div>
        </div>
      </div>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }
}

export default counter;
