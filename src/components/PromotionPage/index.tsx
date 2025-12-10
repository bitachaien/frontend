/* eslint-disable @next/next/no-img-element */
"use client";
import { Key, useState, useEffect } from "react";
import styles from "./PromotionPage.module.css";
import { Modal, Spin } from "antd";
import dynamic from "next/dynamic";
import { dataTagPromotion } from "@/config/dataTagPromotion";
import Image from "next/image";
import BanCa from "./ItemPromotion/baohiem/banca";
import { getAllPromotion, getPromotionById } from "@/api/services/promotion.service";
import { IpromotionResponse } from "@/api/types/promotion.interface";
import { formatDateTime } from "@/utils/formatDateTime";
import dayjs from "dayjs";

export default function PromotionPage() {
  // BC88BET style: Fetch promotions from API
  const [promotions, setPromotions] = useState<IpromotionResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPromotionId, setSelectedPromotionId] = useState<string | null>(null);
  const [promotionDetail, setPromotionDetail] = useState<any>(null);
  
  // Legacy state (giữ lại để tương thích với UI cũ nếu cần)
  const [tagPromotion, setTagPromotion] = useState(dataTagPromotion[0]?.name || "");
  const [linkDynamic, setLinkDynamic] = useState(
    dataTagPromotion[0]?.items[0]?.link || ""
  );
  const [value, setValue] = useState(dataTagPromotion[0]?.value || "");
  const [openModal, setOpenModal] = useState(false);

  // Fetch promotions from BC88BET API
  useEffect(() => {
    const fetchPromotions = async () => {
      setLoading(true);
      try {
        const res = await getAllPromotion();
        // BC88BET response: { data: IpromotionResponse[] }
        if (res?.data && Array.isArray(res.data)) {
          setPromotions(res.data);
        }
      } catch (error) {
        console.error("Error fetching promotions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  // Fetch promotion detail when selected
  const handlePromotionClick = async (promotionId: string) => {
    try {
      const detail = await getPromotionById(promotionId);
      setPromotionDetail(detail);
      setSelectedPromotionId(promotionId);
      setOpenModal(true);
    } catch (error) {
      console.error("Error fetching promotion detail:", error);
    }
  };

  // Function to handle opening the modal and setting the dynamic link
  const handleOpenModal = (link: string) => {
    if (link) {
      setLinkDynamic(link);
      setOpenModal(true);
    } else {
      console.error("Invalid link provided for dynamic import");
    }
  };

  // const DynamicContent = dynamic(async () => {
  //   try {
  //     return import(
  //       `./ItemPromotion/${value}/${linkDynamic ? linkDynamic : "DangCapNhat"}`
  //     );
  //   } catch (error) {
  //     console.error("Failed to load dynamic content:", error);
  //   }
  // });

  return (
    <div
      className="flex flex-col items-center w-full"
      style={{
        backgroundImage: "url(/images/promotion/bgKhuyenMai.jpg)",
        backgroundSize: "cover",
      }}>
      <div
        className="w-[1200px] py-[30px]"
        style={{
          justifyItems: "center",
        }}>
        {/* Promotion items section - BC88BET style: Chỉ hiển thị từ API, không có tags */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Spin size="large" />
          </div>
        ) : promotions.length > 0 ? (
          <div className="flex flex-wrap gap-5">
            {promotions.map((promotion) => (
              <div
                className="w-[580px] cursor-pointer"
                key={promotion.id}
                onClick={() => handlePromotionClick(promotion.id)}>
                <img
                  src={promotion.thumbnail}
                  alt={promotion.title}
                  className="w-[590px] h-[193px] object-cover rounded"
                />
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Ngày Bắt đầu: {formatDateTime(promotion.updatedAt)}
                  </p>
                  <p className="text-base font-semibold capitalize">{promotion.title}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center py-20">
            <p className="text-gray-500">Không có khuyến mãi nào</p>
          </div>
        )}

        {/* Modal to show dynamic content */}
        <Modal
          closeIcon=""
          footer=""
          open={openModal}
          width={1200}
          onCancel={() => setOpenModal(false)}
          className="w-[1200px] mt-[3vh] top-0 p-[20px]"
          styles={{
            content: {
              borderRadius: 0,
            },
          }}>
          {openModal ? <BanCa /> : <div>Loading content...</div>}
        </Modal>
      </div>
    </div>
  );
}
