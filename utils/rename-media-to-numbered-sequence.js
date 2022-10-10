const fs = require("fs");
const path = require("path");

const mediaDirName = "media";

function getAllFileNames(dir) {
  let fileNames = [];
  try {
    fileNames = fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((item) => !item.isDirectory())
      .map((item) => item.name);
  } catch (err) {
    console.log(
      "error occurred while getting all filenames form directory: ",
      err
    );
  }
  return fileNames;
}

// renames the media in a given folder to hexadecimal sequence eg: 1,2,3,4,5,6,7,8,9,a,b etc
function main() {
  const mediaDir = path.resolve(__dirname, "..", mediaDirName);
  let fileNames = getAllFileNames(mediaDir);
  console.log("No. of files => ", fileNames.length);
  console.log("Filenames: ", fileNames);
  let counter = 1;
  // get filenames without extension
  fileNames = fileNames.map((fileName) => path.parse(fileName).name);

  // In first pass we prepend filenames with hexString separated by comma
  // we do this to avoid overriding filenames already in hexadecimal format
  fileNames.map((fileName) => {
    try {
      const hexString = parseInt(counter, 10).toString(16);
      fs.renameSync(
        `${mediaDir}/${fileName}.png`,
        `${mediaDir}/${hexString}_${fileName}.png`
      );
      counter++;
    } catch (err) {
      console.log(
        "error ocurred while adding hexString to the beginning of filenames: ",
        fileName
      );
      throw err;
    }
  });
  counter = 1;
  // in second pass we actually rename files to hexString
  fileNames.map((fileName) => {
    try {
      const hexString = parseInt(counter, 10).toString(16);
      fs.renameSync(
        `${mediaDir}/${hexString}_${fileName}.png`,
        `${mediaDir}/${hexString}.png`
      );
      console.log(
        `rename successful for file: ${fileName}.png to ${hexString}.png`
      );
      counter++;
    } catch (err) {
      console.log("error ocurred while renaming file: ", fileName);
      throw err;
    }
  });
  console.log("All files renamed successfully in media directory");
}

main();
