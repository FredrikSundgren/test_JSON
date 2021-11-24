'use strict'
///////////////// Getting and creating all elements //////////////////////////
let imagesDiv = document.querySelector('.imageContainer')
const popupImageDiv = document.querySelector('.popupImage')
const popupImage = document.querySelector('.popupImage img')
const span = document.querySelector('.popupImage span')
const buttons = document.querySelector('.buttons')

let descDiv = document.createElement('div')
popupImage.insertAdjacentElement('afterend', descDiv)
descDiv.classList.add('descDiv')

///////////////// Fetching data /////////////////////////////////////////////
fetch('./img.json')
    .then(response => response.json())
    .then(data => {
        const jsonImages = data;
        jsonImages.forEach((image) => {
            imagesDiv.innerHTML += `<img id=${image.id} class="images" src=${image.url} alt="${image.alt}" data-src="${image.url}"/>`
        })

        document.querySelectorAll('.imageContainer img').forEach(image => {
            image.onclick = (e) => {
                let clickedImgId = e.target.id
                popupImageDiv.style.display = 'block';
                popupImage.src = image.getAttribute('src')
                let indexOfImg = jsonImages.findIndex(images => images.id === clickedImgId);
                setImg(indexOfImg)
            }
        })

        ////////////////// Event listeners //////////////////
        span.onclick = () => {
            popupImageDiv.style.display = 'none';
        }

        document.addEventListener('keydown', (event) => {
            const key = event.key; // const {key} = event; in ES6+
            if (key === "Escape") {
                popupImageDiv.style.display = 'none';
            }
        });

        buttons.addEventListener('click', (e) => move(e))

        /////////////////// Functions ///////////////////////
        const move = (e) => {
            let buttonClass = e.target.className;
            const imageUrl = e.path[2].children[1].attributes[0].value;
            let indexOfImg = jsonImages.findIndex(image => image.url === imageUrl);

            if (buttonClass === 'btnPrev') {
                if (indexOfImg <= 0) {
                    indexOfImg = jsonImages.length - 1
                    return setImg(indexOfImg)
                }
                indexOfImg--;
                return setImg(indexOfImg)

            } else if (buttonClass == 'btnNext') {
                if (indexOfImg >= jsonImages.length - 1) {
                    indexOfImg = 0
                    return setImg(indexOfImg)
                }
                indexOfImg++;
                return setImg(indexOfImg)
            }
        }

        const setImg = (index) => {
            popupImage.setAttribute('src', jsonImages[index].url)
            descDiv.innerHTML = `<p>${jsonImages[index].description}</p>`
        }
    })
