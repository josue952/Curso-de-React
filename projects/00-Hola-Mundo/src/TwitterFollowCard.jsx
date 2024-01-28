export function TwitterFollowCard ({children ,userName,  isFollowing}) {
    const text = isFollowing ? 'Siguiendo' : 'Seguir'
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
            <button className='tw-followCard-button'>
                {text}
            </button>
        </aside>
    </article>
    )
}