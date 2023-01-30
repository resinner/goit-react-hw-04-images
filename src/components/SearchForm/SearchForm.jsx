import { useState } from 'react';
import { AiOutlineZoomOut } from 'react-icons/ai';
import PropTypes from 'prop-types';
import styles from './SearchForm.module.scss';

const SearchFrom = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  // Стежить за інпутом та пише значення в стейт
  const handleSearchInput = e => {
    const { value } = e.currentTarget;

    setQuery(value);
  };

  // Стежить за відправленням та віддає значение у зовнішній компонент
  const handleSubmit = e => {
    e.preventDefault();

    // Забороняє відправлення пустого инпута
    if (!query.trim()) return;

    // Віддати дані зовнішньому компоненту
    onSearch(query);

    resetForm();
  };

  // Ресетить поле після відправлення
  const resetForm = () => setQuery('');

  return (
    <form className={styles.SearchForm} onSubmit={handleSubmit}>
      <button type="submit" className={styles['SearchForm-button']}>
        <AiOutlineZoomOut className={styles.icon}/>
      </button>

      <input
        className={styles['SearchForm-input']}
        type="text"
        name="query"
        value={query}
        onChange={handleSearchInput}
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
    </form>
  );
};

SearchFrom.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchFrom;


// На класах
// import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// import styles from './SearchForm.module.scss';

// class SearchFrom extends Component {
//   state = {
//     query: '',
//   };

//   handleSearchInput = e => {
//     const { name, value } = e.currentTarget;

//     this.setState({
//       [name]: value,
//     });
//   };

//   handleSubmit = e => {
//     e.preventDefault();

//     // Запрещает отправку пустого инпута
//     if (!this.state.query) return;

//     // Отдать данные внешнему компоненту
//     this.props.onSearch(this.state.query);

//     this.resetForm();
//   };

//   resetForm = () =>
//     this.setState({
//       query: '',
//     });

//   render() {
//     return (
//       <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
//         <button type="submit" className={styles['SearchForm-button']}>
          // <span className={styles['SearchForm-button-label']}>Search</span>
  // <AiOutlineZoomOut className={styles.icon} />;
//         </button>

//         <input
//           className={styles['SearchForm-input']}
//           type="text"
//           name="query"
//           value={this.state.query}
//           onChange={this.handleSearchInput}
//           autoComplete="off"
//           autoFocus
//           placeholder="Search images and photos"
//         />
//       </form>
//     );
//   }
// }

// SearchFrom.propTypes = {
//   onSearch: PropTypes.func.isRequired,
// };

// export default SearchFrom;
