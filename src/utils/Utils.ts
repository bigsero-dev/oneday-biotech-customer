import { PixelRatio } from "react-native";
import moment from "moment";

export function dpToPx(dp: number): number {
  const pixelRatio = PixelRatio.get();
  return dp * pixelRatio;
}

export const wait = (timeout: any) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export function convertUnixTime(unixTime: number): string {
  const date = new Date(unixTime * 1000); // Convert seconds to milliseconds
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
}

export function convertUnixDateTime(unixTime: number): string {
  const date = new Date(unixTime * 1000); // Convert seconds to milliseconds
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}.${month}.${day} ${hours}:${minutes}`;
}

export function convertStringSecret(name: string): string {
  let data = name?.replace(/.{4}$/, "****");
  return data;
}

export function convertDate(date: string) {
  const data = moment(date).format("YYYY.MM.DD");
  return data;
}

export function convertDateTime(date: string) {
  const data = moment(date).format("YYYY.MM.DD HH:mm:ss");
  return data;
}

export function convertDateHours(date: string) {
  const data = moment(date).format("YYYY.MM.DD HH:mm");
  return data;
}

export function convertPrice(price: number | string) {
  const data = Intl.NumberFormat("kr-KR")
    .format(parseInt(String(price)))
    .replace(".", ",");

  return data;
}

export function maskCreditCardNumber(cardNumber: any) {
  // Assuming the input format is "4518-1234-1234-1234"
  const parts = cardNumber.split("-");
  if (parts.length === 4 && parts.every((part: any) => part.length === 4)) {
    const maskedNumber = `${parts[0]}-****-****-**${parts[3].slice(2, 4)}`;
    return maskedNumber;
  } else {
    return "Invalid input format";
  }
}

export function maskPhoneNumber(contactNumber: any) {
  if (!contactNumber) {
    return "Invalid input format";
  }

  // Assuming the input format is "4518-1234-1234-1234"
  const parts = contactNumber.split("-");
  if (parts.length === 3) {
    const maskedNumber = `${parts[0]}-${parts[1]}-****`;
    return maskedNumber;
  } else {
    return "Invalid input format";
  }
}

export const ObjectToURLSnake = (obj: any) => {
  return Object.entries(obj)
    .map(([key, val]) => (val === '' ? `${key}` : `${key}=${val}`))
    .join('&');
};

export const ConvertStepToText = (step: string) => {
  let convertedText = '';
  if (step === "INITIAL_EXAMINATION") {
    convertedText = '초진검진';
  }
  if (step === "FIRST_SURGERY") {
    convertedText = '초진검진';
  }
  if (step === "SECOND_SURGERY") {
    convertedText = '초진검진';
  }
  if (step === "IMPLANT") {
    convertedText = '초진검진';
  }
  if (step === "INTERMEDIATE_PROCESS") {
    convertedText = '초진검진';
  }
  if (step === "PROSTHESIS_SETTING") {
    convertedText = '초진검진';
  }
  if (step === "EXAMINATION") {
    convertedText = '초진검진';
  }

  return convertedText;
}