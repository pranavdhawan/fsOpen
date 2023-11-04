import { useState } from 'react'

const Statistics = (props) => {

  return (
    <table>
      <tbody>
        <tr>
          <td>{props.text}</td>
          <td>{props.value}</td>
        </tr>
      </tbody>
    </table>
  )
}


const Button = (props) => {
  return (
    <button onClick={props.func}>{props.label}</button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [showS, setShowS] = useState(false)

  const handleGoodChange = () => {
    setGood(good + 1)
    setShowS(true)
  }
  const handleNeutralChange = () => {
    setNeutral(neutral + 1)
    setShowS(true)
  }
  const handleBadChange = () => {
    setBad(bad + 1)
    setShowS(true)
  }

  return (
    <div>
      <h1>give feedback</h1>

      <Button func={handleGoodChange} label='good' />
      <Button func={handleNeutralChange} label='neutral' />
      <Button func={handleBadChange} label='bad' />

      <h2>statistics</h2>

      {showS ? (
        <div>
          <Statistics text='good' value={good} />
          <Statistics text='neutral' value={neutral} />
          <Statistics text='bad' value={bad} />
          <Statistics text='average' value={(good + (bad * -1)) / 3} />
          <Statistics text='positive' value={(good * 100) / (good + bad + neutral)} />
        </div>
      ) : (
        <p>No feedback given</p>
      )}


    </div>
  )
}

export default App