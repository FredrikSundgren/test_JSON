// 'use strict'

// fetch('./img.json')
//     .then(response => response.json())
//     .then(data => {

//         const jsonImages = data;
//         let imagesDiv = document.querySelector('.imageContainer')
//         console.log(imagesDiv);
//         jsonImages.forEach((image) => {
//             imagesDiv.innerHTML += '<img class="images" src="' + image.url + '"id="' + image.id + '"alt="' + image.alt + '"title="' + image.title + '"id="' + image.id + '"/>';
//         })
//         document.querySelectorAll('.imageContainer img').forEach(image => {
//             image.onclick = () => {
//                 console.log('hej');
//                 document.querySelector('.popupImage').style.display = 'block';
//                 document.querySelector('.popupImage img').src = image.getAttribute('src')
//             }
//         })
//         document.querySelector('.popupImage span').onclick = () => {
//             document.querySelector('.popupImage').style.display = 'none';
//         }
//         document.addEventListener('keydown', function (event) {
//             const key = event.key; // const {key} = event; in ES6+
//             if (key === "Escape") {
//                 document.querySelector('.popupImage').style.display = 'none';
//             }
//         });

//     })
'use strict'

fetch('./img.json')
    .then(response => response.json())
    .then(data => {

        const jsonImages = data;
        let imagesDiv = document.querySelector('.imageContainer')
        console.log(imagesDiv);
        jsonImages.forEach((image) => {
            imagesDiv.innerHTML += `<img id=${image.id} class="images" src=${image.url} alt="${image.alt}"/>`

            // ${image.description}${image.title} 

        })
        let descDiv = document.createElement('div')
        document.querySelectorAll('.imageContainer img').forEach(image => {
            console.log(image);
            image.onclick = () => {
                console.log('hej');
                console.log(image.id);


                document.querySelector('.popupImage').style.display = 'block';
                document.querySelector('.popupImage img').src = image.getAttribute('src')
                document.querySelector('.popupImage').appendChild(descDiv)
                descDiv.classList.add('descDiv')
                showText(image.id)



            }
        })
        document.querySelector('.popupImage span').onclick = () => {
            document.querySelector('.popupImage').style.display = 'none';
        }
        document.addEventListener('keydown', function (event) {
            const key = event.key; // const {key} = event; in ES6+
            if (key === "Escape") {
                document.querySelector('.popupImage').style.display = 'none';
            }
        });
        const popupImage = document.querySelector('.popupImage img')
        const btnPrev = document.querySelector('.btnPrev')
        const btnNext = document.querySelector('.btnNext')
        const imgArray = []
        let i = 0;

        jsonImages.forEach(images => {
            imgArray.push(images.url)
        });
        btnPrev.addEventListener('click', () => prev())
        btnNext.addEventListener('click', () => next())

        function prev() {
            if (i <= 0) i = imgArray.length;
            i--;
            return setImg()
        }

        function next() {
            if (i >= imgArray.length - 1) i = -1;
            i++;
            return setImg()
        }

        function setImg() {
            console.log('setImg');
            return popupImage.setAttribute('src', imgArray[i])


        }

        function showText(id) {
            const imgObj = jsonImages.find(({
                image
            }) => image === id)
            console.log(imgObj);
            return descDiv.insertAdjacentHTML('afterbegin', `<p>${imgObj.description}</p>`)

        }
    })