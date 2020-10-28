init()

function init() {
    console.log("TextImage is initializing...")

    img_input = document.getElementById('input-images'); // multiple enabled file input element for file reads only
    img_section = document.getElementById('images'); // selected image elements will append
    text_input = document.getElementById('text-input'); // final image datas will be written
    max_image_length = 512; // max image edge length
    max_image = 8; // max number of images that can be added
    current_image = 0; // data_id counter for images

    startListeners();
}

// any listener can be placed here (i.e. image deletion listener)
function startListeners() {
    img_input.addEventListener('change', imageController)

    console.log("TextImage is ready!")
}


function imageController(e) {
    for (const image of e.target.files) {
        // extra file type control
        if (/image\/.*/.test(image.type)) {
            if (current_image < max_image) {
                current_image += 1;
                try {
                    compress(image, current_image, addImg);
                } catch (error) {
                    console.log(image.name, error);
                    current_image -= 1;
                    continue;
                }
            } else {
                alert("You can't add more than 8 images!");
                break;
            }
        } else {
            console.log(image.name, 'is not a valid image!');
        }

    }
    img_input.value = '';
}

function addImg(image) {
    img_section.appendChild(image);
    updateImageTexts();
}

// https://zocada.com/compress-resize-images-javascript-browser/
function compress(image, data_id, callback) {
    const fileName = image.name;
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = event => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
                var dimensions = getDimensions(img.width, img.height, max_image_length);
                const elem = document.createElement('canvas');
                elem.width = dimensions[0];
                elem.height = dimensions[1];
                const ctx = elem.getContext('2d');
                ctx.drawImage(img, 0, 0, elem.width, elem.height);

                img_n = createImg(data_id, elem.toDataURL("image/png"));
                callback(img_n);
            },
            reader.onerror = error => console.log(error);
    };
}

// any changes about image element will do here
function createImg(data_id, src) {
    image = document.createElement('img');
    image.setAttribute('data-id', data_id);
    image.src = src;

    return image;
}

// simple resolution calculation to matched given limit
function getDimensions(width, height, limit) {
    if (width >= height) {
        ratio = limit / width;
    } else {
        ratio = limit / height;
    }
    return [Math.round(width * ratio), Math.round(height * ratio)];
}

// should run for updated text input after addition or deletion
// all datas stored in a JSON object, you can change from here how you want to store them
function updateImageTexts() {
    current_image = 0;
    data = {}
    for (const img of img_section.getElementsByTagName('IMG')) {
        current_image += 1;
        data[img.getAttribute('data-id')] = img.src;
    }
    text_input.value = JSON.stringify(data);
}