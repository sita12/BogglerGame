import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class Score extends React.Component {
    render() {
      return (
        <p>Socre: {this.props.score}</p>
      );
    }
}

export default Score  