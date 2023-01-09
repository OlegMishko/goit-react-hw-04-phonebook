import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { Title, MainTitle } from './App.styled';
import { MainPage } from 'common/MainPage.styled';
import baseContacts from '../data/contacts.json';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? baseContacts;
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);


  const submitForm = ({ name, number }, { resetForm }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())
      ? alert(`${name} is already in contacts.`)
      : setContacts([newContact, ...contacts]);
    resetForm();
  };

  const onFilter = evt => {
    setFilter(evt.currentTarget.value);
  };

  const getFilteredContacts = () => {
    const normalizedContacts = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedContacts)
    );
  };
    const deleteContact = id => {
      setContacts(prevState => prevState.filter(contact => contact.id !== id));
    };

    return (
      <MainPage>
        <MainTitle>Phonebook</MainTitle>
        <ContactForm submitForm={submitForm} />

        <Title>Contacts</Title>
        <Filter onFilter={onFilter} filter={filter} />

        <ContactList
          contacts={getFilteredContacts()}
          onDeleteContact={deleteContact}
        />
      </MainPage>
    );
  
}


// export default class App extends Component {
//   state = {
//     contacts: baseContacts,
//     filter: '',
//   };

//   componentDidMount() {
//     console.log('componentDidMount');
//     const contacts = localStorage.getItem('key');
//     const localContacts = JSON.parse(contacts);
//     if (localContacts) {
//       this.setState({ contacts: localContacts });
//     }
//   }

//   componentDidUpdate(prevState, prevProps) {
//     console.log('componentDidUpdate');
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('key', JSON.stringify(this.state.contacts));
//     }
//   }

//   deleteContact = id => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== id),
//     }));
//   };

//   submitForm = (data, {resetForm}) => {
//     data.id = nanoid();
//     const contacts = this.state.contacts;
//     const containsNamee = contacts.find(contact => contact.name === data.name);
//     if (containsNamee) {
//       return alert(`${data.name} is already in contacts.`);
//     }
//     this.setState(prevState => ({
//       contacts: [...prevState.contacts, data],
//     }));
//     resetForm();
//   };

//   onFilter = evt => {
//     this.setState({
//       filter: evt.currentTarget.value,
//     });
//   };

//   getFilteredContacts = () => {
//     const { contacts, filter } = this.state;
//     const normalizedContacts = filter.toLowerCase();
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedContacts)
//     );
//   };

//   render() {
//     const { filter } = this.state;

//     return (
//       <MainPage>
//         <MainTitle>Phonebook</MainTitle>
//         <ContactForm submitForm={this.submitForm} />

//         <Title>Contacts</Title>
//         <Filter onFilter={this.onFilter} filter={filter} />

//         <ContactList
//           contacts={this.getFilteredContacts()}
//           onDeleteContact={this.deleteContact}
//         />
//       </MainPage>
//     );
//   }
// }
