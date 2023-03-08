import React from 'react';

import styles from './styles.module.css';
const Header = (): JSX.Element => {
  return (
    <header className={styles.header}>
      <h1 className={styles['header-tittle']}>Imagen a PDF</h1>
    </header>
  );
};
export default Header;
