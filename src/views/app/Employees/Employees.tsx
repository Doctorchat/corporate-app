import AdaptableCard from "@/components/shared/AdaptableCard";
import EmployeesTable from "./components/EmployeesTable";
import { useTranslation } from "react-i18next";

const Employees = () => {
  const { t } = useTranslation();

  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="lg:flex items-center justify-between mb-4">
        <h3 className="mb-4 lg:mb-0">{t("employees")}</h3>
      </div>
      <EmployeesTable
        data={[
          {
            id: 1,
            name: "Nguyen Van A",
            phone: "0123456789",
            is_verified_by_company: false,
            created_at: "2021-08-01 12:00:00",
          },
          {
            id: 2,
            name: "Nguyen Van B",
            phone: "0123456789",
            is_verified_by_company: true,
            created_at: "2021-08-01 12:00:00",
          },
        ]}
        loading={false}
        tableData={{
          pageIndex: 1,
          pageSize: 10,
          total: 2,
        }}
        updateTableData={() => {}}
      />
    </AdaptableCard>
  );
};

export default Employees;
