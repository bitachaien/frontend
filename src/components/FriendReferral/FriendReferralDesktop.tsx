"use client";

import Image from "next/image";
import { Button, Empty, message, Spin } from "antd";
import { CopyOutlined, ReloadOutlined } from "@ant-design/icons";
import { useMemo } from "react";
import {
    useFriendReferralDetail,
    useFriendReferralPromotion,
} from "@/hooks/useFriendReferralService";

const pickValue = (source: Record<string, any> | undefined, keys: string[]) => {
    if (!source) {
        return undefined;
    }

    for (const key of keys) {
        const value = source[key];
        if (value !== undefined && value !== null && value !== "") {
            return value;
        }
    }

    return undefined;
};

const resolveObject = (input: any): Record<string, any> | undefined => {
    if (!input || typeof input !== "object") {
        return undefined;
    }

    if (Array.isArray(input)) {
        return undefined;
    }

    if (input.data && typeof input.data === "object") {
        return resolveObject(input.data) ?? input.data;
    }

    if (input.result && typeof input.result === "object") {
        return resolveObject(input.result) ?? input.result;
    }

    return input;
};

const resolveArray = (input: any): any[] => {
    if (!input) {
        return [];
    }

    if (Array.isArray(input)) {
        return input;
    }

    if (Array.isArray(input.data)) {
        return input.data;
    }

    if (Array.isArray(input.list)) {
        return input.list;
    }

    if (Array.isArray(input.items)) {
        return input.items;
    }

    if (Array.isArray(input.promotions)) {
        return input.promotions;
    }

    return [];
};

