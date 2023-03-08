import React from 'react';

import { FiRotateCcw } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';

import styles from './styles.module.css';
import gif from '../../public/loading image.gif';

const FileCard = (props: any): JSX.Element => {
  const [src, setSrc] = React.useState(gif);
  const [imageRotation, setImageRotation] = React.useState(0);
  const rotateImage = (): void => {
    const newImageRotation = (imageRotation + 90) % 360;
    setImageRotation(newImageRotation);
    props.rotateImage(newImageRotation);
  };

  React.useEffect(() => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(props.file);
    fileReader.addEventListener('load', () => {
      const base64 = fileReader.result;
      setSrc(base64);
      props.updateBase64(base64);
    });
  }, []);

  return (
    <div className={styles['file-card-border']}>
      <div className={styles['file-card-margin']}>
        <BtnsContainer
          deleteFileCard={props.deleteFileCard}
          rotateImage={rotateImage}
        />
        <div
          className={
            styles['file-card-page'] +
            ' ' +
            styles[
              props.pageSize === 'adjusted'? 'file-card-page-adjusted': props.pageOrientation === 'portrait'? 'file-card-page-vertical': 'file-card-page-horizontal'
            ]
          }
        >
          <img
            alt={props.file.name}
            className={styles['file-card-image']}
            src={src}
            style={{
              '--angle': imageRotation,
              maxHeight:
                imageRotation % 180 === 0 ? 'var(--height)' : 'var(--width)',
              maxWidth:
                imageRotation % 180 === 0 ? 'var(--width)' : 'var(--height)'
            }}
          />
        </div>
      </div>
    </div>
  );
};

function BtnsContainer(props) {
  return (
    <div className={styles['btns-container'] + ' btns-container'}>
      <button className={styles['rotate-btn']} onClick={props.rotateImage}>
        <FiRotateCcw />
      </button>
      <button className={styles['delete-btn']} onClick={props.deleteFileCard}>
        <IoMdClose />
      </button>
    </div>
  );
}

export default FileCard;
