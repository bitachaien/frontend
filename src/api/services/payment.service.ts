import { config } from "@fortawesome/fontawesome-svg-core";
/* eslint-disable import/no-anonymous-default-export */
import { contentInstance, contentCFInstance } from "@/configs/CustomizeAxios";
import { ConfigPaymentEndPoint } from "../services/contants";
import { PaymentHistoryReq } from "../types/payment.interface";

const getListPaymentType = async () => {
  const response = await contentInstance.get(ConfigPaymentEndPoint.LIST_PAYMENT_TYPE);
  return response?.data?.data;
};

const getListBankIn = async () => {
  const response = await contentInstance.get(ConfigPaymentEndPoint.LIST_BANK_IN);
  return response?.data?.data;
};

const getListBankOut = async () => {
  const response = await contentInstance.get(ConfigPaymentEndPoint.LIST_BANK_OUT);
  return response?.data?.data;
};

const getBankRequest = async (bankCode: string, amount: string) => {
  const response = await contentInstance.get(`${ConfigPaymentEndPoint.BANK_REQUEST}?bankCode=${bankCode}&amount=${amount}`);
  return response?.data;
};

const getMomoRequest = async (amount: string) => {
  const response = await contentInstance.get(`${ConfigPaymentEndPoint.MOMO_REQUEST}?amount=${amount}`);
  return response?.data;
};

const getCardRequest = ({
  cardNumber,
  serialNumber,
  cardValue,
  telco,
}: {
  cardNumber: number;
  serialNumber: number;
  cardValue: number;
  telco: number;
}) =>
  contentInstance.get(`${ConfigPaymentEndPoint.CARD_REQUEST}?cardNumber=${cardNumber}&serialNumber=${serialNumber}&cardValue=${cardValue}&telco=${telco}`);

const getListCardType = async () => {
  const response = await contentInstance.get(ConfigPaymentEndPoint.LIST_CARD_TYPE);
  return response?.data;
};

const getAllVNBanks = async () => {
  const response = await contentInstance.get(ConfigPaymentEndPoint.LIST_ALL_BANK_VN);
  return response?.data?.data;
};

const getAllBankUser = async () => {
  const response = await contentInstance.get(ConfigPaymentEndPoint.GET_ALL_BANK_USER);
  return response?.data?.data;
};

const addBankUserInfo = async (data: {
  bankCode: string;
  bankBranch: string;
  bankAccountName: string;
}) => {
  const response = await contentInstance.post(ConfigPaymentEndPoint.ADD_BANK_USER_INFO, data);
  return response?.data;
};

const bankOutRequest = async (data: {
  amount: number;
  bankUserId: string;
  withdrawPassword: string;
}) => {
  const response = await contentInstance.post(ConfigPaymentEndPoint.BANK_OUT_REQUEST, data);
  return response?.data;
};

const sendCryptoTrx = async (data: { trxId: number; network: string }) => {
  const response = await contentInstance.post(ConfigPaymentEndPoint.SEND_CRYPTO_TRX, data);
  return response?.data;
};

const getUsdtPrice = async () => {
  const response = await contentCFInstance.get(ConfigPaymentEndPoint.GET_USDT_PRICE);
  return response?.data?.data;
};

const getCryptoInfo = async (data: { network: string }) => {
  const response = await contentCFInstance.get(`${ConfigPaymentEndPoint.GET_CRYTO_TO_INFO}?network=${data.network}`);
  return response?.data?.data;
};

/**
 * BC88BET style: getPaymentHistory
 * Endpoint: /api/payment/history?page={page}&limit={limit}&from={from}&to={to}
 * Response: { dataExport: [...], total: number, page: number, kmess: number }
 */
const getPaymentHistory = async (data: PaymentHistoryReq) => {
  // Convert dateFrom/dateTo (ISO) sang from/to (BC88BET format: "DD/MM/YYYY HH:mm:ss")
  let from = data.from;
  let to = data.to;
  
  // Nếu có dateFrom/dateTo (legacy), convert sang BC88BET format
  if (!from && data.dateFrom) {
    from = formatDateToBC88BET(data.dateFrom);
  }
  if (!to && data.dateTo) {
    to = formatDateToBC88BET(data.dateTo);
  }
  
  // BC88BET API params
  const params: any = {
    page: data.page,
    limit: data.limit,
    from: from,
    to: to,
  };
  
  // Nếu có type, thêm vào params (nếu BC88BET hỗ trợ)
  if (data.type) {
    params.type = data.type;
  }
  
  const res = await contentInstance.get(ConfigPaymentEndPoint.PAYMENT_HISTORY, { params });
  
  // BC88BET response format: { dataExport: [...], total: number, page: number, kmess: number }
  // Convert sang format 789BET nếu cần
  if (res?.data) {
    return {
      ...res.data,
      data: res.data.dataExport || res.data.data || [], // Support cả dataExport và data
      total: res.data.total || 0,
    };
  }
  
  return res?.data;
};

/**
 * Convert ISO date string sang BC88BET format: "DD/MM/YYYY HH:mm:ss"
 */
const formatDateToBC88BET = (isoDate: string): string => {
  try {
    const date = new Date(isoDate);
    const pad = (n: number) => n.toString().padStart(2, "0");
    
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return isoDate; // Return original nếu lỗi
  }
};

export default {
  getListPaymentType,
  getListBankIn,
  getListBankOut,
  getBankRequest,
  getMomoRequest,
  getCardRequest,
  getListCardType,
  getAllVNBanks,
  addBankUserInfo,
  getAllBankUser,
  bankOutRequest,
  sendCryptoTrx,
  getUsdtPrice,
  getCryptoInfo,
  getPaymentHistory,
};
