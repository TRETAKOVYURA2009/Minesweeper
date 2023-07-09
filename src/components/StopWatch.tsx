import React, { useEffect, useState } from "react"
import { GameStatus } from "../types/game"

interface StopWatchProps {
  status: GameStatus
}

const StopWatch: React.FC<StopWatchProps> = ({ status }) => {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    if (status === GameStatus.started) {
      setTimeout(() => setCounter(counter + 0.125), 125)
    } else if (status === GameStatus.notStarted) {
      setCounter(0)
    }
  }, [counter, status])

  return <span className="mont text-lg">{Math.ceil(counter)}</span>
}

export default StopWatch
