import galleryItems from './gallery-items.js';

const galleryPlaceEl = document.querySelector('.gallery.js-gallery');
const backdrop = document.querySelector('.lightbox');
const closeBtn = document.querySelector('[data-action="close-lightbox"]');
const bigPicLink = document.querySelector('.lightbox__image');

let picTargetIndex;

const createPictureTable = function (galleryItems) {
    
    galleryItems.forEach((item, i) => {
        const listEL = document.createElement('li');
        listEL.classList.add('gallery__item');
        
        const linkEl = document.createElement('a');
        linkEl.classList.add('gallery__link');
        linkEl.setAttribute('href', `${item.original}`);
        
        const imgEl = document.createElement('img');
        imgEl.classList.add('gallery__image');
        imgEl.setAttribute('src', `${item.preview}`);
        imgEl.setAttribute('data-source', `${item.original}`);
        imgEl.setAttribute('data-index', `${i}`);
        imgEl.setAttribute('alt', `${item.description}`);

        linkEl.append(imgEl);
        listEL.append(linkEl);
        galleryPlaceEl.append(listEL);
    });
};

createPictureTable(galleryItems);

galleryPlaceEl.addEventListener('click', onThePicClick);
closeBtn.addEventListener('click', onCloseModalWindow);
backdrop.addEventListener('click', onBackdropClick);

function onThePicClick(e) {
    if (e.target.nodeName !== 'IMG') {
        return;
    }
    e.preventDefault();

    picTargetIndex = Number(e.target.dataset.index);

    bigPicLink.setAttribute('src', e.target.dataset.source);
    onOpenModalWindow();
}

function onOpenModalWindow() {
    window.addEventListener('keydown', onEscKeyPress, );
    window.addEventListener('keydown', onRightOrLeftKeyPress);

    backdrop.classList.add('is-open');
}

function onCloseModalWindow() {
    window.removeEventListener('keydown', onEscKeyPress);
    window.removeEventListener('keydown', onRightOrLeftKeyPress);

    backdrop.classList.remove('is-open');
}

function onBackdropClick(e) {
    if (e.target !== bigPicLink) {
        bigPicLink.setAttribute('src', '');
        onCloseModalWindow()
    }
}

function onEscKeyPress(e) {
    if (e.code === 'Escape') {
        onCloseModalWindow();
    }
}
        
function onRightOrLeftKeyPress(e) {

    if (e.code === 'ArrowRight') {
        if (picTargetIndex < galleryItems.length-1) {
            picTargetIndex += 1;
            bigPicLink.setAttribute('src', galleryItems[picTargetIndex].original);
        } else {
            onCloseModalWindow();
        }

    } if (e.code === 'ArrowLeft') {   
        if (picTargetIndex > 0) {
            picTargetIndex -= 1;
            bigPicLink.setAttribute('src', galleryItems[picTargetIndex].original);
        } else {
            onCloseModalWindow();
        }
    } 
}