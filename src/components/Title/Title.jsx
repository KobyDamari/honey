import React from 'react';
import './Title.scss';

const Title = (props) => {
    const { text } = props;
    return (
        <header id="header">
            <span>{text}</span>
            {props.children}
        </header>
    );
}
export default Title;
