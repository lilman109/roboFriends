import React from 'react';

const SearchBox = ({searchChange}) => {
  return (
    <div className='pa2'>
      <input
        className='pa2 tc ba bw2 b--light-blue' 
        type='search' 
        placeholder='search robots'
        onChange={searchChange}
        />
    </div>
  )
}

export default SearchBox;