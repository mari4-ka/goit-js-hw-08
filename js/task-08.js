import galleryItems from './gallery-items.js';

const galleryPlaceEl = document.querySelector('.gallery.js-gallery');


const backdrop = document.querySelector('.lightbox');
const closeBtn = document.querySelector('[data-action="close-lightbox"]');
const bigPicLink = document.querySelector('.lightbox__image');

let picTarget;

function createPictureTable({ preview, original, description }) {
    const listEL = document.createElement('li');
    listEL.classList.add('gallery__item');
    
    const linkEl = document.createElement('a');
    linkEl.classList.add('gallery__link');
    linkEl.setAttribute('href', `${original}`);
    
    const imgEl = document.createElement('img');
    imgEl.classList.add('gallery__image');
    imgEl.setAttribute('src', `${preview}`);
    imgEl.setAttribute('data-source', `${original}`);
    imgEl.setAttribute('alt', `${description}`);
    
    linkEl.append(imgEl);
    listEL.append(linkEl);
    
    return listEL;
};

const elements = galleryItems.map(createPictureTable);
galleryPlaceEl.append(...elements);

galleryPlaceEl.addEventListener('click', onThePicClick);
closeBtn.addEventListener('click', onCloseModalWindow);
backdrop.addEventListener('click', onBackdropClick);

function onThePicClick(e) {
    if (e.target.nodeName !== 'IMG') {
        return;
    }
    e.preventDefault();
    picTarget = e.target;

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
const picLiItem = document.querySelector('.gallery__item');
console.log(picLiItem);

        
function onRightOrLeftKeyPress(e) {
    if (e.code === 'ArrowRight') {
        console.log('Press Right');

        let nextPicLi = e.target.parentElement.nextSibling;
        bigPicLink.setAttribute('src', nextPicLi.dataset.source);
        smallPicLink = nextPicLi;
        // const nextPicLink = nextPicLi.target;
        // bigPicLink.setAttribute('src', e.target.parentElement.nextSibling.dataset.source);
    } if (e.code === 'ArrowLeft') {
        console.log('Press Left')
        // console.log(smallPicLink.previousSibling)
        // bigPicLink.setAttribute('src', e.target.dataset.source);
    } 
}

// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" 
// и "вправо".

