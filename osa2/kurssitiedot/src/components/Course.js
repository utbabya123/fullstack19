import React from 'react'

const Header = ({ name }) => (
  <h1>{name}</h1>
)

const Content = ({ parts }) => (
  <div>
    {parts.map(part => <Part part={part} key={part.id} />)}
  </div>
)

const Part = ({ part }) => (
  <p>{part.name} {part.exercises}</p>
)

const Total = ({ parts }) => {
  const tot = parts.reduce((acc, curr) => acc + curr.exercises, 0)

  return (
    <p>yhteensä {tot} tehtävää</p>
  )
}

const Course = ({ course }) => (
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

export default Course