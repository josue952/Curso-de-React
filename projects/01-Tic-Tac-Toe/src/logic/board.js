import { Winner_Combos } from '../constants.js' //importamos las combinaciones ganadoras

export const CheckWinner = (boardToCheck) => {
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

export const checkEndGame = (newBoard) => {
    //revisamos si hay un empate
    //si no hay espacios vacios
    //en el tablero
    return newBoard.every((Square) => Square !== null)
}

