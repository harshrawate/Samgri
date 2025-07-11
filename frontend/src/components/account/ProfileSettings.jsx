import { useState, useEffect } from 'react';
import {
  Upload,
  Calendar,
  User,
  Mail,
  Phone,
  Globe,
  BookOpen,
} from 'lucide-react';

export default function ProfileSettings() {
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null); // Store actual image file

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
    religion: '',
    language: '',
  });

  // Fetch user data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/me', {
          credentials: 'include',
        });
        const data = await res.json();

        if (res.ok) {
          setFormData({
            fullName: data.user.name || '',
            email: data.user.email || '',
            phone: data.user.phone || '',
            gender: data.user.gender || '',
            dateOfBirth: data.user.dateOfBirth?.slice(0, 10) || '',
            religion: data.user.religion || '',
            language: data.user.language || '',
          });
          setProfileImage(data.user.profileImage || null);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result); // For preview
      };
      reader.readAsDataURL(file);
      setProfileImageFile(file); // For upload
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('fullName', formData.fullName);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('gender', formData.gender);
    formDataToSend.append('dateOfBirth', formData.dateOfBirth);
    formDataToSend.append('religion', formData.religion);
    formDataToSend.append('language', formData.language);
    if (profileImageFile) {
      formDataToSend.append('profileImage', profileImageFile);
    }

    try {
      const res = await fetch('http://localhost:5000/api/users/update-profile', {
        method: 'PUT',
        credentials: 'include',
        body: formDataToSend,
      });

      const data = await res.json();
      if (res.ok) {
        alert('Profile updated successfully!');
      } else {
        alert(data.message || 'Something went wrong');
      }
    } catch (err) {
      console.error('Update error:', err);
      alert('Server error');
    }
  };

  if (loading) return <div className="text-center py-10">Loading profile...</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Profile Settings</h1>
          <p className="text-gray-600">Manage your account information and preferences</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Profile Photo Section */}
          <div className="flex flex-col items-center mb-8 md:flex-row md:items-start">
            <div className="relative mb-4 md:mb-0 md:mr-8">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border-4 border-gray-100">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={64} className="text-gray-400" />
                )}
              </div>
              <label
                htmlFor="profile-upload"
                className="absolute bottom-0 right-0 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full cursor-pointer"
              >
                <Upload size={16} />
              </label>
              <input
                id="profile-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-xl font-semibold">{formData.fullName}</h2>
              <p className="text-gray-500">{formData.email}</p>
              <button
                type="button"
                className="mt-2 text-sm text-orange-500 hover:text-orange-600 flex items-center justify-center md:justify-start"
                onClick={() => document.getElementById('profile-upload').click()}
              >
                <Upload size={14} className="mr-1" />
                Upload new photo
              </button>
            </div>
          </div>

          {/* Editable Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="col-span-1">
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                <User size={16} className="mr-2" />
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            {/* Email (read-only) */}
            <div className="col-span-1">
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Mail size={16} className="mr-2" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">Contact support to change email</p>
            </div>

            {/* Phone */}
            <div className="col-span-1">
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Phone size={16} className="mr-2" />
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Gender */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender (Optional)</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>

            {/* DOB */}
            <div className="col-span-1">
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Calendar size={16} className="mr-2" />
                Date of Birth (Optional)
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Religion */}
            <div className="col-span-1">
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                <BookOpen size={16} className="mr-2" />
                Preferred Religion
              </label>
              <select
                name="religion"
                value={formData.religion}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Select Religion</option>
                <option value="Hindu">Hindu</option>
                <option value="Sikh">Sikh</option>
                <option value="Jain">Jain</option>
                <option value="Buddhist">Buddhist</option>
                <option value="Christian">Christian</option>
                <option value="Muslim">Muslim</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Language */}
            <div className="col-span-1">
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Globe size={16} className="mr-2" />
                Preferred Language (Optional)
              </label>
              <select
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Select Language</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Punjabi">Punjabi</option>
                <option value="Tamil">Tamil</option>
                <option value="Telugu">Telugu</option>
                <option value="Bengali">Bengali</option>
                <option value="Marathi">Marathi</option>
                <option value="Gujarati">Gujarati</option>
              </select>
            </div>
          </div>

          {/* Submit */}
          <div className="mt-8 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 justify-end">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
