import React, { useEffect, useState } from 'react'
import Main from './main.js'

const App = () => {
  const [randomInt, setRandomInt] = useState(0)
  const serious = true;
  useEffect(() => {
    if (!serious) {
    getRandomInt()
  }
  }, [randomInt])
  
  function getRandomInt() {
    setTimeout(() => {
      setRandomInt(Math.floor(Math.random() * 100));
    }, 2000)
  }

  if (serious) {
    return (
      <>
        <Main count={10} />
      </>
    )
  }

  return (
    <marquee scrollamount={randomInt} behavior="alternate" direction="right">
      <Main count={10} />
    </marquee>
  )
}

export default App