import React from 'react';

import jsPDF from 'jspdf';
import { ReactSortable } from 'react-sortablejs';

import styles from './styles.module.css';
import FileCard from '../FileCard';
import Modal from '../Modal';
import SideBar from '../SideBar';

class Main extends React.Component {
  state = {
    files: [],
    openedModal: false,

    pageOrientation: 'portrait',
    // {key,  file}
    pageSize: 'adjusted'
  };

  infoToGeneratePdf = {}; // {key:{base64, imageRotation}}}

  generatePdf = () => {
    this.checkIfEveryBase64IsLoaded();
    if (this.state.files.length === 0) {
      alert('No has ingresado ninguna imagen.');
      return;
    }

    this.setState({ openedModal: true });
    // eslint-disable-next-line new-cap
    const doc = new jsPDF();
    doc.deletePage(1);

    let promise = Promise.resolve();

    for (const info of this.state.files) {
      promise = promise.then(async () => {
        await new Promise((resolve) => {
          let base64 = this.infoToGeneratePdf[info.key].base64;
          const imageRotation = this.infoToGeneratePdf[info.key].imageRotation;

          const image = new Image();
          image.src = base64;
          image.addEventListener('load', () => {
            let imageWidth;
            let imageHeight;
            if (imageRotation === 0) {
              // imagen sin rotar
              imageWidth = image.width;
              imageHeight = image.height;
            } else {
              // imagen rotada
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              canvas.width =
                imageRotation % 180 === 0 ? image.width : image.height;
              canvas.height =
                imageRotation % 180 === 0 ? image.height : image.width;

              ctx.translate(canvas.width / 2, canvas.height / 2);
              ctx.rotate((-imageRotation * Math.PI) / 180);
              ctx.drawImage(image, image.width / -2, image.height / -2);

              base64 = canvas.toDataURL();

              const imageInfo = doc.getImageProperties(base64);
              imageWidth = imageInfo.width;
              imageHeight = imageInfo.height;
            }

            if (this.state.pageSize === 'adjusted') {
              doc.addPage();
              doc.internal.pageSize.setWidth(imageWidth);
              doc.internal.pageSize.setHeight(imageHeight);
              doc.addImage(base64, 'png', 0, 0, imageWidth, imageHeight);
            } else {
              doc.addPage(this.state.pageSize, this.state.pageOrientation);
              const pageWidth = doc.internal.pageSize.getWidth();
              const pageHeight = doc.internal.pageSize.getHeight();

              const newImageWidth =
                pageWidth / pageHeight <= imageWidth / imageHeight? pageWidth: (imageWidth * pageHeight) / imageHeight;
              const newImageHeight =
                pageWidth / pageHeight <= imageWidth / imageHeight? (imageHeight * pageWidth) / imageWidth: pageHeight;

              const leftMargin = (pageWidth - newImageWidth) / 2;
              const topMargin = (pageHeight - newImageHeight) / 2;

              doc.addImage(
                base64,
                'png',
                leftMargin,
                topMargin,
                newImageWidth,
                newImageHeight
              );
            }
            resolve();
          });
        });
      });
    }
    void promise.then(
      async () =>
        await new Promise(() => {
          this.setState({ openedModal: false });
          doc.save('PDF constructor.pdf');
        })
    );
  };

  deleteFileCard = (key) => {
    const updatedFiles = this.state.files.filter((info) => info.key !== key);
    this.setState({ files: updatedFiles });
  };

  checkIfEveryBase64IsLoaded = () => {
    for (const file of this.state.files) {
      if (this.infoToGeneratePdf[file.key].base64 === '') {
        return;
      }
    }
    this.setState({ openedModal: false });
  };

  render() {
    return (
      <main className={styles.main}>
        <SideBar
          generatePdf={this.generatePdf}
          onDrop={(newFiles, newInfo) => {
            this.infoToGeneratePdf = { ...this.infoToGeneratePdf, ...newInfo };
            this.setState({
              files: [...this.state.files, ...newFiles],
              openedModal: true
            });
          }}
          pageOrientation={this.state.pageOrientation}
          pageSize={this.state.pageSize}
          updatePage={(pagePropertie, newValue) => {
            this.setState({ [pagePropertie]: newValue });
          }}
        />

        <ReactSortable
          animation="300"
          className={styles['div-files-container']}
          ghostClass={styles['file-card-border-ghostClass']}
          list={this.state.files}
          setList={(newState) => {
            this.setState({ files: newState });
          }}
        >
          {this.state.files.map((info) => (
            <FileCard
              deleteFileCard={() => {
                this.deleteFileCard(info.key);
              }}
              file={info.file}
              key={info.key}
              pageOrientation={this.state.pageOrientation}
              pageSize={this.state.pageSize}
              rotateImage={(imageRotation) => {
                this.infoToGeneratePdf[info.key].imageRotation = imageRotation;
              }}
              updateBase64={(base64) => {
                this.infoToGeneratePdf[info.key].base64 = base64;
                this.checkIfEveryBase64IsLoaded();
              }}
            />
          ))}
        </ReactSortable>
        {this.state.openedModal ? <Modal /> : <></>}
      </main>
    );
  }
}
export default Main;
