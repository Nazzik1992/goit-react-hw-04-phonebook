import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid'

import { Filter } from './Fiter/Filter';
import { Contacts } from './Contacts/Contacts';
import { ContactForm } from './ContactForm/ContactForm';


export const App = () => {
 const [contacts, setContacts] = useState(
  () => JSON.parse(localStorage.getItem('contacts')) ?? []
);
 const [filter, setFilter] = useState('')



useEffect(() => {
  localStorage.setItem('contacts', JSON.stringify(contacts));
}, [contacts]);

   const findContactByName = userName => {
    const textFilter = userName.toUpperCase();

    return contacts.find(
      element => element.userName.toUpperCase() === textFilter
    );
  };

  const handlerSubmitPhonebook = ({ userName, number }) => {
    if (findContactByName(userName)) {
      alert(`${userName} is already in contacts`);
      return;
    }

    setContacts(prevState => [
      ...prevState,
      { userName, number, id: nanoid() },
    ]);

    return true;
  };

  const handlerOnChangeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const handlerDeleteContact = event => {
    const id = event.currentTarget.name;
    const newContacts = contacts.filter(element => element.id !== id);

    setContacts(newContacts);
  };

  const visibleContacts = contacts.filter(element =>
    element.userName.toUpperCase().includes(filter.toUpperCase())
  );

    return (
      <container className="App">
        <h1>Phonebook</h1>
        <ContactForm onSubmit={handlerSubmitPhonebook} />

        {contacts.length > 0 && (
          <>
            <Filter onChange={handlerOnChangeFilter} value={filter} />
            <h2>Contacts</h2>
            <Contacts
              contacts={visibleContacts}
              onDelete={handlerDeleteContact}
            />
          </>
        )}
      </container>
    );
  }

