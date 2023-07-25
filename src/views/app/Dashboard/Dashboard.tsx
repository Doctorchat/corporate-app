import { GenerateQrCodeContent } from "@/components/template/GenerateQrCode";
import Statistic from "./components/Statistic";
import { Button, Card, Table } from "@/components/ui";
import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const { Tr, Th, Td, THead, TBody } = Table;

const Dashboard = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4">
      <Statistic />
      <div className="flex gap-4">
        <div className="flex-auto">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h4>{t("recent_purchases")}</h4>
              <Button size="sm" onClick={() => navigate("/purchases")}>
                {t("view_all")}
              </Button>
            </div>
            <Table>
              <THead>
                <Tr>
                  <Th colSpan={1}>{t("client")}</Th>
                  <Th colSpan={1}>{t("doctor")}</Th>
                  <Th colSpan={1}>{t("price")}</Th>
                  <Th colSpan={1}>{t("created_at")}</Th>
                </Tr>
              </THead>
              <TBody>
                {[
                  {
                    id: 1,
                    client: "Nguyen Van A",
                    doctor: "Nguyen Van A",
                    price: 200,
                    created_at: "2021-08-01 12:00:00",
                  },
                  {
                    id: 2,
                    client: "Nguyen Van B",
                    doctor: "Nguyen Van B",
                    price: 200,
                    created_at: "2021-08-01 12:00:00",
                  },
                  {
                    id: 3,
                    client: "Nguyen Van C",
                    doctor: "Nguyen Van C",
                    price: 200,
                    created_at: "2021-08-01 12:00:00",
                  },
                ].map((item) => (
                  <Tr key={item.id}>
                    <Td>{item.client}</Td>
                    <Td>{item.doctor}</Td>
                    <Td>
                      <NumericFormat
                        displayType="text"
                        value={item.price}
                        suffix=" MDL"
                        thousandSeparator={true}
                      />
                    </Td>
                    <Td>{dayjs(item.created_at).format("DD/MM/YYYY")}</Td>
                  </Tr>
                ))}
              </TBody>
            </Table>
          </Card>
        </div>
        <div className="xl:w-[380px]">
          <GenerateQrCodeContent className="p-0" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
