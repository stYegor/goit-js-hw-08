// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');
const galleryMarkup = createGalleryMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);
galleryContainer.addEventListener('click', openModal);

let gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
        <div class="gallery__item">
            <a class="gallery__item" href="${original}">
                <img
                  class="gallery__image"
                  src="${preview}"
                  alt="${description}"
                />
            </a>
        </div>`;
    })
    .join('');
}

function getImageIndex(image) {
  return galleryItems.indexOf(
    galleryItems.find(imageObj => imageObj.preview === image)
  );
}

function openModal(event) {
  event.preventDefault();
  const index = getImageIndex(event.target.src);
  simpleLightbox
    .create(
      `
		<a href="${galleryItems[index].preview}">
  <img src="${galleryItems[index].original}" alt="" title="${galleryItems[index].description}" />
</a>
	`
    )
    .show();
}

console.log(galleryItems);
