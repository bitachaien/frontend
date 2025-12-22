import friendReferralService from "@/api/services/friendReferral.service";
import { useQuery } from "@tanstack/react-query";

export const useFriendReferralDetail = () =>
    useQuery({
        queryKey: ["friendReferralDetail"],
        queryFn: () => friendReferralService.getFriendReferralDetail(),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

export const useFriendReferralPromotion = () =>
    useQuery({
        queryKey: ["friendReferralPromotion"],
        queryFn: () => friendReferralService.getFriendReferralPromotion(),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
