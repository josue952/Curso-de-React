import { useEffect, useState } from "react"

const FollowMouse = () => {

const [enabled, setEnabled] = useState(false)
const [position, setPosition] = useState({x: 0, y: 0})

//pointer move
useEffect(() => {
  console.log('effect', {enabled}) 

  const handleMove = (event =>{
    const {clientX, clientY} = event
    setPosition({x: clientX, y: clientY})
  })
  
  if(enabled){
    window.addEventListener('mousemove', handleMove)
  }

  //clean up
  //-> se activa cuando se desmonta el componente
  //-> se activa cuando cambian las dependecias (enabled) antes de ejecutar el efecto otra vez
  return () => {
    window.removeEventListener('mousemove', handleMove)
    setPosition({x: 0, y: 0})
  }
}, [enabled])

// [] -> se ejecuta una vez cuando se ejecuta el componente
// [enabled, ...] -> se ejecuta cuando cambia enabled y cuando se ejecuta el componente
// undefined -> se ejecuta cada vez que se renderiza el componente

//change body className
useEffect(() => {
  document.body.classList.toggle('no-cursor', enabled)

  return () => {
    document.body.classList.remove('no-cursor')
  }
},[enabled])

  return(
    <>
    <div style={{
      position: 'absolute',
      backgroundColor: '#09f',
      borderRadius: '50%',
      opacity: 0.8,
      pointerEvents: 'none',
      left: -20,
      top: -20,
      width: 40,
      height: 40,
      transform: `translate(${position.x}px, ${position.y}px)`,
    }}/>
    <button onClick={() => setEnabled(!enabled)}>
      {enabled ? 'Desactivar': 'Activar'} seguir Mouse
    </button>
    </>
    
  )
}

function App() {
  const [mounted, setMounted] = useState(true)
  return (
    <main>
      <FollowMouse />
    </main>
  )
}

export default App
