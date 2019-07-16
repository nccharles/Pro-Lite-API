import cloudinary from 'cloudinary';
import 'dotenv/config';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});
const imageUpload = async (file) => {
    const is_image = await cloudinary.v2.uploader.upload(file.tempFilePath);
    if (!is_image) return false;
    return is_image.url;
};

export default imageUpload;

