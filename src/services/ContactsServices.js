export function getContacts() {
    return fetch('https://candidate-test.herokuapp.com/contacts');
}

export function searchContact(contacts, searchValue) {
    return searchValue !== '' ?
        contacts.filter(contact => contact.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1)
        :
        null;
}
