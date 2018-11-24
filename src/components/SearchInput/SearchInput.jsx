import React from 'react';
import './SearchInput.scss';

const SearchInput = (props) => {
    const { searchAction } = props;
    return (
        <label className="search-wrapper">
            <input name="search" className="search-wrapper__input" placeholder='search...'
                   onChange={e => searchAction(e.target.value)} />
        </label>
    );
}
export default SearchInput;
