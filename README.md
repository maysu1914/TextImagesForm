# Text Images
This project will help you to compress images in front-end and submit them as plain texts with standard HTML form.

## Contents
1. [Quick Install](#quick-install)
1. [Functions](#functions)
1. [Pros](#pros)
1. [Cons](#cons)

## Quick Install
There are several functions to you should check before proceed.

### init()
You must edit **init()** function to suit your project:

    function init(){
        ...
        img_input = document.getElementById('input-images'); // multiple enabled file input element for file reads only
        img_section = document.getElementById('images'); // selected image elements will append
        text_input = document.getElementById('text-input'); // final image datas will be written
        max_image_length = 512; // max image edge length
        max_image = 8; // max number of images that can be added
        ...
    };

### startListeners()
Project has only one listener initially but you can add more of them in here.

### imageController()
There is an alert for max image limit exceeded, you can modify it.

### createImg()
This is the function where IMG elements are created, you can modify them here. 

**That's it, you ready to go.**

## Functions
Other functions can be edited too for some customization.

### addImg(image)
This function takes the image element and append it as child to target element which is defined in init(). Then runs the updateImageTexts() function.

### compress(image, data_id, callback)
This function takes the image file, it's id and callback function.

### getDimensions(width, height, limit)
This is a very simple function that return new dimensions by given ones while keeping the aspect ratio. You can edit it by your will.

### updateImageTexts()
This function reads elements tagged with IMG in img_section defined in init() then adds their data-id and SRC values to new JSON object. Also it counts them again. After all, it stringify the JSON object and write data to text_input element define in init().

## Pros
* You can compress images in frontend which is save you time
* Uncompressed image uploads will be heavy for server; compressed image uploads will be lighter
* You can easily control the images in frontend (adding or removing one by one); you can't do with standard file input (multiple enabled)

## Cons
* You must decode the image datas after received in server
