const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'

export const getRandomFact = async () => {
    const res = await fetch(CAT_ENDPOINT_RANDOM_FACT)
    if (!res.ok) {
        //Todo: handle error if !res.ok
        throw new Error('No se pudo obtener la cita')
    }
    const data = await res.json()
    const { fact } = data
    return fact
}

// fetch(CAT_ENDPOINT_RANDOM_FACT) -> promesa/promise
//     .then(res => { 
//         return res.json() -> promesa/promise
//     })
//     .then(data => {
//         const {fact} = data
//         return fact
//     })