const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputFolderPath = process.argv[2];
const outputFolderPath = process.argv[3] || path.join(inputFolderPath, 'resized_images');

if (!inputFolderPath) {
  console.error('Usage: node app.js <input_folder_path> [output_folder_path]');
  process.exit(1);
}

if (!fs.existsSync(outputFolderPath)) {
  fs.mkdirSync(outputFolderPath);
}

const isImageFile = (filename) => {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.tiff', '.bmp', '.webp'];
  const ext = path.extname(filename).toLowerCase();
  return imageExtensions.includes(ext);
};

fs.readdir(inputFolderPath, (err, files) => {
  if (err) {
    console.error(`Error reading input folder: ${err}`);
    process.exit(1);
  }

  files.forEach((file) => {
    if (isImageFile(file)) {
      const inputFilePath = path.join(inputFolderPath, file);
      const outputFilePath = path.join(outputFolderPath, `resized_${file}`);

      sharp(inputFilePath)
        .resize(1280, 800, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
        .toFile(outputFilePath)
        .then(() => {
          console.log(`Image ${file} successfully resized to 1280x800 and saved as ${outputFilePath}`);
        })
        .catch((error) => {
          console.error(`Error resizing image ${file}:`, error);
        });
    }
  });
});

