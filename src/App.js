import React, { useState } from 'react'

import classnames from 'classnames'

import styles from './App.module.scss'

function App() {
  const items = Array.from(new Array(9))

  const TIK = 'X'
  const TAK = 'O'

  const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  let timeout

  const [filled, setFilled] = useState([])

  const [player, setPlayer] = useState([])

  const [computer, setComputer] = useState([])

  const [started, setStarted] = useState(false)

  const [finished, setFinished] = useState(false)

  const startGame = (evt) => {
    evt.preventDefault()
    setStarted(true)
    setFinished(false)
    setPlayer([])
    setComputer([])
    setFilled([])
  }

  const getRandomAvailableItem = (filled) => {
    const available = [0, 1, 2, 3, 4, 5, 6, 7, 8].filter(
      (i) => !filled.includes(i)
    )

    console.log(available)

    return available[Math.floor(Math.random() * available.length)]
  }

  const handleClick = (index) => {
    return () => {
      if (filled.includes(index) || filled.length === 9 || finished) {
        return
      }

      const randomIndex = getRandomAvailableItem(filled.concat([index]))

      const nextFields = filled.concat([index, randomIndex])

      setFilled(nextFields)

      const playerItems = player.concat([index])

      const computerItems = computer.concat([randomIndex])

      setPlayer(playerItems)

      if (randomIndex !== undefined) {
        setComputer(computerItems)
      }

      const isPlayerWinner = validateIfWinner(playerItems)
      const isComputerWinner = validateIfWinner(computerItems)

      if (isPlayerWinner || isComputerWinner) {
        setFinished(true)
      }
    }
  }

  const validateIfWinner = (items) => {
    for (let i = 0; i < combinations.length; i++) {
      const a = combinations[i][0]
      const b = combinations[i][1]
      const c = combinations[i][2]
      if (items.includes(a) && items.includes(b) && items.includes(c)) {
        return c
      }
    }

    return false
  }

  React.useEffect(() => {
    return () => {
      clearTimeout(timeout)
    }
  })

  return (
    <div className={styles.App}>
      {started ? (
        <>
          <div className={styles.GameCanvas}>
            {items.map((i, k) => {
              return (
                <div
                  key={k}
                  className={styles.GameCanvas__item}
                  onClick={handleClick(k)}
                >
                  <span>
                    {player.includes(k) ? TIK : ''}
                    {computer.includes(k) ? TAK : ''}
                  </span>
                </div>
              )
            })}
          </div>

          {finished ? (
            <a
              href="/"
              onClick={startGame}
              className={classnames(
                styles.GameCanvas__start,
                styles.GameCanvas__reset
              )}
            >
              Reset Game
            </a>
          ) : null}
        </>
      ) : (
        <a href="/" onClick={startGame} className={styles.GameCanvas__start}>
          Start Game
        </a>
      )}
    </div>
  )
}

export default App
