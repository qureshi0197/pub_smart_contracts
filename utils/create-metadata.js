const { time, timeStamp } = require("console");
const fs = require("fs");
const path = require("path");

const configFileName = "config.json";
const mediaDirName = "media";
const metadataDirName = "metadata";

const metadataDir = path.resolve(__dirname, "..", metadataDirName);
const useHexadecimalFormatForMediaDir = true;

function getAllFileNames(dir) {
  let fileNames = [];
  try {
    fileNames = fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((item) => !item.isDirectory())
      .map((item) => item.name);
  } catch (err) {
    console.log(
      `error occurred while getting all filenames from directory ${dir}: `,
      err
    );
    throw err;
  }
  return fileNames;
}

function main() {
  const configFilePath = path.resolve(__dirname, "..", configFileName);

  const config = JSON.parse(fs.readFileSync(configFilePath, "utf8"));
  const collectionName = config.collectionName;
  const description = config.description;
  const baseUri = config.baseUri;

  const mediaDir = path.resolve(__dirname, "..", mediaDirName);

  let fileNames = getAllFileNames(mediaDir);
  //   let index = 0;
  let fileNameIndex = 1;

  console.log("Number of files: ", fileNames.length);
  console.log("filenames in media directory:", fileNames);

  metadataArray = [];

  const metadataDir = path.resolve(__dirname, "..", metadataDirName);

  createDirIfNotExists(metadataDir);
  const fileExtension = path.extname(fileNames[0] || "");
  // extract filenames without extension
  fileNames = fileNames.map((fileName) => path.parse(fileName).name);
  //   console.log("file name length: ", fileNames.length);

  const promisesArray = fileNames.map((fileName, idx) => {
    new Promise((resolve, reject) => {
      try {
        let hexString = null;
        let sequence = null;

        if (useHexadecimalFormatForMediaDir) {
          hexString = fileNameIndex.toString();
          sequence = parseInt(hexString, 16);

          //   console.log("File Name is: ", fileName);
        } else {
          hexString = parseInt(idx + 1, 10).toString(16);
          sequence = idx + 1;
        }
        // createMetadataFile(
        //   {
        //     name: `${collectionName} #${sequence}`,
        //     description: `${description}`,
        //     image: `${baseUri}/${fileNameIndex}${fileExtension}`,
        //   },
        //   hexString
        // );
        createMetadataFile(
          {
            description: `${description}`,
            external_url: "https://the-publicator.com/",
            animation_url: `${baseUri}/${fileNameIndex}${fileExtension}`,
            name: `${collectionName} #${sequence}`,
            attributes: [
              {
                trait_type: "Subscription",
                value: "3 Months",
              },
            ],
          },
          hexString
        );
        fileNameIndex++;
      } catch (err) {
        console.log(
          `error occurred while creating metadata for file: ${fileName}. Error: ${err}`
        );
        reject();
      }
      resolve();
    });
  });

  Promise.all(promisesArray)
    .then(() => console.log("metadata files creation completed successfully"))
    .catch((err) =>
      console.log("error occurred while creating metadata files: ", err)
    );
}

function createMetadataFile(metadata, hexString) {
  // console.log("CreateMetaDataFile called");
  // convert filename to padded hex string
  const paddedHexString = toPaddedHexString(hexString, 64);
  fs.writeFileSync(
    `${metadataDir}/${paddedHexString}.json`,
    JSON.stringify(metadata, null, 4),
    "utf8"
  );
  console.log("metadata file created successfully for file: ", hexString);
}

function toPaddedHexString(num, len) {
  return num.toString(16).padStart(len, "0");
}

function createDirIfNotExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

main();
