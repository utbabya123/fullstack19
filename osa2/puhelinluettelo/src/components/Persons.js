import React from 'react'

const Persons = ({ filter, persons, deletePerson }) => {
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <ul>
        {personsToShow.map(person =>
          <li key={person.name}>
            {person.name} {person.number} <button onClick={deletePerson(person)}>poista</button>
          </li>)}
    </ul>
  )
}

export default Persons