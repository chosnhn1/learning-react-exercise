import React, { Component } from "react";


/** 
 * StarRating component written in Class Component.
 * @deprecated since React v16.8.0
 * https://react.dev/reference/react/Component
 */
export default class StarRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starsSelected: 0
    };
    this.change = this.change.bind(this);
  }

  change(starsSelected) {
    this.setState({ starsSelected });
  }

  render() {
    const { totalStars } = this.props;
    const { starsSelected } = this.state;
    return (
      <div>
        {[...Array(totalStars)].map((n, i) => (<Star
          key={i}
          selected={i < starsSelected}
          onClick={() => this.change(i + 1)}
        />
        ))}
        <p>
          {starsSelected} / {totalStars}
        </p>
      </div>
    );
  }
}
