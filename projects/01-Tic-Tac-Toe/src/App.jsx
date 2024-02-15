import { useState } from "react"

const Turns = {
  X: 'X',
  O: 'O',
}


const Square = ({children, isSelected,updateBoard, index}) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const Winner_Combos = [
  [0, 1, 2],//horizontal
  [3, 4, 5],//horizontal
  [6, 7, 8],//horizontal
  [0, 3, 6],//vertical
  [1, 4, 7],//vertical
  [2, 5, 8],//vertical
  [0, 4, 8],//diagonal
  [2, 4, 6],//diagonal
]

function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )
  const [turn, setTurn] = useState(Turns.X)//estado que permite cambiar el turno de X a O

  //null significa que no hay ganador y false que hay un empate
  const [winner, setWinner] = useState(null)//Estado que permite saber si hay un ganador

  const CheckWinner = (boardToCheck) => {
    //revisamos todas las combinaciones ganadoras para ver si X u O gano
    for (const combo of Winner_Combos) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] && //0 -> X u O
        boardToCheck[a] === boardToCheck[b] && //0 y 3 -> X -> X u O -> O
        boardToCheck[a] === boardToCheck[c]
        ) {
        return boardToCheck[a]// X u O
      }
    }
    //si no hay ganador
    return null
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
      setWinner((prevWinner => {
        return newWinner
      }))
    }
  }


  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <section className='game'>
        {
          board.map((cell, index) => {
            return(
              <Square 
              key={index} 
              index={index}
              updateBoard={updateBoard}
              >
                {board[index]}
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
    </main>
  )
}     


export default App
