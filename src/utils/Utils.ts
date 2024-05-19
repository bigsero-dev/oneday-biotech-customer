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
    convertedText = '1차 수술';
  }
  if (step === "SECOND_SURGERY") {
    convertedText = '2차 수술';
  }
  if (step === "IMPLANT") {
    convertedText = '본뜨기';
  }
  if (step === "INTERMEDIATE_PROCESS") {
    convertedText = '중간과정';
  }
  if (step === "PROSTHESIS_SETTING") {
    convertedText = '보철세팅';
  }
  if (step === "EXAMINATION") {
    convertedText = '검진';
  }

  return convertedText;
}

export const ConvertTeethPosition = (number: number) => {
  const left = 'LEFT';
  const right = 'RIGHT';
  const upper = 'UPPER';
  const bottom = 'BOTTOM';
  const incisor = 'INCISOR';
  const canine = 'CANINE';
  const premolar = 'PREMOLAR';
  const molar = 'MOLAR';

  //Left Upper Incisor
  const arrDigits: any = Array.from(String(number), Number);
  let teethName = "";

  //incisor
  if (arrDigits[0] % 2 === 0 && (arrDigits[0] === 1 || arrDigits[0] === 2) && (arrDigits[1] === 1 || arrDigits[1] === 2)) {
    teethName = `${right} ${upper} ${incisor}`;
  }

  if (arrDigits[0] % 2 === 1 && (arrDigits[0] === 1 || arrDigits[0] === 2) && (arrDigits[1] === 1 || arrDigits[1] === 2)) {
    teethName = `${left} ${upper} ${incisor}`;
  }

  if (arrDigits[0] % 2 === 0 && (arrDigits[0] === 3 || arrDigits[0] === 4) && (arrDigits[1] === 1 || arrDigits[1] === 2)) {
    teethName = `${right} ${bottom} ${incisor}`;
  }

  if (arrDigits[0] % 2 === 1 && (arrDigits[0] === 3 || arrDigits[0] === 4) && (arrDigits[1] === 1 || arrDigits[1] === 2)) {
    teethName = `${left} ${bottom} ${incisor}`;
  }

  //canine
  if (arrDigits[0] % 2 === 0 && (arrDigits[0] === 1 || arrDigits[0] === 2) && arrDigits[1] === 3) {
    teethName = `${right} ${upper} ${canine}`;
  }

  if (arrDigits[0] % 2 === 1 && (arrDigits[0] === 1 || arrDigits[0] === 2) && arrDigits[1] === 3) {
    teethName = `${left} ${upper} ${canine}`;
  }

  if (arrDigits[0] % 2 === 0 && (arrDigits[0] === 3 || arrDigits[0] === 4) && arrDigits[1] === 3) {
    teethName = `${right} ${bottom} ${canine}`;
  }

  if (arrDigits[0] % 2 === 1 && (arrDigits[0] === 3 || arrDigits[0] === 4) && arrDigits[1] === 3) {
    teethName = `${left} ${bottom} ${canine}`;
  }

  //premolar
  if (arrDigits[0] % 2 === 0 && (arrDigits[0] === 1 || arrDigits[0] === 2) && (arrDigits[1] === 4 || arrDigits[1] === 5)) {
    teethName = `${right} ${upper} ${premolar}`;
  }

  if (arrDigits[0] % 2 === 1 && (arrDigits[0] === 1 || arrDigits[0] === 2) && (arrDigits[1] === 4 || arrDigits[1] === 5)) {
    teethName = `${left} ${upper} ${premolar}`;
  }

  if (arrDigits[0] % 2 === 0 && (arrDigits[0] === 3 || arrDigits[0] === 4) && (arrDigits[1] === 4 || arrDigits[1] === 5)) {
    teethName = `${right} ${bottom} ${premolar}`;
  }

  if (arrDigits[0] % 2 === 1 && (arrDigits[0] === 3 || arrDigits[0] === 4) && (arrDigits[1] === 4 || arrDigits[1] === 5)) {
    teethName = `${left} ${bottom} ${premolar}`;
  }

  //molar
  if (arrDigits[0] % 2 === 0 && (arrDigits[0] === 1 || arrDigits[0] === 2) && (arrDigits[1] === 6 || arrDigits[1] === 7 || arrDigits[1] === 8)) {
    teethName = `${right} ${upper} ${molar}`;
  }

  if (arrDigits[0] % 2 === 1 && (arrDigits[0] === 1 || arrDigits[0] === 2) && (arrDigits[1] === 6 || arrDigits[1] === 7 || arrDigits[1] === 8)) {
    teethName = `${left} ${upper} ${molar}`;
  }

  if (arrDigits[0] % 2 === 0 && (arrDigits[0] === 3 || arrDigits[0] === 4) && (arrDigits[1] === 6 || arrDigits[1] === 7 || arrDigits[1] === 8)) {
    teethName = `${right} ${bottom} ${molar}`;
  }

  if (arrDigits[0] % 2 === 1 && (arrDigits[0] === 3 || arrDigits[0] === 4) && (arrDigits[1] === 6 || arrDigits[1] === 7 || arrDigits[1] === 8)) {
    teethName = `${left} ${bottom} ${molar}`;
  }

  return teethName;
}