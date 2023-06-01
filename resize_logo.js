const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputImagePath = process.argv[2];
const outputFolderPath = process.argv[3] || path.dirname(inputImagePath);

if (!inputImagePath) {
  console.error('Usage: node resize_png.js <input_image_path> [output_folder_path]');
  process.exit(1);
}

if (!fs.existsSync(outputFolderPath)) {
  fs.mkdirSync(outputFolderPath);
}

const sizes = [16, 32, 48, 128];
const inputFileName = path.basename(inputImagePath, path.extname(inputImagePath));

sizes.forEach((size) => {
  const outputFilePath = path.join(outputFolderPath, `${inputFileName}_${size}.png`);

  sharp(inputImagePath)
    .resize(size, size)
    .toFile(outputFilePath)
    .then(() => {
      console.log(`Image successfully resized to ${size}x${size} and saved as ${outputFilePath}`);
    })
    .catch((error) => {
      console.error(`Error resizing image:`, error);
    });
});
