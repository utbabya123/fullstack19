import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const displayNotification = (type, content) => {
    if (type === 'message') {
      setMessage(content)
      setTimeout(() => {
        setMessage('')
      }, 2500)
    } else {
      setError(content)
      setTimeout(() => {
        setError('')
      }, 2500)
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const person = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
    if (person) {
      changeNumber(person)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        displayNotification('message', `Lisättiin ${returnedPerson.name}`)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        displayNotification('error', error.response.data.error)
      })
  }

  const deletePerson = (person) => () => {
    if (window.confirm(`Poistetaanko ${person.name}`)) {
      personService
        .remove(person.id)
        .then(res => {
          setPersons(persons.filter(p => p.id !== person.id))
          displayNotification('message', `Poistettiin ${person.name}`)
        })
        .catch(error => {
          setPersons(persons.filter(p => p.id !== person.id))
          displayNotification('error', `Henkilö ${person.name} oli jo poistettu`)
        })
    }
  }

  const changeNumber = (person) => {
    if (window.confirm(`${person.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
      const personObject = {
        ...person,
        number: newNumber
      }

      personService
        .update(person.id, personObject)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson))
          displayNotification('message', `Henkilön ${person.name} numero päivitettiin`)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setPersons(persons.filter(p => p.id !== person.id))
          displayNotification('error', `Henkilö ${person.name} on jo valitettavasti poistettu palvelimelta`)
        })
    }
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>

      {error.length > 0 ?
      <Notification content={error} type='error' /> :
      <Notification content={message} type='message' />}

      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <h1>lisää uusi</h1>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numerot</h2>
      <Persons
        filter={filter}
        persons={persons}
        deletePerson={deletePerson}
      />
    </div>
  )

}

export default App
