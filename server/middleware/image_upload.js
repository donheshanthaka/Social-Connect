import streamifier from "streamifier"
import cloudinary from '../utils/cloudinary.js'

const uploadImage = async (req, res, next) => {
  console.log('dum')
  try {
    let preset = ''
    if (req.body.type === 'post') {
      preset = 'post'
    } else {
      preset = 'profile_image'
    }
    let streamUpload = (req) => {
        return new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream(
              {upload_preset: preset},
              (error, result) => {
                if (result) {
                  resolve(result);
                } else {
                  reject(error);
                }
              }
            );
  
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
    };
  
    async function upload(req) {
        let result = await streamUpload(req);
        return result;
    }
  
    const result = await upload(req);
    req.body.imageURL = result.secure_url
    next()
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export default uploadImage