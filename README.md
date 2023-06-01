# convert
This are set of node command line utilities for windows to convert images to chrome store images.
Chrome store requires store images of certain sizes which is hard to create. 
This utilities can be used for converting any image to the size recommended by the chrome store

Prompt https://chat.openai.com/c/66b6c611-358d-4f08-9120-9c65771610cf

## Usage 
1. node app.js path_to_the_directory_with_images_to_convert
    It will add a folder called resized_images in the source directory with resized images

2. node resize_logo.js source_of_logo_folder
    It will create the logos file from the source file in the size 16,32,48, 128
