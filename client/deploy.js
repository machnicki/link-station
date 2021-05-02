const fs = require("fs");
const path = require("path");
const async = require("async");
const AWS = require("aws-sdk");
const readdir = require("recursive-readdir");

const s3BucketName = "link-station";
const rootFolder = path.resolve(__dirname, "./");
const uploadFolder = "build";
const s3 = new AWS.S3({
  signatureVersion: "v4"
});

function getFiles(dirPath) {
  return fs.existsSync(dirPath) ? readdir(dirPath) : [];
}

async function deploy(upload) {
  const filesToUpload = await getFiles(path.resolve(__dirname, upload));

  return new Promise((resolve, reject) => {
    async.eachOfLimit(
      filesToUpload,
      10,
      async.asyncify(async (file) => {
        const Key = file.replace(`${rootFolder}/${uploadFolder}/`, "");
        console.log(`uploading: [${Key}]`);

        let extn = Key.split(".").pop();
        let contentType = "application/octet-stream";
        if (extn == "html") contentType = "text/html";
        if (extn == "css") contentType = "text/css";
        if (extn == "js") contentType = "application/javascript";
        if (extn == "png" || extn == "jpg" || extn == "gif")
          contentType = "image/" + extn;

        return new Promise((res, rej) => {
          s3.upload(
            {
              Key,
              Bucket: s3BucketName,
              Body: fs.readFileSync(file),
              ContentType: contentType
            },
            (err) => {
              if (err) {
                return rej(new Error(err));
              }
              res({ result: true });
            }
          );
        });
      }),
      (err) => {
        if (err) {
          return reject(new Error(err));
        }
        resolve({ result: true });
      }
    );
  });
}

deploy(uploadFolder)
  .then(() => {
    console.log("task complete");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
