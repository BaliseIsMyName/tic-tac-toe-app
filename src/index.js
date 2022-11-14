import React  from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Modification de la classe Square en component fonction Square
//      class Square extends React.Component {

//       render() {
//             return (
//             <button     
//                   className="square" 
//                   onClick={() => this.props.onClick()}
//             >
//                   {this.props.value}
//             </button>
//             );
//             }
//       }
      
      function Square(props){
            return (
                  <button 
                        id={props.id}
                        className='square'
                        onClick={props.onClick}
                  >
                        {props.value}
                  </button>
            );
      }

     class Board extends React.Component {

      renderSquare(i) {
        return ( 
            <Square 
                  id={'button'+i}
                  value={this.props.squares[i]} 
                  onClick={() => this.props.onClick(i)}
            />
        );
      }
    
      constructBoard() {
                return (
                        [...Array(3)].map((_, i) => (
                              <div  className='board-row'>
                                    {
                                    [...Array(3)].map((_, j) => this.renderSquare(3 * i + j))
                                    }
                              </div>
                        ))
                  );
                 
      }

      render() {    
        return (
          <div>
            {this.constructBoard()}
            {/* <div className="board-row">  // Modification par une 2 boucle dans constructorBoard()
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
            </div>
            <div className="board-row">
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
            </div>
            <div className="board-row">
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
            </div> */}
          </div>
        );
      }
    }
    
    class Game extends React.Component {
      constructor(props){
            super(props);
            this.state = {
                  history: [{
                        squares: Array(9).fill(null),
                  }],
                  stepNumber: 0,
                  xIsNext: true,
            };
      }

      jumpTo(step, e) {
            this.setState({
                  stepNumber: step,
                  xIsNext: (step % 2) === 0,
            });
            this.mettreEnGrasLaSelection(step, e);
      }

      mettreEnGrasLaSelection(step, e){
            const collectionClass = document.getElementsByClassName('selectButtonNo');

            const arr = Array.from(collectionClass)
            if(e){
                  if(Number(e.target.id) === step){ 
                        document.getElementById(step).classList.add('selectButtonYes'); 
                  }

            // eslint-disable-next-line array-callback-return
            arr.map((element) => {
                if(e.target.id !== element.id) {
                 document.getElementById(element.id).classList.remove('selectButtonYes'); 
            }
            })
            }else {
                  // eslint-disable-next-line array-callback-return
                  arr.map((element) => {
                         document.getElementById(element.id).classList.remove('selectButtonYes');  
                    })
            }
           
      }


      handleClick(i) {
            const history = this.state.history.slice(0, this.state.stepNumber + 1);
            const current = history[history.length - 1]
            const squares = current.squares.slice();
            if(calculateWinner(squares) || squares[i]) {
                  return;
            }
            squares[i] = this.state.xIsNext ? 'X' : 'O';
            this.setState({
                  history: history.concat([{
                        squares: squares,
                        position: calculatePosition(i),
                  }]),
                  stepNumber: history.length,
                  xIsNext: !this.state.xIsNext,
            });
            this.mettreEnGrasLaSelection();
      }

      render() {
            const history = this.state.history;
            const current = history[this.state.stepNumber];
            const winner = calculateWinner(current.squares);

            const moves = history.map((step, move) => {
                  const position = step.position;
                  const desc = move ?
                  'Revenir au tour n°' + move + ' ' + position:
                  'Revenir au début de la partie';
                  return (
                        <li key={move}>
                              <button 
                                    id={move}
                                    className='selectButtonNo'
                                    onClick={(e) => this.jumpTo(move, e)}
                              >{desc}</button>
                        </li>
                  );
            });
            let status;
            if(winner) {
                  status = winner + ' a gagné';
            } else {
                  status = 'Prochain joueur : ' + (this.state.xIsNext ? 'X' : 'O');
            } 
            if(!winner && this.state.stepNumber > 8) {
                  status = 'Egalité!'
                  console.log('equal Noob');
            }

            
        return (
           <div>
                  <h1 className='titrePrincipale'>TIC-TAC-TOE</h1>
                  <p className='titrePrincipale'>(Morpion)</p>
            <div className="game">
                  <div className="game-board">
                  <Board 
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                  />
                  </div>
                  <div className="game-info">
                  <div>{status}</div>
                  <ol>{moves}</ol>
                  </div>
            </div>
          </div>
        );
      }
    }
    
    // ========================================
    
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<Game />);
    
    function calculateWinner(squares) {
      const lines = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
      ];
      const squareWinner = document.getElementsByClassName('square');
      const arrSquareWinner = Array.from(squareWinner);
      
      for (let i = 0; i < lines.length; i++) {
            const [a,b,c] = lines[i];
            if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
                  const arrrj = [...[a], ...[b], ...[c]]

                 arrSquareWinner.map((element) => {
                              arrrj.map((elementX) => {
                                    if(Number(element.id.replace(/button/g, '')) === elementX){
                                          element.classList.add('squareWinner')
                                    }
                              return null;
                              })
                  return null;   
                  })
                  return squares[a];
            }else{
                  arrSquareWinner.map((element) => {
                        element.classList.remove('squareWinner') 
                         return null;                    
                  })
            }
      }
      return null;
    }

    function calculatePosition(numberPosition) {
      const position = [
            '(1,1)',
            '(1,2)',
            '(1,3)',
            '(2,1)',
            '(2,2)',
            '(2,3)',
            '(3,1)',
            '(3,2)',
            '(3,3)'
      ]
      return position[numberPosition];
    }