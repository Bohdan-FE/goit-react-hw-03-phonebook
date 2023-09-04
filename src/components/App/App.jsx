import { Component } from 'react';
import { ContactForm } from '../ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Fillter';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  addContact = data => {
    const newContact = { ...data, id: nanoid() };
    if (this.state.contacts.find(contact => contact.name.toLowerCase() === data.name.toLowerCase())) {
      alert(`${data.name} is already in contacts`);
      return
    } 
      this.setState(prevState => {
        return {
          contacts: [...prevState.contacts, newContact],
        };
      });
    
  };

  handleDelete = (id) => {
    this.setState(prevState => {
      return { contacts: prevState.contacts.filter(contact => contact.id !== id) }
    })
    
  };

  render() {
    const visibleItems = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    
    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter handleChange={this.handleChange} />
        <ContactList contacts={visibleItems} onDelete={this.handleDelete}/>
      </Container>
    );
  }
}
