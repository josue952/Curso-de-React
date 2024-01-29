import './App.css';
import { TwitterFollowCard } from './TwitterFollowCard.jsx';

const users = [
    {
        userName: 'reactjs',
        name: 'React',
        isFollowing: false
    },
    {
        userName: 'vuejs',
        name: 'Vue.js',
        isFollowing: false
    },
    {
        userName: 'angular',
        name: 'Angular',
        isFollowing: false
    }
]
export function App () {
    return (
        <section className='App'>
            {
                users.map(({userName, name, isFollowing}) => {
                    return (
                        <TwitterFollowCard
                        key={userName}
                        userName={userName}
                        initialIsFollowing={isFollowing}
                        >
                            {name}
                        </TwitterFollowCard>
                    )
                })
            }
        </section>
    );
}