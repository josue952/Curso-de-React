import './App.css';
import { useCatImage } from './Hooks/useCatImage';
import { useCatFact } from './Hooks/useCatFact';
import { Otro } from './Components/Otro';

//const Cat_EndPoint_Image_URL = `https://cataas.com/cat/says/${threeFirstword}?size=50&color=red&json=true`

export function App() {
const { fact, refreshFact } = useCatFact()
const { imgUrl } = useCatImage({fact})

const handleClick = async () => {
    refreshFact()
}

    return (
        <main>
            <h1>App de gatitos :3</h1>

            <button onClick={handleClick}>Get new fact</button>
            <section>
            {fact && <p>{fact}</p>}
            {imgUrl && <img src={imgUrl} alt={`Image extracted using the first three words for ${fact}`} />}   

            <Otro/>
            </section>
        </main>
    )
}