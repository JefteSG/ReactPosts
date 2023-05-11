import './style.css'
export const TextInput = ({searchValue, handleChage}) => {
    return (
        <input
            className='text-input'
            onChange={handleChage}
            value={searchValue}
            type='search'
            placeholder='Type your search:'
       />

    )
}