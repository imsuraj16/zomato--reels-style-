const ImageKit = require("imagekit");

var imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const uploadFile = async (buffer, fileName) => {
  try {
    const result = await imagekit.upload({
      file: buffer,
      fileName: fileName,
      folder: "foodVideos",
    });
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = uploadFile;
