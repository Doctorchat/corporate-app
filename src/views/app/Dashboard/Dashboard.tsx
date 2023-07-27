import { GenerateQrCodeContent } from "@/components/template/GenerateQrCode";
import Statistic from "./components/Statistic";
import { Button, Card, Table, Tag } from "@/components/ui";
import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import useAuth from "@/utils/hooks/useAuth";
import { useAppSelector } from "@/store";
import { useQuery } from "react-query";
import { GetEmployeesResponse } from "../Employees/types";
import { apiGetEmployees } from "@/services/EmployeesService";
import { ActionColumn } from "../Employees/components/EmployeesTable";

const { Tr, Th, Td, THead, TBody } = Table;

const Dashboard = () => {
  const { t } = useTranslation();
  const { revalidateAuth } = useAuth();

  const { data: employees } = useQuery(["employees"], () =>
    apiGetEmployees<{ employees: GetEmployeesResponse }, any>({})
  );

  const navigate = useNavigate();
  const company = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    revalidateAuth();
  }, [revalidateAuth]);

  return (
    <div className="flex flex-col gap-4">
      <Statistic />
      <div className="flex gap-4 flex-col xl:flex-row">
        <div className="flex-auto">
          {employees?.data.employees.data.some((item) => !item.is_verified_by_company) && (
            <Card className="mb-4">
              <div className="flex items-center justify-between mb-6">
                <h4>{t("validations_requests")}</h4>
                <Button size="sm" onClick={() => navigate("/employees")}>
                  {t("view_all")}
                </Button>
              </div>
              <Table>
                <THead>
                  <Tr>
                    <Th colSpan={1}>ID</Th>
                    <Th colSpan={1}>{t("name")}</Th>
                    <Th colSpan={1}>{t("phone")}</Th>
                    <Th colSpan={1}></Th>
                  </Tr>
                </THead>
                <TBody>
                  {employees?.data.employees.data
                    .filter((item) => item.is_verified_by_company === false)
                    .slice(0, 5)
                    .map((item) => (
                      <Tr key={item.id}>
                        <Td>{item.id}</Td>
                        <Td>{item.name}</Td>
                        <Td>{item.phone}</Td>
                        <Td>
                          <ActionColumn row={item} />
                        </Td>
                      </Tr>
                    ))}
                </TBody>
              </Table>
            </Card>
          )}
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
                  <Th colSpan={1}>{t("type")}</Th>
                  <Th colSpan={1}>{t("created_at")}</Th>
                </Tr>
              </THead>
              <TBody>
                {company?.transactions?.map((item) => (
                  <Tr key={item.transaction_id}>
                    <Td>{item.user_name}</Td>
                    <Td>{item.doctor_name}</Td>
                    <Td>
                      <NumericFormat
                        displayType="text"
                        value={Number(item.amount)}
                        suffix=" MDL"
                        thousandSeparator={true}
                      />
                    </Td>
                    <Td>
                      <Tag>{t(`transaction_type.${item.transaction_type}`)}</Tag>
                    </Td>
                    <Td>{dayjs(item.created_at).format("DD/MM/YYYY")}</Td>
                  </Tr>
                ))}
              </TBody>
            </Table>
          </Card>
        </div>
        <div className="xl:w-[380px] max-w-sm mr-auto w-full">
          <GenerateQrCodeContent className="p-0" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
