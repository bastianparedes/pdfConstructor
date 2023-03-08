import React from 'react';

import Dropzone from 'react-dropzone';
import { BsFillGearFill } from 'react-icons/bs';
import { FcAddImage } from 'react-icons/fc';

import styles from './styles.module.css';
import pageSizes from '../../config/pageSizes.json';

const SideBar = (props: any): JSX.Element => {
  const [openedSideBar, setOpenedSideBar] = React.useState(false);
  const [dropZoneActive, setDropZoneActive] = React.useState(false);

  const numberOfUploadedFiles = React.useRef(0);

  const MyDropZone = (): JSX.Element => {
    const onDrop = (files: any): any => {
      const newInfo = {};
      const newFiles = files.map((file: any) => {
        numberOfUploadedFiles.current++;
        newInfo[numberOfUploadedFiles.current] = {
          base64: '',
          imageRotation: 0
        };
        return {
          file,
          key: numberOfUploadedFiles.current
        };
      });
      setDropZoneActive(false);
      props.onDrop(newFiles, newInfo);
    };

    return (
      <Dropzone
        onDragLeave={() => {
          setDropZoneActive(false);
        }}
        onDragOver={() => {
          setDropZoneActive(true);
        }}
        onDrop={onDrop}
      >
        {({ getRootProps }) => (
          <div
            className={
              styles.dropzone +
              ' ' +
              styles[dropZoneActive ? 'dropzone-active' : '']
            }
            {...getRootProps()}
          >
            <span className={styles['dropzone-icon']}>
              <FcAddImage />
            </span>
            <span className={styles['dropzone-text']}>
              {dropZoneActive? 'Suelta tus archivos para cargarlos': 'Arrastra y suelta los archivos aquí o haz click para buscarlos'}
            </span>
          </div>
        )}
      </Dropzone>
    );
  };

  const PageSize = (): JSX.Element => {
    return (
      <div className={styles['sidebar-section-page-size']}>
        <h2 className={styles['page-attribute-tittle']}>Tamaño de la página</h2>
        <select
          className={styles['page-size']}
          name="pageSize"
          onChange={(event) => {
            props.updatePage(event.target.name, event.target.value);
          }}
          value={props.pageSize}
        >
          {pageSizes.dimensions.map((info, pos) => (
            <option key={pos} value={info.value}>
              {info.textContent}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const PageOrientation = (): JSX.Element => {
    return (
      <div
        className={
          styles['sidebar-section-page-orientation'] +
          ' ' +
          styles[
            props.pageSize === 'adjusted'? 'sidebar-section-page-orientation-hidden': ''
          ]
        }
      >
        <h2 className={styles['page-attribute-tittle']}>
          Orientación de la página
        </h2>
        <select
          className={styles['page-orientation']}
          name="pageOrientation"
          onChange={(event) => {
            props.updatePage(event.target.name, event.target.value);
          }}
          value={props.pageOrientation}
        >
          <option value="portrait">Vertical</option>
          <option value="landscape">Horizontal</option>
        </select>
      </div>
    );
  };

  return (
    <div
      className={
        styles.sidebar + ' ' + styles[openedSideBar ? '' : 'sidebar-closed']
      }
    >
      <div
        className={styles['sidebar-btn']}
        onClick={() => {
          setOpenedSideBar(!openedSideBar);
        }}
      >
        <BsFillGearFill />
      </div>
      <MyDropZone />
      <PageSize />
      <PageOrientation />
      <div className={styles['sidebar-section-generate-pdf']}>
        <button
          className={styles['generate-pdf-btn']}
          onClick={props.generatePdf}
        >
          Generar PDF
        </button>
      </div>
    </div>
  );
};

export default SideBar;
