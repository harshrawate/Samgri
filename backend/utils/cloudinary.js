import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage for different media types
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
    folder: 'samgri/profiles',
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

const priestStorage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    // Determine folder and resource type based on field name
    if (file.fieldname === 'documents') {
      return {
        folder: 'samgri/priestDocuments',
        resource_type: 'raw',
        public_id: `${Date.now()}-${file.originalname}`,
        allowed_formats: ['pdf', 'jpg', 'jpeg', 'png'],
      };
    } else if (file.fieldname === 'profileImage') {
      return {
        folder: 'samgri/profiles',
        resource_type: 'image',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
      };
    }
    
    // Default fallback
    return {
      folder: 'samgri/priests',
      resource_type: 'image',
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    };
  },
});



// Multer uploaders
const uploadImages = multer({ storage: imageStorage });
const uploadRitualImage = multer({ storage: rictualImageStorage });
const uploadProfileImage = multer({ storage: profileImageStorage });
const uploadVideos = multer({ storage: videoStorage });
const upload = multer({ storage: priestStorage });


export {
  cloudinary,
  uploadImages,
  uploadRitualImage,
  uploadProfileImage,
  uploadVideos,
  upload,

  
};
