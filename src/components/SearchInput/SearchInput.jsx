import React from 'react';
import { debounce } from "../../services/utils";
import './SearchInput.scss';

const SearchInput = (props) => {
    const { searchAction } = props;
    const debouncedSearch = debounce(searchAction, 300);
    return (
        <label className="search-wrapper">
            <input name="search" className="search-wrapper__input" placeholder='search...'
                   onChange={e => debouncedSearch(e.target.value)} />
        </label>
    );
}
export default SearchInput;
