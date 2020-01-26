import React from 'react';
import Header from './Header'
import Board from './Board'
import './Style.css';

class Home extends React.Component {

  state = { 
    course_modules: [
      { id: 1, title: 'Title 1', description: 'Description 1', active: false},
      { id: 2, title: 'Title 2', description: 'Description 2', active: false},
      { id: 3, title: 'Title 3', description: 'Description 3', active: false},
      { id: 4, title: 'Title 4', description: 'Description 4', active: false},
    ] 
  };
  


  render() {

    return (
      <div> 
        <Header/>
        <Board/>
      </div>
    )
  }
}

export default Home