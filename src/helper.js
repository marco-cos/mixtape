// import axios from 'axios';
// const jwt = require('jsonwebtoken');



// function getCookie(name) {
//     const cookies = document.cookie.split(';');
//     for (let cookie of cookies) {
//         const [cookieName, cookieValue] = cookie.split('=').map(c => c.trim());
//         if (cookieName === name) {
//             return cookieValue;
//         }
//     }
//     return null;
// }

// const checkAuthentication = async (navigate) => {
//     try {
//         const cookie = getCookie('token');
//         if (cookie) {
//             const result = await axios.get('http://localhost:8000/verifyUser/isProtected', {
//                     withCredentials: true,
//                     headers: {
//                         'Authorization': `Bearer ${cookie}`
//                     }
//                 });
//                 return true;
//             }
//             return false;
//     } catch (error) {
//         if (error.response && error.response.status === 401) {
//             navigate('/login');
//         }
//         console.error('Error checking cookie');
//         return false;
//     }
// }
// const decodeToken = (token) => {
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         return decoded.userId;
//     } catch (error) {
//         console.error('Error decoding token: ', error);
//         return null;
//     }
// };

// Function to set session storage with expiration time
const setStorageExp = (key, value, expirationTimeInMinutes) => {
    const expirationTimestamp = new Date().getTime() + expirationTimeInMinutes * 60 * 1000;
    sessionStorage.setItem(key, JSON.stringify({ value, expirationTimestamp }));
};

// Function to get session storage value and check expiration
const getStorageExp = (key) => {
    const item = sessionStorage.getItem(key);
    if (!item) return null; // Item not found

    const { value, expirationTimestamp } = JSON.parse(item);
    const currentTimestamp = new Date().getTime();
    if (currentTimestamp > expirationTimestamp) {
        sessionStorage.removeItem(key); // Remove expired item
        return null; // Item expired
    }
    return value; // Return non-expired item
};

const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        const base64String = fileReader.result.split(',')[1]; // Extracting base64 data after the comma
        resolve(base64String);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };


export { setStorageExp, getStorageExp, convertToBase64 };