const FriendReferralDesktop = () => {
    const detailQuery = useFriendReferralDetail();
    const promotionQuery = useFriendReferralPromotion();

    const detail = useMemo(
        () => resolveObject(detailQuery.data),
        [detailQuery.data]
    );

    const promotions = useMemo(
        () => resolveArray(promotionQuery.data),
        [promotionQuery.data]
    );

    const referralCode = pickValue(detail, [
        "inviteCode",
        "referralCode",
        "code",
        "invitationCode",
    ]);

    const referralLink = pickValue(detail, [
        "inviteUrl",
        "referralUrl",
        "shareLink",
        "referralLink",
    ]);

    const summaryItems = [
        {
            label: "Tổng lượt mời",
            value: pickValue(detail, ["totalInvite", "totalInvites", "inviteCount"]),
        },
        {
            label: "Lượt mời hợp lệ",
            value: pickValue(detail, [
                "validInvite",
                "validInvites",
                "effectiveInvite",
                "effectiveInvites",
            ]),
        },
        {
            label: "Thưởng đã nhận",
            value: pickValue(detail, [
                "claimedReward",
                "claimedRewards",
                "totalRewardReceived",
                "rewardClaimed",
            ]),
        },
        {
            label: "Thưởng có thể nhận",
            value: pickValue(detail, [
                "availableReward",
                "claimableReward",
                "rewardCanClaim",
            ]),
        },
    ];

    const sanitizedSummary = summaryItems.map((item) => ({
        label: item.label,
        value:
            item.value !== undefined && item.value !== null && item.value !== ""
                ? item.value
                : "--",
    }));

    const isLoading = detailQuery.isLoading || promotionQuery.isLoading;
    const isFetching = detailQuery.isFetching || promotionQuery.isFetching;

    const handleCopy = async (value?: string) => {
        if (!value) {
            message.warning("Không có thông tin để sao chép");
            return;
        }

        if (typeof navigator === "undefined" || !navigator.clipboard) {
            message.warning("Thiết bị không hỗ trợ sao chép tự động");
            return;
        }

        try {
            await navigator.clipboard.writeText(value);
            message.success("Đã sao chép vào bộ nhớ tạm");
        } catch (error) {
            message.error("Không thể sao chép. Vui lòng thử lại");
        }
    };

    const handleRefetch = () => {
        detailQuery.refetch();
        promotionQuery.refetch();
    };

    return (
        <section className="space-y-6 text-white">
            <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 p-2">
                        <Image
                            src="https://q7sm4r.katawee.net/system-requirement/Web.MobileNew/UK251-01/14418bad09/assets/images/home/btn-up.svg"
                            alt="Friend referral"
                            width={40}
                            height={40}
                        />
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-2xl font-semibold uppercase tracking-wide">
                            Chương trình giới thiệu bạn bè
                        </h1>
                        <p className="text-sm text-white/70">
                            Mời bạn bè tham gia 789BET và nhận thưởng cho mỗi lượt mời hợp lệ.
                        </p>
                        {referralCode && (
                            <div className="flex flex-wrap items-center gap-2 text-sm text-white/80">
                                <span>Mã giới thiệu:</span>
                                <span className="rounded-md bg-white/10 px-2 py-1 font-medium">
                                    {referralCode}
                                </span>
                                <Button
                                    size="small"
                                    icon={<CopyOutlined />}
                                    onClick={() => handleCopy(String(referralCode))}
                                >
                                    Sao chép mã
                                </Button>
                            </div>
                        )}
                        {referralLink && (
                            <div className="flex flex-wrap items-center gap-2 text-sm text-white/80">
                                <span>Link giới thiệu:</span>
                                <span className="break-all rounded-md bg-white/10 px-2 py-1 font-medium">
                                    {referralLink}
                                </span>
                                <Button
                                    size="small"
                                    icon={<CopyOutlined />}
                                    onClick={() => handleCopy(String(referralLink))}
                                >
                                    Sao chép link
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
                <Button
                    type="primary"
                    icon={<ReloadOutlined spin={isFetching} />}
                    onClick={handleRefetch}
                    disabled={isFetching}
                    className="ml-auto"
                >
                    Tải lại dữ liệu
                </Button>
            </header>

            <Spin spinning={isLoading} tip="Đang tải dữ liệu giới thiệu">
                <div className="space-y-6">
                    <section>
                        <h2 className="mb-3 text-lg font-semibold uppercase tracking-wide text-white/90">
                            Tổng quan
                        </h2>
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                            {sanitizedSummary.map((item) => (
                                <div
                                    key={item.label}
                                    className="rounded-xl border border-white/10 bg-white/5 p-4 shadow-md"
                                >
                                    <p className="text-sm text-white/60">{item.label}</p>
                                    <p className="mt-2 text-2xl font-semibold text-amber-300">
                                        {item.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="mb-3 text-lg font-semibold uppercase tracking-wide text-white/90">
                            Chi tiết chương trình
                        </h2>
                        {detail ? (
                            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                                <dl className="grid grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-2">
                                    {Object.entries(detail).map(([key, value]) => (
                                        <div key={key} className="flex flex-col">
                                            <dt className="text-xs uppercase tracking-wide text-white/50">
                                                {key}
                                            </dt>
                                            <dd className="text-sm font-medium text-white/90">
                                                {typeof value === "object"
                                                    ? JSON.stringify(value)
                                                    : String(value ?? "--")}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        ) : (
                            <Empty
                                description="Chưa có thông tin chi tiết"
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                className="!text-white/70"
                            />
                        )}
                    </section>

                    <section>
                        <h2 className="mb-3 text-lg font-semibold uppercase tracking-wide text-white/90">
                            Ưu đãi giới thiệu
                        </h2>
                        {promotions.length > 0 ? (
                            <div className="grid gap-4 lg:grid-cols-2">
                                {promotions.map((item, index) => {
                                    const title = pickValue(item, [
                                        "title",
                                        "name",
                                        "promotionName",
                                        "label",
                                    ]);
                                    const description = pickValue(item, [
                                        "description",
                                        "promotionDesc",
                                        "content",
                                        "detail",
                                        "details",
                                    ]);
                                    const reward = pickValue(item, [
                                        "reward",
                                        "rewardAmount",
                                        "bonus",
                                        "amount",
                                    ]);
                                    const requirement = pickValue(item, [
                                        "requirement",
                                        "condition",
                                        "conditions",
                                    ]);

                                    return (
                                        <article
                                            key={title ?? index}
                                            className="flex h-full flex-col gap-3 rounded-xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/10 p-5"
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <h3 className="text-base font-semibold text-amber-200">
                                                    {title ?? `Ưu đãi #${index + 1}`}
                                                </h3>
                                                {reward && (
                                                    <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-200">
                                                        Thưởng: {reward}
                                                    </span>
                                                )}
                                            </div>
                                            {description && (
                                                <p className="text-sm leading-relaxed text-white/80">
                                                    {description}
                                                </p>
                                            )}
                                            {requirement && (
                                                <p className="text-xs uppercase tracking-wide text-white/60">
                                                    Điều kiện: {requirement}
                                                </p>
                                            )}
                                            {item?.startTime && item?.endTime && (
                                                <p className="text-xs text-white/50">
                                                    Hiệu lực: {item.startTime} → {item.endTime}
                                                </p>
                                            )}
                                        </article>
                                    );
                                })}
                            </div>
                        ) : (
                            <Empty
                                description="Chưa có ưu đãi giới thiệu"
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                className="!text-white/70"
                            />
                        )}
                    </section>
                </div>
            </Spin>
        </section>
    );
};

export default FriendReferralDesktop;
