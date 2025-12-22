"use client";

import FriendReferral from "@/components/FriendReferral";
import CheckUserInAccPage from "@/components/CheckUserInAccPage";

const FriendReferralStandalonePage = () => {
    return (
        <CheckUserInAccPage>
            <div className="min-h-[60vh] w-full rounded-2xl bg-[rgba(11,16,35,0.85)] p-4 md:p-8">
                <FriendReferral />
            </div>
        </CheckUserInAccPage>
    );
};

export default FriendReferralStandalonePage;
