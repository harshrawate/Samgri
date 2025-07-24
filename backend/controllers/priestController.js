import { Priest } from '../models/priestModel.js';

export const createPriest = async (req, res) => {
  try {
    const {
      fullName,
      religion,
      languages,
      experience,
      rating,
      phone,
      email,
      addressLine,
      city,
      availableDateRanges
    } = req.body;

    const parsedLanguages = typeof languages === 'string' ? languages.split(',') : languages;
    const parsedDateRanges = typeof availableDateRanges === 'string'
      ? JSON.parse(availableDateRanges)
      : availableDateRanges;

    // Profile image (single)
    const profileImage = req.files?.profileImage?.[0];
    const profileImageData = profileImage
      ? {
          url: profileImage.path,
          public_id: profileImage.filename
        }
      : null;

    // Documents (multiple)
    const documents = (req.files?.documents || []).map((file) => ({
      url: file.path,
      public_id: file.filename,
      type: file.mimetype
    }));

     console.log('Files received:', req.files);
  console.log('Field names:', Object.keys(req.files || {}));
  console.log('Body:', req.body);

    const newPriest = new Priest({
      fullName,
      religion,
      languages: parsedLanguages,
      experience,
      rating,
      phone,
      email,
      addressLine,
      city,
      profileImage: profileImageData,
      documents,
      availableDateRanges: parsedDateRanges
    });

    const savedPriest = await newPriest.save();
    res.status(201).json({ success: true, data: savedPriest });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to create priest', error: err.message });
  }
};

export const getAllPriests = async (req, res) => {
  try {
    const priests = await Priest.find();
    res.status(200).json({ success: true, data: priests });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to fetch priests', error: err.message });
  }
};
