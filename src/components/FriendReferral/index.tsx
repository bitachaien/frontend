"use client";

import { useBreakpoint } from "@/utils/check";
import dynamic from "next/dynamic";

const FriendReferralDesktop = dynamic(() => import("./FriendReferralDesktop"), {
    ssr: false,
});

const FriendReferralMobile = dynamic(() => import("./FriendReferralMobile"), {
    ssr: false,
});

const FriendReferral = () => {
    const breakpoint = useBreakpoint();
    const isMobile = breakpoint === "S";

    return isMobile ? <FriendReferralMobile /> : <FriendReferralDesktop />;
};

export default FriendReferral;
