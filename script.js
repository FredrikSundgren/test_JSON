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

        jsonImages.forEach(images => {
            imgArray.push(images.url)
        });
        btnPrev.addEventListener('click', (e) => prev(e))
        btnNext.addEventListener('click', (e) => next(e))

        function prev(e) {
            console.log("e", e);
            console.log(e.path[2].children[1].currentSrc);

            const imageUrl = e.path[2].children[1].currentSrc;
            const sliced = imageUrl.slice(22);
            console.log("sliced", sliced);
            let indexOfImg = imgArray.findIndex(image => image === sliced);
            console.log("imgArray", imgArray);
            console.log("index", indexOfImg);
            if (indexOfImg <= 0) indexOfImg = imgArray.length;
            indexOfImg--;
            return setImg(indexOfImg)
        }

        function next(e) {
            console.log("e", e);
            console.log(e.path[2].children[1].currentSrc);

            const imageUrl = e.path[2].children[1].currentSrc;
            const sliced = imageUrl.slice(22);
            console.log("sliced", sliced);
            let indexOfImg = imgArray.findIndex(image => image === sliced);
            console.log("imgArray", imgArray);
            console.log("index", indexOfImg);
            if (indexOfImg >= imgArray.length - 1) indexOfImg = -1;
            indexOfImg++;
            return setImg(indexOfImg)
        }

        function setImg(index) {
            console.log("index i setImg", index);
            console.log('setImg');
            const imagePoppedUp = jsonImages.find(images => images.url === imgArray[index]);
            console.log("imagePoppedUp", imagePoppedUp);
            popupImage.setAttribute('src', imgArray[index])
            descDiv.innerHTML = `<p>${imagePoppedUp.description}</p>`
        }

        function showText(id) {
            console.log(jsonImages);
            console.log(id);
            const imgObj = jsonImages.find(image => image.id === id);
            console.log("imgObj", imgObj);
            return descDiv.innerHTML = `<p>${imgObj.description}</p>`
        }
    })
