import { useState, useEffect } from 'react';
import axios from 'axios';
import personService from './services/persons';

const Filter = ({ props }) => {
  return (
    <form>
      <div>filter shown with <input onChange={props} /></div>
    </form>
  );
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.func}>
      <div>name: <input value={props.newName} onChange={props.handlePersonChange} /></div>
      <div>number: <input value={props.newNumber} onChange={props.handleNumberChange} /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

const Persons = ({ persons, setPersons }) => {
  
  const handleDelete = (person) => {
    const confirmDelete = window.confirm(`Delete ${person.name} ?`)
    if(confirmDelete) {
      personService.delete_(person.id)
      .then(response => {
        const updatedPersons = persons.filter(p => p.id !== person.id);
        setPersons(updatedPersons);
      });
    }
    
  };

    return (
      <ul>
        {persons.map((person, index) => (
          <li key={index}>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person)}>delete</button>
          </li>
        ))}
      </ul>
    );
  

  
}


const App = () => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data);
      });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name.toLowerCase() === newName.toLowerCase())) {
      const confirmUpdate = window.confirm(`${newName} already exists. Do you want to update the phone number?`);




      if (confirmUpdate) {

        const personObject = {
          name: newName,
          number: newNumber
        }


        const p = persons.find((person) => {if(person.name.toLowerCase() == newName.toLowerCase()) {return person.id}})


        axios.put(`http://localhost:3001/persons/${p.id}`, personObject).then(response => {
          const updatedPersons = persons.map(per => per.id === p.id ? personObject : per)
          setPersons(updatedPersons)
          setNewName('')
          setNewNumber('')
        })


      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data));
          setNewName('');
          setNewNumber('');
        });
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSearch = (event) => {
    setShowAll(false);
    setSearch(event.target.value);
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter props={handleSearch} />
      <h1>add new</h1>
      <PersonForm func={addPerson} newName={newName} newNumber={newNumber} handlePersonChange={handlePersonChange} handleNumberChange={handleNumberChange} />
      <h1>Numbers</h1>
      <Persons persons={personsToShow} setPersons={setPersons} />
    </div>
  )
}

export default App;
