import { useState, useEffect } from 'react'
import { getRandomFact } from '../Services/facts'

export function useCatFact () {
    const [fact, setFact] = useState() 

    const refreshFact = () => {
        getRandomFact().then(fact => setFact(fact))
    }
    //para recuperar la cita al cargar la pagina
    useEffect(refreshFact, [])
    return {fact, refreshFact}
}