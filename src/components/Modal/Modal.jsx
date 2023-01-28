import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

import styles from './Modal.module.scss';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, onClose }) => {
  // Вішає слухача (mount)
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    // Прибирає слухача (unmount)
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  // Стежить за Escape та закриває модалку
  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  // Стежить за бекдропом та закриває модалку
  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.Overlay} onClick={handleBackdropClick}>
      <div className={styles.Modal}>{children}</div>
    </div>,
    modalRoot,
  );
};

Modal.defaultProps = {
  children: null,
};

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default Modal;

// import React, { Component } from 'react';
// import { createPortal } from 'react-dom';
// import PropTypes from 'prop-types';

// import styles from './Modal.module.scss';

// const modalRoot = document.querySelector('#modal-root');

// class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = event => {
//     if (event.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleBackdropClick = event => {
//     if (event.currentTarget === event.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <div className={styles.Overlay} onClick={this.handleBackdropClick}>
//         <div className={styles.Modal}>{this.props.children}</div>
//       </div>,
//       modalRoot,
//     );
//   }
// }

// Modal.defaultProps = {
//   children: null,
// };

// Modal.propTypes = {
//   children: PropTypes.node,
//   onClose: PropTypes.func.isRequired,
// };

// export default Modal;
