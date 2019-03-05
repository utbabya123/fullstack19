import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({ good, neutral, bad }) => {
  let yhteensa = good + neutral + bad
  let keskiarvo = ((good - bad) / yhteensa)
  let positiivisiaProsentteina = `${(100 * good/yhteensa)} %`

  if (yhteensa === 0) {
    return (
      <div>
        <p>Ei yhtään palautetta annettu</p>
      </div>
    )
  }
  return (
    <div>
      <h1>statistiikkaa</h1>
      <table>
        <tbody>
          <Statistic text="hyvä" value={good} />
          <Statistic text="neutraali" value={neutral} />
          <Statistic text="huono" value={bad} />
          <Statistic text="yhteensä" value={yhteensa} />
          <Statistic text="keskiarvo" value={keskiarvo} />
          <Statistic text="positiivisia" value={positiivisiaProsentteina} />
        </tbody>
      </table>
    </div>
  )
}

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>anna palautetta</h1>
      <Button
        handleClick={() => setGood(good+1)}
        text="hyvä"
      />
      <Button
        handleClick={() => setNeutral(neutral+1)}
        text="neutraali"
      />
      <Button
        handleClick={() => setBad(bad+1)}
        text="huono"
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)