import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class Square extends React.Component {
    render() {
      return (
        <button onClick={this.props.onClick} style={this.props.style}
        disabled={this.props.disableValue}>
          {this.props.value}
        </button>
      );
    }
}

export default Square  