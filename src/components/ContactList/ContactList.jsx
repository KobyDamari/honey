import React from 'react';
import ContactCard from '../ContactCard/ContactCard'
import Spinner from '../Spinner/Spinner'

import './ContactList.scss';

const ContactList = (props) => {
    const { contacts } = props;
    return (
        <content>
            {contacts ? <ul className="contactList">
                {contacts.length !== 0 ?
                    contacts.map(contact => <ContactCard contact={contact} />)
                    :
                    <span className="contactList__noResults">Sorry, Try again 😉</span>
                }
            </ul> : <Spinner />}
        </content>
    );
}

export default ContactList;
