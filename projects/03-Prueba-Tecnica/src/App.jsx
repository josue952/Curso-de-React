import { useState, useEffect } from 'react';
import './App.css';

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
//const Cat_EndPoint_Image_URL = `https://cataas.com/cat/says/${threeFirstword}?size=50&color=red&json=true`
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

export function App() {
const [fact, setFact] = useState() 
const [imgUrl, setImgUrl] = useState()
const [factError, setFactError] = useState()

//para recuperar la cita al cargar la pagina
useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
        .then(res => {
            if (!res.ok) {
                //Todo: handle error if !res.ok
                throw new Error('No se pudo obtener la cita')
            }
            return res.json()
        })
        .then(data => {
            const {fact} = data
            setFact(fact)

        
        })
}, [])

//para recuperar la imagen cada vez que se cambie la cita
useEffect(() => {
    if (!fact) return
    const threeFirstWord = fact.split(' ', 3).join(' ')

    fetch(`https://cataas.com/cat/says/${threeFirstWord}?size=50&color=red&json=true`)
    .then(res => res.json())
    .then(response => {
        const { _id } = response
        const url = `/cat/${_id}/says/${threeFirstWord}`
        setImgUrl(url)
    })
}, [fact])

    return (
        <main>
            <h1>App de gatitos :3</h1>
            <section>
            {fact && <p>{fact}</p>}
            {imgUrl && <img src={`${CAT_PREFIX_IMAGE_URL}${imgUrl}`} alt={`Image extracted using the first three words for ${fact}`} />}   
            </section>
        </main>
    )
}