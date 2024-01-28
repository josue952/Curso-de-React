import './App.css';
import { TwitterFollowCard } from './TwitterFollowCard.jsx';

export function App () {
    return (
        <section className='App'>
            <TwitterFollowCard isFollowing userName='pepe'>
            josue
            </TwitterFollowCard>

            <TwitterFollowCard isFollowing={false} userName='alonso'>
            alfredo
            </TwitterFollowCard>
            
        </section>
    );
}