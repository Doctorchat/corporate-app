import AdaptableCard from "@/components/shared/AdaptableCard";
import EmployeesTable from "./components/EmployeesTable";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { apiGetEmployees } from "@/services/EmployeesService";
import { GetEmployeesResponse } from "./types";
import { useSessionStorage } from "usehooks-ts";

const Employees = () => {
  const { t } = useTranslation();

  const [state, setState] = useSessionStorage("employees-state", {
    page: 1,
  });

  const { data, isLoading } = useQuery(["employees"], () =>
    apiGetEmployees<{ employees: GetEmployeesResponse }, { page: number }>({
      page: state.page,
    })
  );

  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="lg:flex items-center justify-between mb-4">
        <h3 className="mb-4 lg:mb-0">{t("employees")}</h3>
      </div>
      <EmployeesTable
        data={data?.data.employees.data ?? []}
        loading={isLoading}
        tableData={{
          pageIndex: data?.data.employees.current_page ?? 1,
          pageSize: data?.data.employees.per_page ?? 10,
          total: data?.data.employees.total ?? 0,
        }}
        updateTableData={({ pageIndex }) => {
          setState({ page: (pageIndex ?? 0) + 1 });
        }}
      />
    </AdaptableCard>
  );
};

export default Employees;
