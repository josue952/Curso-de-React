//exportamos los componentes a utilizar
import { useState } from "react" //estados
import confetti from "canvas-confetti" //efecto de confetti

import {Square} from "./Components/Square.jsx"
import {Turns} from "./constants.js" //exportamos constantes utilizadas en "constants.js"
import {CheckWinner, checkEndGame} from "./logic/board.js"
import {WinnerModal} from "./Components/WinnerModal.jsx"

function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )
  const [turn, setTurn] = useState(Turns.X)//estado que permite cambiar el turno de X a O

  //null significa que no hay ganador y false que hay un empate
  const [winner, setWinner] = useState(null)//Estado que permite saber si hay un ganador

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(Turns.X)
    setWinner(null)
  }


  const updateBoard = (index) => {
      //no actualizamos si ya hay un valor
      if (board[index] || winner) return
      //actualizamos el tablero
      const newBoard = [...board]
      newBoard[index] = turn // x u o
      setBoard(newBoard)
      //cambiamos el turno
      const newTurn = turn === Turns.X ? Turns.O : Turns.X
      setTurn(newTurn)
      //revisamos si hay un ganador
      const newWinner = CheckWinner(newBoard)
      if (newWinner) {
        confetti()
        setWinner(newWinner)
      }else if (checkEndGame(newBoard)){
        setWinner(false)//empate
      }
    }
  
  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>
        Reset del juego
      </button>
      <section className='game'>
        {
          board.map((square, index) => {
            return(
              <Square 
              key={index} 
              index={index}
              updateBoard={updateBoard}
              >
                {square}
              </Square>)
          })
        }
      </section>
      <section className="turn">
        <Square isSelected={turn === Turns.X}>
          {Turns.X}
        </Square>

        <Square isSelected={turn === Turns.O}>
          {Turns.O}
        </Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}     
export default App
