import fs from 'fs';
import path from 'path';

import AWS from 'aws-sdk';
import s3StreamFactory from 's3-upload-stream';

import constants from '../config/constants'

const s3Config = {
  accessKeyId: constants.get('S3_ACCESS_KEY_ID'),
  secretAccessKey: constants.get('S3_SECRET_ACCESS_KEY'),
  region: constants.get('S3_REGION')
};
const s3Stream = s3StreamFactory(new AWS.S3(s3Config));

const backendWorkingDirectory = path.join(__dirname, '..', 'public');
const frontendWorkingDirectory = path.join(__dirname, '..', 'public', 'assets');

const defaultConfig = {
  Bucket: constants.get('S3_ASSETS_BUCKET')
};
const gzipMetaTags = {
  ContentEncoding: 'gzip',
  ContentType: 'text/javascript'
};
const cssMetaTags = {
  ContentType: 'text/css'
}

const tasks = [];

/*
 * Frontend files
 */
fs.readdir(frontendWorkingDirectory, (err, files) => {
  files.forEach(file => {
    if (/\.(gz)/.test(file)) {
      tasks.push(uploadFile(frontendWorkingDirectory, file, gzipMetaTags));
    }
    else if (/\.(css)/.test(file)) {
      tasks.push(uploadFile(frontendWorkingDirectory, file, cssMetaTags));
    }
    else if (
      /favicons/.test(file) ||
      /\.(json)/.test(file) ||
      /(styles.css|styles.css.map)/.test(file)
      ) {
      console.log('skipping:' + file)
    }
    else {
      tasks.push(uploadFile(frontendWorkingDirectory, file));
    }
  });
});

/*
 * Backend files
 */
fs.readdir(backendWorkingDirectory, (err, files) => {
  files.forEach(file => {
    if (!/assets/.test(file)) {
      tasks.push(uploadFile(backendWorkingDirectory, file));
    }
  });
})

function uploadFile(workingDirectory, filename, extraConfig = {}) {
  return new Promise((resolve, reject) => {
    const config = Object.assign({ Key: filename }, extraConfig, defaultConfig);

    // Create the streams
    const upload = s3Stream.upload(config);

    // Optional configuration
    upload.maxPartSize(20971520); // 20 MB
    upload.concurrentParts(5);

    // Handle errors.
    upload.on('error', (error) => {
      console.log(error);
      reject(error);
    });

    /* Handle upload completion. Example details object:
      { Location: 'https://bucketName.s3.amazonaws.com/filename.ext',
        Bucket: 'bucketName',
        Key: 'filename.ext',
        ETag: '"bf2acbedf84207d696c8da7dbb205b9f-5"' }
    */
    upload.on('uploaded', (details) => {
      console.log(`${filename} was successfully uploaded!`);
      console.dir(details);
      resolve();
    });

    const readStream = fs.createReadStream(path.join(workingDirectory, filename));
    readStream.pipe(upload); 
  });
}

Promise.all(tasks)
  .then(() => {
    console.log('All uploads successfully completed! Have a great day');
  })
  .catch(errArray => {
    console.error('There was a problem');
  });