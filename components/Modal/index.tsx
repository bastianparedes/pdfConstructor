import React from 'react';

import styles from './styles.module.css';
const Modal = (): JSX.Element => {
  return (
    <div className={styles['modal-container']}>
      <div className={styles['modal-content']}>
        <img
          alt="Loading"
          className={styles['loading-gif']}
          src={require('../../public/loading.gif')}
        />
      </div>
    </div>
  );
};

export default Modal;
