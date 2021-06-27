import axios from 'axios';

export const uploadFiles = (files?: File[]) => {
  const formData = new FormData();
  const config = { headers: { 'content-type': 'multipart/form-data' } };

  if (files) {
    for (var i = 0; i < files?.length; i++) {
      formData.append('file', files[i]);
    }
  }

  return axios.post(`http://127.0.0.1:5000/uploadArray`, formData, config);
};

export const uploadFile = (file: File) => {
  const formData = new FormData();
  const config = { headers: { 'content-type': 'multipart/form-data' } };

  formData.append('file', file);

  return axios.post(`http://127.0.0.1:5000/uploadOne`, formData, config);
};
