import React from 'react'

const Persons = ({ filter, persons }) => {
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <ul>
        {personsToShow.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
    </ul>
  )
}

export default Persons