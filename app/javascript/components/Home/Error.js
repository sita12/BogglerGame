import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class Error extends React.Component {
    render() {
      return (
        <p>{this.props.msg}</p>
      );
    }
}

export default Error  