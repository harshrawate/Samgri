import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'samgri/products',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    resource_type: 'image',
  },
});

const rictualImageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'samgri/rituals',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    resource_type: 'image',
  },
});

const profileImageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'samgri/profiles', // <-- store separately
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    resource_type: 'image',
  },
});

const videoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'samgri/videos',
    allowed_formats: ['mp4', 'mov'],
    resource_type: 'video',
  },
});

const uploadImages = multer({ storage: imageStorage });
const uploadRitualImage = multer({ storage: rictualImageStorage });
const uploadProfileImage = multer({ storage: profileImageStorage });
const uploadVideos = multer({ storage: videoStorage });

export { cloudinary, uploadImages,uploadRitualImage, uploadProfileImage ,uploadVideos };
