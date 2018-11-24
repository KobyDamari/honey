import React from 'react';
import 'assets/scss/App.scss';
import Title from './Title/Title';
import SearchInput from './SearchInput/SearchInput'
import ContactList from '../components/ContactList/ContactList'
import { getContacts, searchContact } from '../services/ContactsServices'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { contacts: null, filteredContacts: null };
        this.search = this.search.bind(this);
    }


    componentDidMount() {
        getContacts().then((res) => {
            res.json().then(res => this.setState({ contacts: res }));
        }).catch((err) => {
            console.log(err)
        });
    }

    search(value) {
        const FilteredContact = searchContact(this.state.contacts, value);
        this.setState({ filteredContacts: FilteredContact });
    }

    render() {
        const { contacts, filteredContacts } = this.state;
        return (
            <div className="contacts">
                <Title text="Contact-List">
                    <SearchInput searchAction={this.search} />
                </Title>
                <ContactList contacts={filteredContacts || contacts} />
            </div>
        );
    }
}

export default App;
