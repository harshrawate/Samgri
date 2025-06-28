import Address from '../models/addressModel.js';

export const getAddresses = async (req, res) => {
  const userId = req.user._id;
  try {
    const addresses = await Address.find({ userId });
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch addresses' });
  }
};

export const addAddress = async (req, res) => {
  const userId = req.user._id;
  try {
    if (req.body.isDefault) {
      await Address.updateMany({ userId }, { isDefault: false });
    }

    const newAddress = new Address({ ...req.body, userId });
    await newAddress.save();
    res.status(201).json(newAddress);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add address' });
  }
};

export const updateAddress = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  try {
    if (req.body.isDefault) {
      await Address.updateMany({ userId }, { isDefault: false });
    }

    const updated = await Address.findOneAndUpdate(
      { _id: id, userId },
      { $set: req.body },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update address' });
  }
};

export const deleteAddress = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  try {
    await Address.findOneAndDelete({ _id: id, userId });
    res.json({ message: 'Address deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete address' });
  }
};
