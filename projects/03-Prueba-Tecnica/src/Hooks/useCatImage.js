import { useState, useEffect } from 'react'
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

//custom hook para obtener la imagen del gatito
export function useCatImage ({ fact}) {
    const [imgUrl, setImgUrl] = useState()
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
return {imgUrl: `${CAT_PREFIX_IMAGE_URL}${imgUrl}`}
}// {imgUrl: 'https://cataas.com/cat/'}
