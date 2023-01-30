import { useState, useEffect } from 'react';

import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Loader from './components/Loader';
import Message from './components/Message';
import Modal from './components/Modal';
import IconButton from './components/IconButton';
import { ReactComponent as CloseIcon } from './assets/images/icons/close.svg';

import fetchImages from './api/api-services';

const App = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setPage] = useState(1);
  const [searchQuery, setQuery] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [showModal, setModal] = useState(false);
  const [largeImage, setlargeImage] = useState('');
  const [error, setError] = useState(null);

  // Запит за картинками при обновленні інпута
  useEffect(() => {
    if (!searchQuery) return;

    getImages();
    // eslint-disable-next-line
  }, [searchQuery]);

  // Приймаємо з форми запит та пишемо в стейт + скидуємо після відправлення стейт
  const onChangeQuery = query => {
    setImages([]);
    setPage(1);
    setQuery(query);
    setLoading(false);
    setModal(false);
    setlargeImage('');
    setError(null);
  };

  // Отримуємо дату з фетча
  const getImages = async () => {
    setLoading(true);

    try {
      const { hits } = await fetchImages(searchQuery, currentPage);

      setImages(prev => [...prev, ...hits]);

      setPage(prevPage => prevPage + 1);

      if (currentPage !== 1) {
        scrollOnLoadButton();
      }
    } catch (error) {
      console.log('Smth wrong with App fetch', error);
      setError({ error });
    } finally {
      setLoading(false);
    }
  };

  // Отримує повне зображення, пише його в стейт та відкриває модалку
  const handleGalleryItem = fullImageUrl => {
    setlargeImage(fullImageUrl);
    setModal(true);
  };

  // Перемикання модалки
  const toggleModal = () => {
    setModal(prevModal => !prevModal);
  };

  // Скролл при кліку на кнопку
  const scrollOnLoadButton = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const needToShowLoadMore = images.length > 0 && images.length >= 12; // Потрібні перевірки;

  return (
    <>
      <Searchbar onSearch={onChangeQuery} />

      {images.length < 1 && (
        <Message>
          <h2>The gallery is empty 🙁</h2>
          <p>Use search field!</p>
        </Message>
      )}

      <ImageGallery images={images} onImageClick={handleGalleryItem} />

      {needToShowLoadMore && <Button onClick={getImages} />}

      {showModal && (
        <Modal onClose={toggleModal}>
          <div className="Close-box">
            <IconButton onClick={toggleModal} aria-label="Close modal">
              <CloseIcon width="20px" height="20px" fill="#7e7b7b" />
            </IconButton>
          </div>
          <img src={largeImage} alt="" className="Modal-image" />
        </Modal>
      )}

      {isLoading && <Loader />}

      {error && (
        <Message>
          <h2>Oops! 😫</h2>
          <p>
            Sorry, something went wrong. Please try again, or{' '}
            <a href="/">refresh the page</a>.
          </p>
        </Message>
      )}
    </>
  );
};

export default App;


// На класах
// import React, { Component } from 'react';
// import Searchbar from './components/Searchbar';
// import ImageGallery from './components/ImageGallery';
// import Button from './components/Button';
// import Loader from './components/Loader';
// import Message from './components/Message';
// import Modal from './components/Modal';
// import IconButton from './components/IconButton';
// import { ReactComponent as CloseIcon } from './assets/images/icons/close.svg';

// import fetchImages from './api/api-services';


// class App extends Component {
//   state = {
//     images: [],
//     currentPage: 1,
//     searchQuery: '',
//     isLoading: false,
//     showModal: false,
//     largeImage: '',
//     error: null,
//   };

//   // Якщо при обновлені запрос не рівний між стейтами, тоді робимо фетч
//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.searchQuery !== this.state.searchQuery) {
//       this.getImages();
//     }
//   }

//   // Приймаємо з форми запрос та пишемо в стейт + скидуємо після відправки ключі з стейта
//   onChangeQuery = query => {
//     this.setState({
//       images: [],
//       currentPage: 1,
//       searchQuery: query,
//       error: null,
//     });
//   };

//   // Отримуємо дату з фетча
//   getImages = async () => {
//     const { currentPage, searchQuery } = this.state;

//     this.setState({
//       isLoading: true,
//     });

//     try {
//       const { hits } = await fetchImages(searchQuery, currentPage);

//       this.setState(prevState => ({
//         images: [...prevState.images, ...hits],
//         currentPage: prevState.currentPage + 1,
//       }));

//       if (currentPage !== 1) {
//         this.scrollOnLoadButton();
//       }
//     } catch (error) {
//       console.log('Smth wrong with App fetch', error);
//       this.setState({ error });
//     } finally {
//       this.setState({
//         isLoading: false,
//       });
//     }
//   };

//   // Отримує повне зображення, пише його в стейт та відкриває модалку
//   handleGalleryItem = fullImageUrl => {
//     this.setState({
//       largeImage: fullImageUrl,
//       showModal: true,
//     });
//   };

//   // Перемикання модалки
//   toggleModal = () => {
//     this.setState(prevState => ({
//       showModal: !prevState.showModal,
//       largeImage: '',
//     }));
//   };

//   // Скролл при кліку на кнопку
//   scrollOnLoadButton = () => {
//     window.scrollTo({
//       top: document.documentElement.scrollHeight,
//       behavior: 'smooth',
//     });
//   };

//   render() {
//     const { images, isLoading, showModal, largeImage, error } = this.state;
//     const needToShowLoadMore = images.length > 0 && images.length >= 12; // Нужны доп проверки;

//     return (
//       <>
//         <Searchbar onSearch={this.onChangeQuery} />

//         {images.length < 1 && (
//           <Message>
//             <h2>The gallery is empty 🙁</h2>
//             <p>Use search field!</p>
//           </Message>
//         )}

//         <ImageGallery images={images} onImageClick={this.handleGalleryItem} />

//         {needToShowLoadMore && <Button onClick={this.getImages} />}

//         {showModal && (
//           <Modal onClose={this.toggleModal}>
//             <div className="Close-box">
//               <IconButton onClick={this.toggleModal} aria-label="Close modal">
//                 <CloseIcon width="20px" height="20px" fill="#7e7b7b" />
//               </IconButton>
//             </div>

//             <img src={largeImage} alt="" className="Modal-image" />
//           </Modal>
//         )}

//         {isLoading && <Loader />}

//         {error && (
//           <Message>
//             <h2>Oops! 😫</h2>
//             <p>
//               Sorry, something went wrong. Please try again, or{' '}
//               <a href="/">refresh the page</a>.
//             </p>
//           </Message>
//         )}
//       </>
//     );
//   }
// }

// export default App;