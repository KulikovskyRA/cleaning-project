import { Descriptions, Divider } from "antd";
import React, { useEffect, useState } from "react";

export default function CleanerInfo() {
  const [cleanerData, setCleanerData] = useState([]);

  const fetchCleanerData = async () => {
    try {
      const response = await fetch(`http://localhost:3500/api/cleaner/info`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const result = await response.json();
    console.log('cleaner data ---------->', result);
      setCleanerData(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
      void fetchCleanerData();
  }, []);

  return (
    <>
      <Divider orientation="center" orientationMargin="0">
        <h4>Карточка сотрудника</h4>
      </Divider>
      <Descriptions
        layout="vertical"
        bordered={true}
        style={{ width: "150vh" }}
        column={6}
        contentStyle={{ fontWeight: "bold" }}
      >
        <Descriptions.Item label="Ф.И.О">
          {cleanerData.name} {cleanerData.patrname} {cleanerData.surname}
        </Descriptions.Item>
        <Descriptions.Item label="ID">{cleanerData.id}</Descriptions.Item>
        <Descriptions.Item label="Номер телефона">
          {cleanerData.phoneNumber}
        </Descriptions.Item>
        <Descriptions.Item label="Гражданство">{cleanerData.nation}</Descriptions.Item>
        <Descriptions.Item label="Выполнено уборок">
          XXX
        </Descriptions.Item>
        <Descriptions.Item label="Запланировано уборок">
          XXX
        </Descriptions.Item>
        <Descriptions.Item label="Доход за всё время">
          XXX UZS
        </Descriptions.Item>
      </Descriptions>
    </>
  );
}
