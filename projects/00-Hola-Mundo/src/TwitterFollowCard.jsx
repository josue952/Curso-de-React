import { useState } from 'react';

export function TwitterFollowCard ({children ,userName, initialIsFollowing = false}) {
    //Manejo de estados en react
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing)
    //funcion equivalente ^^
    // const state=useState(false)
    // const isFollowing=state[0]
    // const setIsFollowing=state[1]
    const handleClick = () => {
        setIsFollowing(!isFollowing)
    }

    const text = isFollowing ? 'Siguiendo' : 'Seguir'
    const buttonClassName = isFollowing ? 
    'tw-followCard-button is-following' 
    : 'tw-followCard-button'
    return(
        <article className='tw-followCard'>
        <header className='tw-followCard-header'>
            <img 
            className='tw-followCard-avatar'
            alt="img de react" 
            src={`https://unavatar.io/${userName}`}/>
            <div className='tw-followCard-info'>
                <strong>{children}</strong>
                <span className='tw-followCard-infoUserName'>@{userName}</span>
            </div>
        </header>

        <aside>
            <button className={buttonClassName} onClick={handleClick}>
                <span className='tw-followCard-text'>{text}</span>
                <span className='tw-followCard-stopFollow'>Dejar de Seguir</span>
            </button>
        </aside>
    </article>
    )
}