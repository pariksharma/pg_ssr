import { jwtDecode } from "jwt-decode"
import CryptoJS from "crypto-js";
const no_image = "/assets/images/no_image.png"
// const CryptoJS = require('crypto-js');


export const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const getLocalStorageItem = (key) => {
  if (typeof window !== "undefined" && window.localStorage) {
    return localStorage.getItem(key);
  }
  return null;
};

export const isLogin = getLocalStorageItem('jwt');
export const resHandler = (response) => {
  let status = response.data.status;
  let data;
  let message;
  // console.log(response)
  if (status) {

    try {
      data = response.data.data
      message = response.data.message
    }
    catch (err) {
      console.log(err)
    }
  }
  else {
    message = response.data.message

    if (response.data.auth_code == 100100) {
      localStorage.clear();
      // window.location.reload();
    }
  }
  return { status, data, message }

}

export const stringToFloat = (value) => {
  return Number(value).toFixed(2)
}




export const formatNumberWithCommasAndDecimals = (number) => {
  const options = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  return Number(number).toLocaleString(undefined, options);
}


// export function convertToNestedStructure(inputArray) {
//   const parentArray = inputArray.filter(item => item.parent_id === "0");
//   parentArray.forEach(item => {
//     item.id
//   })
// }

export function convertToNestedStructure(inputArray) {
  const parentArray = inputArray.filter(item => item.parent_id === "0");
  parentArray.forEach(item => {
    item.children = inputArray.filter(child => child.parent_id === item.id);
  });
  return parentArray;
}

export const throttle = (func, limit) => {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const jwt_decode = async (token) => {
  // console.log( jwtDecode.verify(token));
  const jwt_data = await jwtDecode(token);
  localStorage.setItem("user_id", jwt_data.id)
}

export const formatTimestampToDateString = (timestamp) => {
  const date = new Date(timestamp * 1000); // Convert to milliseconds

  // Get day, month, and year components
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();

  // Create the formatted date string
  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
}

export function blobToURL(blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      const base64data = reader.result;
      resolve(base64data);
    };
  });
}

export function formatTimestamp(timestamp) {
  const date = new Date(timestamp * 1000); // Convert to milliseconds
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours() % 12 || 12).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = date.getHours() >= 12 ? ' PM' : ' AM';

  return `${month}-${day}-${year} ${hours}:${minutes}${ampm}`;
}
export function formatTimestamponly(timestamp) {
  const date = new Date(timestamp * 1000); // Convert to milliseconds
  const day = String(date.getDate()).padStart(2, '0');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours() % 12 || 12).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = date.getHours() >= 12 ? ' PM' : ' AM';

  return `${day}-${month}-${year} `;
}
export function formatOnlyTime(timestamp) {
  const date = new Date(timestamp * 1000); // Convert to milliseconds
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours() % 12 || 12).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = date.getHours() >= 12 ? ' PM' : ' AM';

  return `${hours}:${minutes}${ampm}`;
}

export const parseJson = (json) => {
  return JSON.parse(json);
}


export const calculateTotalCoursePrice = (data) => {
  if (data && data.cartdata.length) {
    return data.cartdata.reduce((total, item) => {
      return total + parseFloat(item.course_price);
    }, 0);
  } else {
    return 0;
  }
};
export const calculateTotalDeliveryCharge = (data) => {
  if (data && data.cartdata.length) {
    return data.cartdata.reduce((total, item) => {
      return total + parseFloat(item.delivery);
    }, 0);
  } else {
    return 0;
  }
};
export const calculateTotalTaxCharge = (data) => {
  if (data && data.cartdata.length) {
    return data.cartdata.reduce((total, item) => {
      return total + parseFloat(item.tax);
    }, 0);
  } else {
    return 0;
  }
};


export function courseBulkArray(originalData) {
  return originalData && originalData.map((item) => ({
    course_id: item.course_id,
    course_price: item.course_price,
    tax: item.tax,
  }));
}


export function convertTo12HourFormat(time24) {
  // Extract hours and minutes
  const [hours, minutes] = time24.split(':');

  // Determine AM or PM
  const period = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  let hours12 = hours % 12;
  hours12 = hours12 === 0 ? 12 : hours12; // Handle midnight (0:00) as 12 AM

  // Format the result
  const time12 = `${hours12}:${minutes} ${period}`;

  return time12;
}



export function isCurrentTimeBefore(upcomingTimestamp) {
  const currentTimestamp = Math.floor(Date.now() / 1000); // Current time in seconds
  return currentTimestamp < upcomingTimestamp;
}



export function aesCbcEncryption(string) {

  // 1171086418644515_" . APP_ID
  const cbcKey = "1171086418644515_" + process.env.REACT_APP_APP_ID;
  const iniVector = "117#Nerglnw3@@OI)30@I*Dm'@@_" + process.env.REACT_APP_APP_ID;

  const encrypted = CryptoJS.AES.encrypt(string, cbcKey, {
    iv: iniVector,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const encryptedString = encrypted.toString();
  const additionalData = '1234567890123456';

  return `${encryptedString}:${additionalData}`;
}

export function image_check(url) {
  return (!url ? no_image : url);
}

