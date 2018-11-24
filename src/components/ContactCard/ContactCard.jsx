import React from 'react';
import './ContactCard.scss';

const ContactCard = (props) => {
    const { profile_image, icon, job, name, company_name, phone, email } = props.contact;
    return (<li className="contactList__card">
        <div className="contactList__card__img" style={{ backgroundImage: `url(${profile_image})` }} />
        <footer className="contactList__card__footer">
            <span className="contactList__card__footer__name">{name}</span>
            <span>{job} | {company_name}</span>
            <span className="contactList__card__footer__phone">phone number : {phone}</span>
            <span>{email}</span>
            <img className="contactList__card__footer__icon" src={icon}/>
        </footer>
    </li>);
};

export default ContactCard;
