import './Card1.css'
import RDD2Logo from '../assets/Card1 Images/RDD2-logo.jpg'

export const Card1 = ({}) => {
const imgUrl = RDD2Logo
const title = 'Titulo'
const subTitle = 'Subtitulo'
const description = 'Descripcion'
console.log(imgUrl)
return(
    <>
            <div className="card">
                <img src={`${imgUrl}`} alt="image" />
                <div>
                    <h2>{title}</h2>
                    <h3>{subTitle}</h3>
                    <p>{description}</p>
                    <a>Follow Acount</a>
            </div>
        </div>
    </>
)}