"use client";

import Image from "next/image";
import { Button, Empty, Spin, message } from "antd";
import { useCallback, useMemo } from "react";
import {
    useFriendReferralDetail,
    useFriendReferralPromotion,
} from "@/hooks/useFriendReferralService";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleLeft,
    faCopy,
    faRedoAlt,
} from "@fortawesome/free-solid-svg-icons";

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

const asDisplayValue = (value: unknown) => {
    if (value === undefined || value === null || value === "") {
        return "0";
    }

    if (typeof value === "number") {
        return new Intl.NumberFormat("vi-VN").format(value);
    }

    const parsed = Number(value);
    if (!Number.isNaN(parsed)) {
        return new Intl.NumberFormat("vi-VN").format(parsed);
    }

    return String(value);
};

const FriendReferralMobile = () => {
    const router = useRouter();
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
        "invitationUrl",
    ]);

    const referralQr = pickValue(detail, [
        "qrCode",
        "qrImage",
        "qrUrl",
        "qr",
        "qrImageUrl",
    ]);

    const incomeToday = pickValue(detail, [
        "predictedIncomeToday",
        "expectedIncomeToday",
        "todayIncome",
        "todayProfit",
        "todayReward",
    ]);

    const incomeYesterday = pickValue(detail, [
        "predictedIncomeYesterday",
        "expectedIncomeYesterday",
        "yesterdayIncome",
        "yesterdayProfit",
        "yesterdayReward",
    ]);

    const totalInvites = pickValue(detail, [
        "totalInvite",
        "totalInvites",
        "inviteCount",
        "totalFriend",
    ]);

    const validInvites = pickValue(detail, [
        "validInvite",
        "validInvites",
        "effectiveInvite",
        "effectiveInvites",
    ]);

    const claimUrl = pickValue(detail, [
        "claimUrl",
        "receiveIncomeUrl",
        "claimIncomeUrl",
        "withdrawUrl",
    ]);

    const historyUrl = pickValue(detail, [
        "incomeHistoryUrl",
        "historyUrl",
        "recordUrl",
        "earningHistoryUrl",
    ]);

    const analysisUrl = pickValue(detail, [
        "analysisUrl",
        "inviteAnalysisUrl",
        "analyticsUrl",
    ]);

    const rulesUrl = pickValue(detail, [
        "ruleUrl",
        "rulesUrl",
        "policyUrl",
    ]);

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

    const handleNavigate = useCallback(
        (target?: string) => {
            if (!target) {
                message.info("Tính năng sẽ sớm ra mắt");
                return;
            }

            const isExternal = /^https?:/i.test(target);
            if (isExternal) {
                if (typeof window !== "undefined") {
                    window.open(target, "_blank");
                }
                return;
            }

            router.push(target);
        },
        [router]
    );

    const quickLinks = [
        {
            label: "Lịch sử thu nhập",
            icon: "https://q7sm4r.katawee.net/system-requirement/Web.Mobile/_Common/Content/Views/FriendReferral/icon_record.png",
            target: historyUrl,
        },
        {
            label: "Phân tích lời mời",
            icon: "https://q7sm4r.katawee.net/system-requirement/Web.Mobile/_Common/Content/Views/FriendReferral/icon_analyze.png",
            target: analysisUrl,
        },
        {
            label: "Quy tắc giới thiệu",
            icon: "https://q7sm4r.katawee.net/system-requirement/Web.Mobile/_Common/Content/Views/FriendReferral/icon_rule.png",
            target: rulesUrl,
        },
    ];

    const shareTargets = useMemo(() => {
        if (!referralLink) {
            return [];
        }

        const encoded = encodeURIComponent(referralLink);

        return [
            {
                label: "Sao chép link",
                icon: "https://q7sm4r.katawee.net/system-requirement/Web.Mobile/_Common/Content/Views/FriendReferral/share_link.png",
                action: () => handleCopy(String(referralLink)),
            },
            {
                label: "Facebook",
                icon: "https://q7sm4r.katawee.net/system-requirement/Web.Mobile/_Common/Content/Views/FriendReferral/share_fb.png",
                href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
            },
            {
                label: "Telegram",
                icon: "https://q7sm4r.katawee.net/system-requirement/Web.Mobile/_Common/Content/Views/FriendReferral/share_telegram.png",
                href: `https://t.me/share/url?url=${encoded}`,
            },
            {
                label: "WhatsApp",
                icon: "https://q7sm4r.katawee.net/system-requirement/Web.Mobile/_Common/Content/Views/FriendReferral/share_whatsapp.png",
                href: `https://wa.me/?text=${encoded}`,
            },
            {
                label: "Threads",
                icon: "https://q7sm4r.katawee.net/system-requirement/Web.Mobile/_Common/Content/Views/FriendReferral/share_threads.png",
                href: `https://www.threads.net/intent/post?text=${encoded}`,
            },
        ];
    }, [handleCopy, referralLink]);

    return (
        <section className="min-h-screen bg-[#0b1023] pb-10 text-white">
            <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white"
                    aria-label="Quay lại"
                >
                    <FontAwesomeIcon icon={faAngleLeft} />
                </button>
                <h1 className="flex-1 text-center text-lg font-semibold uppercase">
                    Giới thiệu bạn bè
                </h1>
                <span className="h-9 w-9" />
            </header>

            <Spin spinning={isLoading} tip="Đang tải dữ liệu">
                <div className="flex flex-col gap-5 px-4 py-5">
                    <section className="flex flex-col gap-3">
                        <ul className="grid grid-cols-3 gap-3 text-center text-xs">
                            {quickLinks.map(({ label, icon, target }) => (
                                <li key={label}>
                                    <button
                                        type="button"
                                        onClick={() => handleNavigate(target)}
                                        className="flex w-full flex-col items-center gap-2 rounded-2xl bg-white/[0.04] p-3 shadow-sm"
                                    >
                                        <Image
                                            src={icon}
                                            alt={label}
                                            width={48}
                                            height={48}
                                            className="h-12 w-12"
                                        />
                                        <p className="text-[12px] font-medium text-white/90">
                                            {label}
                                        </p>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="flex flex-col gap-3">
                        <Button
                            type="primary"
                            className="h-11 w-full rounded-full bg-gradient-to-r from-[#ff9a1f] to-[#fd6b25] font-semibold uppercase"
                            icon={<FontAwesomeIcon icon={faRedoAlt} />}
                            onClick={() => handleNavigate(claimUrl)}
                        >
                            Nhận thu nhập
                        </Button>
                        <ul className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
                            {[
                                {
                                    label: "Thu nhập dự kiến hôm nay",
                                    value: asDisplayValue(incomeToday),
                                },
                                {
                                    label: "Thu nhập dự kiến hôm qua",
                                    value: asDisplayValue(incomeYesterday),
                                },
                                {
                                    label: "Số lượng người đã mời",
                                    value: asDisplayValue(totalInvites),
                                },
                                {
                                    label: "Số lượng lời mời hợp lệ",
                                    value: asDisplayValue(validInvites),
                                },
                            ].map(({ label, value }) => (
                                <li
                                    key={label}
                                    className="flex items-center justify-between gap-3 px-4 py-3 text-sm"
                                >
                                    <span className="text-white/70">{label}</span>
                                    <span className="font-semibold text-amber-300">{value}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                        <div className="text-sm font-semibold uppercase text-white/80">
                            Chia sẻ với bạn để nhận thưởng
                        </div>
                        <div className="flex flex-col gap-3 rounded-xl bg-white/[0.04] p-3">
                            <div className="flex items-center justify-between gap-2 text-xs uppercase tracking-wide text-white/60">
                                <span>Liên kết mời</span>
                                <button
                                    type="button"
                                    onClick={handleRefetch}
                                    className="flex items-center gap-1 text-white"
                                >
                                    <span>Làm mới</span>
                                    <FontAwesomeIcon
                                        icon={faRedoAlt}
                                        className={isFetching ? "animate-spin" : ""}
                                    />
                                </button>
                            </div>
                            {referralLink ? (
                                <button
                                    type="button"
                                    onClick={() => handleCopy(String(referralLink))}
                                    className="flex items-center justify-between gap-3 rounded-lg bg-black/30 px-3 py-2 text-left text-sm"
                                >
                                    <span className="flex-1 break-all text-white/90">
                                        {referralLink}
                                    </span>
                                    <FontAwesomeIcon icon={faCopy} />
                                </button>
                            ) : (
                                <Empty
                                    description="Chưa có link giới thiệu"
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    className="!my-2 !text-white/70"
                                />
                            )}

                            {referralQr && (
                                <figure className="flex flex-col items-center gap-2">
                                    <Image
                                        src={String(referralQr)}
                                        alt="QR mời bạn"
                                        width={160}
                                        height={160}
                                        className="h-40 w-40 rounded-xl border border-white/10 object-cover"
                                    />
                                    <figcaption className="text-xs uppercase text-white/60">
                                        Lưu
                                    </figcaption>
                                </figure>
                            )}

                            {shareTargets.length > 0 && (
                                <div className="flex flex-wrap items-center justify-center gap-3">
                                    {shareTargets.map(({ label, icon, href, action }) => {
                                        const handleClick = () => {
                                            if (action) {
                                                action();
                                                return;
                                            }

                                            if (href) {
                                                if (typeof window !== "undefined") {
                                                    window.open(href, "_blank");
                                                }
                                            }
                                        };

                                        return (
                                            <button
                                                key={label}
                                                type="button"
                                                onClick={handleClick}
                                                className="flex flex-col items-center gap-1 text-xs text-white/80"
                                                aria-label={label}
                                            >
                                                <Image
                                                    src={icon}
                                                    alt={label}
                                                    width={44}
                                                    height={44}
                                                    className="h-11 w-11"
                                                />
                                            </button>
                                        );
                                    })}
                                </div>
                            )}

                            {referralCode && (
                                <div className="flex flex-col items-center gap-2 pt-3 text-center">
                                    <p className="text-xs uppercase tracking-wide text-white/60">
                                        Nhấn để sao chép mã mời
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => handleCopy(String(referralCode))}
                                        className="rounded-2xl bg-gradient-to-r from-[#ff9a1f] to-[#fd6b25] px-6 py-3 text-2xl font-bold tracking-[0.2em] text-white shadow-lg"
                                    >
                                        {referralCode}
                                    </button>
                                </div>
                            )}
                        </div>
                    </section>

                    <section className="flex flex-col gap-3">
                        <h2 className="text-sm font-semibold uppercase text-white/80">
                            Ưu đãi hiện có
                        </h2>
                        {promotions.length > 0 ? (
                            <div className="flex flex-col gap-3">
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
                                    const period = pickValue(item, [
                                        "period",
                                        "duration",
                                    ]);

                                    return (
                                        <article
                                            key={title ?? index}
                                            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm"
                                        >
                                            <div className="flex flex-wrap items-center justify-between gap-3">
                                                <h3 className="text-base font-semibold text-amber-200">
                                                    {title ?? `Ưu đãi #${index + 1}`}
                                                </h3>
                                                {reward && (
                                                    <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase text-amber-200">
                                                        Thưởng: {reward}
                                                    </span>
                                                )}
                                            </div>
                                            {description && (
                                                <p className="mt-2 text-sm leading-relaxed text-white/80">
                                                    {description}
                                                </p>
                                            )}
                                            {(item?.startTime || item?.endTime || period) && (
                                                <p className="mt-2 text-[11px] text-white/50">
                                                    {period
                                                        ? `Thời gian: ${period}`
                                                        : `Hiệu lực: ${item?.startTime ?? "--"} → ${item?.endTime ?? "--"}`}
                                                </p>
                                            )}
                                        </article>
                                    );
                                })}
                            </div>
                        ) : (
                            <Empty
                                description="Chưa có ưu đãi"
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                className="!text-white/70"
                            />
                        )}
                    </section>

                    <section className="flex flex-col gap-3">
                        <h2 className="text-sm font-semibold uppercase text-white/80">
                            Chi tiết chương trình
                        </h2>
                        {detail ? (
                            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs">
                                <dl className="flex flex-col gap-3">
                                    {Object.entries(detail).map(([key, value]) => (
                                        <div key={key} className="flex flex-col gap-1">
                                            <dt className="uppercase tracking-wide text-white/40">
                                                {key}
                                            </dt>
                                            <dd className="break-words text-white/80">
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
                                description="Chưa có dữ liệu chi tiết"
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

export default FriendReferralMobile;
