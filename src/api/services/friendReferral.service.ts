import { contentInstance } from "@/configs/CustomizeAxios";
import { ConfigFriendReferralEndPoint } from "./contants";

export const getFriendReferralDetail = async () => {
    return await contentInstance.get(ConfigFriendReferralEndPoint.DETAIL);
};

export const getFriendReferralPromotion = async () => {
    return await contentInstance.get(ConfigFriendReferralEndPoint.PROMOTION);
};

export default {
    getFriendReferralDetail,
    getFriendReferralPromotion,
};
