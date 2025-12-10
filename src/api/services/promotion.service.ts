/* eslint-disable import/no-anonymous-default-export */
import { contentInstance } from "@/configs/CustomizeAxios";
import { ConfigPromotionEndPoint } from "./contants";

/**
 * BC88BET style: Promotion Service
 */

/**
 * Lấy tất cả chương trình khuyến mãi
 * Endpoint: /api/promotion
 * Response: { data: IpromotionResponse[] }
 */
const getAllPromotion = async () => {
  try {
    const res = await contentInstance.get(ConfigPromotionEndPoint.GET_ALL_PROMOTION);
    // BC88BET response: { data: IpromotionResponse[] } hoặc trực tiếp là array
    // Nếu res.data là array, return { data: res.data }
    // Nếu res.data.data là array, return res.data
    if (Array.isArray(res?.data)) {
      return { data: res.data };
    }
    return res?.data || { data: [] };
  } catch (error) {
    console.error("Error fetching promotions:", error);
    return { data: [] };
  }
};

/**
 * Lấy thông tin khuyến mãi theo ID
 * Endpoint: /api/promotion/promotion-info/{id}
 */
const getPromotionById = async (id: string) => {
  try {
    const res = await contentInstance.get(`${ConfigPromotionEndPoint.GET_PROMOTION_BY_ID}/${id}`);
    return res?.data;
  } catch (error) {
    console.error("Error fetching promotion detail:", error);
    throw error;
  }
};

/**
 * Đăng ký khuyến mãi
 * Endpoint: /api/promotion/promotion-register/{id}
 */
const registerPromotion = async (id: string) => {
  try {
    const res = await contentInstance.post(`${ConfigPromotionEndPoint.REGISTER_PROMOTION}/${id}`);
    return res?.data;
  } catch (error) {
    console.error("Error registering promotion:", error);
    throw error;
  }
};

export default {
  getAllPromotion,
  getPromotionById,
  registerPromotion,
};

// Export named để dễ import
export { getAllPromotion, getPromotionById, registerPromotion };

