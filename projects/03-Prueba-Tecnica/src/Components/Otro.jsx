import { useCatImage } from "../Hooks/useCatImage"
export function Otro () {
    const { imgUrl } = useCatImage({fact: 'cat'})

    return(
        <>
        {imgUrl && <img src={imgUrl}/>}
        </>
    )
}