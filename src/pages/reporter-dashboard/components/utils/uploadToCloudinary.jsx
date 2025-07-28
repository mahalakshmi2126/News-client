export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'news_upload');
  formData.append('cloud_name', 'dh8l1zxgi');

  const uploadType = file.type.startsWith('video/') ? 'video' : 'image';
  console.log('Uploading file:', { name: file.name, size: file.size, type: file.type });

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/dh8l1zxgi/${uploadType}/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    console.log('Cloudinary response:', data);

    if (data.secure_url) {
      return data.secure_url;
    } else {
      throw new Error(data.error?.message || 'Upload failed');
    }
  } catch (err) {
    console.error('Cloudinary upload error:', err);
    throw new Error(`Failed to upload file: ${err.message}`);
  }
};