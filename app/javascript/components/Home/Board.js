import React from 'react';
import Square from './Square'
import Score from './Score'
import Error from './Error'


class Board extends React.Component {

    initialState =  { 
        squares: [],
        word: [],
        word_list: [],
        pointer: null,
        bgColor: 'green',
        colors: ["white", "white", "white", "white", "white","white", "white", "white", "white", "white", "white",
        "white", "white", "white", "white", "white", "white" 
        ],
        score: 0,
        error: "",
        visited_value: [],
        time: {},
        seconds: 0,
        displayBoard: "none",
        displayResult: "none",
        displayNew: ""
    };
    state = this.initialState;
    timer = 0;
    secondsToTime= (secs) => {
      let hours = Math.floor(secs / (60 * 60));
  
      let divisor_for_minutes = secs % (60 * 60);
      let minutes = Math.floor(divisor_for_minutes / 60);
  
      let divisor_for_seconds = divisor_for_minutes % 60;
      let seconds = Math.ceil(divisor_for_seconds);
  
      let obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
      };
      return obj;
    }
    componentDidMount(){
      fetch('/api/v1/games/new').
          then((response) => response.json()).
          then((squares) =>  this.setState({ squares }));
      let timeLeftVar = this.secondsToTime(this.state.seconds);
      this.setState({ time: timeLeftVar });    
    }

    onClick = (value, id) => (e) =>{
      e.preventDefault();
      this.setState({
        word: this.state.word.concat(value),
        pointer: id,
        visited_value: this.state.visited_value.concat(id)
      })
      this.state.colors[id] = 'orange'
    }

    onWordSubmit = (e) =>{
      e.preventDefault();
      var word = ""
      this.state.word.map((w) =>
         word = word + w
      );

      if (this.state.word_list.includes(word)){
        this.setState({
          error: "Word Already submitted",
          pointer: null,
          colors: ["white", "white", "white", "white", "white","white", "white", "white", "white", "white", "white",
         "white", "white", "white", "white", "white", "white" 
         ]
        })
      }else{
      fetch('/api/v1/games/word/check/' +  word )
      .then((response) => response.json())
      .then((res) =>  this.setState({ 
         score: (this.state.score + res.point_to_add) ,
         error: res.msg,
         word: [],
         word_list: (res.point_to_add>0 ? this.state.word_list.concat(word) : this.state.word_list ),
         pointer: null,
         visited_value: [],
         colors: ["white", "white", "white", "white", "white","white", "white", "white", "white", "white", "white",
         "white", "white", "white", "white", "white", "white" 
         ]
      })); 
       
    }     
  }

  findAdjacent = (pointer, id) => {
    if ((pointer == 0) || (pointer ==15)){
      return ((id != pointer) && (id != (pointer+1)) &&(id != (pointer+4)) &&(id != (pointer+5)) &&(id != (pointer-1))
      &&(id != (pointer+5)) &&(id != (pointer-4)) || (this.state.visited_value.includes(id)))
    }else if ((pointer == 4)||(pointer == 8) || (pointer == 12)){
      return ((id != pointer) && (id != (pointer-4)) &&(id != (pointer-3)) &&(id != (pointer+1)) &&(id != (pointer+4))
      &&(id != (pointer+5)) || (this.state.visited_value.includes(id))) 
    }else if ((pointer == 7) || (pointer == 3) || (pointer == 11)){
      return ((id != pointer) && (id != (pointer-1)) &&(id != (pointer+3)) &&(id != (pointer+4)) &&(id != (pointer-5))
      &&(id != (pointer-4)) || (this.state.visited_value.includes(id))) 
    }else if (pointer == null){
        return false
    }else {
      return ((id != pointer) && (id != (pointer-4)) &&(id != (pointer-5)) &&(id != (pointer-3)) &&(id != (pointer-1))
      &&(id != (pointer+1)) &&(id != (pointer+3)) &&(id != (pointer+4)) &&(id != (pointer+5)) || (this.state.visited_value.includes(id)))
    }

  }

  startTimer = () => {
    if (this.timer == 0 && this.state.seconds == 0) {
      this.timer = setInterval(this.countDown, 1000);
      this.setState({
        displayBoard: "",
        displayNew: "none"
      })
    }
  }

  newGame = () => {
    this.reload() ;
  }

  countDown = () => {

    let seconds = this.state.seconds + 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    

    if (seconds == 180) { 
      clearInterval(this.timer);
      this.setState({
        displayBoard: "none",
        displayResult: "",
        displayNew: "none"
      })
      
    }
  }


  reload = () => 
    {
        window.location.reload(false);
  };
  
  render() {

    const { squares, pointer, colors, score,
    error, time, displayBoard, displayResult, displayNew } = this.state;
    return (
      <div>
        <div style={{ display: displayNew }}>
          <Square value="Start Game" onClick={this.startTimer} style={{margin: "200px", height: "50px", width: "200px"}}/>
        </div>
        
        <div> </div>
        <div style={{ display: displayBoard, margin: "50px" }}>

          {time.m} minutes : {time.s} seconds

          <p> Game will be over in 3 minutes </p>

          <Score score={score} />

          <Error msg={error} />

          <div className="board-row">
          {[0,1,2,3].map((s) => {
              return <Square key={s} value={squares[s]} onClick={this.onClick(squares[s], s)} 
              style={{backgroundColor:colors[s], height:'50px', width:'50px'} } 
              disableValue={this.findAdjacent(pointer, s)} />;
          })}
          </div>

          <div className="board-row">
          {[4,5,6,7].map((s) => {
              return <Square key={s} value={squares[s]} onClick={this.onClick(squares[s], s)} 
              style={{backgroundColor:colors[s], height:"50px", width:"50px"}} 
              disableValue={this.findAdjacent(pointer, s)} />;
          })}
          </div>

          <div className="board-row">
          {[8,9,10,11].map((s) => {
              return <Square key={s} value={squares[s]} onClick={this.onClick(squares[s], s)} 
              style={{backgroundColor:colors[s], height:"50px", width:"50px"}} 
              disableValue={this.findAdjacent(pointer, s)} />;
          })}
          </div>

          <div className="board-row">
          {[12,13,14,15].map((s) => {
              return <Square key={s} value={squares[s]} onClick={this.onClick(squares[s], s)} 
              style={{backgroundColor:colors[s], height:"50px", width:"50px"}} 
              disableValue={this.findAdjacent(pointer, s)} />;
          })}
          </div>


          <Square value="Submit" onClick={this.onWordSubmit} style={{margin: "50px", height: "50px", width: "200px"}} />
        </div>
        <div style={{ display: displayResult }}>
          <p style={{margin: "50px", fontSize: "20px"}}>Congratulation your score is: {score} </p>
          <Square value="New Game" onClick={this.newGame} style={{margin: "50px", height: "50px", width: "200px"}}/>
          </div> 
      </div>
    );
  }
}

export default Board  