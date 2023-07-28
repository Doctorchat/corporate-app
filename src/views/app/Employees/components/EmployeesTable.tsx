import { useState, useMemo, useRef } from "react";
import Badge from "@/components/ui/Badge";
import DataTable from "@/components/shared/DataTable";
import { HiOutlineCheck, HiX } from "react-icons/hi";
import cloneDeep from "lodash/cloneDeep";
import dayjs from "dayjs";
import type { DataTableResetHandle, OnSortParam, ColumnDef } from "@/components/shared/DataTable";
import { useTranslation } from "react-i18next";
import { Button, Dialog, Tooltip } from "@/components/ui";
import { TableQueries } from "@/@types/common";
import { Employee } from "../types";
import { apiDeleteEmployee, apiValidateEmployee } from "@/services/EmployeesService";
import { useQueryClient } from "react-query";
import { HiOutlineTrash } from "react-icons/hi2";

const orderStatusColor: Record<
  number,
  {
    label: string;
    dotClass: string;
    textClass: string;
  }
> = {
  0: {
    label: "pending",
    dotClass: "bg-amber-500 flex-shrink-0",
    textClass: "text-amber-500",
  },
  1: {
    label: "approved",
    dotClass: "bg-emerald-500 flex-shrink-0",
    textClass: "text-emerald-500",
  },
};

export const ActionColumn = ({ row }: { row: Employee }) => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState<"accept" | "delete" | null>(null);

  const handleValidateEmployee = async () => {
    setLoading("accept");
    await apiValidateEmployee(row.id);
    await queryClient.invalidateQueries("employees");
    setLoading(null);
    setIsAcceptDialogOpen(false);
  };

  const handleDeleteEmployee = async () => {
    setLoading("delete");
    await apiDeleteEmployee(row.id);
    await queryClient.invalidateQueries("employees");
    setLoading(null);
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      {row.is_verified_by_company === true && (
        <div className="flex justify-end text-lg">
          <Tooltip title={t("delete")}>
            <span
              className="cursor-pointer p-2 hover:text-red-500"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <HiOutlineTrash />
            </span>
          </Tooltip>
        </div>
      )}

      {row.is_verified_by_company === false && (
        <div className="flex justify-end text-base space-x-2">
          <Button
            size="xs"
            variant="twoTone"
            color="red"
            icon={<HiX />}
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            {t("delete")}
          </Button>
          <Button
            size="xs"
            variant="twoTone"
            color="emerald"
            icon={<HiOutlineCheck />}
            onClick={() => setIsAcceptDialogOpen(true)}
          >
            {t("accept")}
          </Button>
        </div>
      )}

      <Dialog
        isOpen={isAcceptDialogOpen}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        onClose={() => setIsAcceptDialogOpen(false)}
        onRequestClose={() => setIsAcceptDialogOpen(false)}
      >
        <p>{t("accept_confirmation")}</p>
        <div className="text-right mt-6">
          <Button
            className="ltr:mr-2 rtl:ml-2"
            variant="plain"
            size="sm"
            onClick={() => setIsAcceptDialogOpen(false)}
          >
            {t("cancel")}
          </Button>
          <Button
            variant="solid"
            size="sm"
            loading={loading === "accept"}
            onClick={handleValidateEmployee}
          >
            {t("accept")}
          </Button>
        </div>
      </Dialog>
      <Dialog
        isOpen={isDeleteDialogOpen}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        onClose={() => setIsDeleteDialogOpen(false)}
        onRequestClose={() => setIsDeleteDialogOpen(false)}
      >
        <p>{t("delete_confirmation")}</p>
        <div className="text-right mt-6">
          <Button
            className="ltr:mr-2 rtl:ml-2"
            variant="plain"
            size="sm"
            onClick={() => setIsDeleteDialogOpen(false)}
          >
            {t("cancel")}
          </Button>
          <Button
            variant="solid"
            size="sm"
            loading={loading === "delete"}
            onClick={handleDeleteEmployee}
          >
            {t("delete")}
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export interface EmployeesTableProps {
  data: Employee[];
  loading: boolean;
  tableData: TableQueries;
  updateTableData: (tableData: TableQueries) => void;
}

const EmployeesTable = ({ data, loading, tableData, updateTableData }: EmployeesTableProps) => {
  const { t } = useTranslation();

  const tableRef = useRef<DataTableResetHandle>(null);

  const columns: ColumnDef<Employee>[] = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        enableSorting: false,
      },
      {
        header: t("name"),
        accessorKey: "name",
        enableSorting: false,
      },
      {
        header: t("phone"),
        accessorKey: "phone",
        enableSorting: false,
      },
      {
        header: t("created_at"),
        accessorKey: "created_at",
        cell: (props) => {
          return <span>{dayjs(props.row.original.created_at).format("DD/MM/YYYY")}</span>;
        },
        enableSorting: false,
      },
      {
        header: t("status"),
        accessorKey: "status",
        cell: (props) => {
          const { is_verified_by_company } = props.row.original;

          return (
            <div className="flex items-center">
              <Badge className={orderStatusColor[Number(is_verified_by_company)].dotClass} />
              <span
                className={`ml-2 rtl:mr-2 font-semibold text-sm ${
                  orderStatusColor[Number(is_verified_by_company)].textClass
                }`}
              >
                {t(orderStatusColor[Number(is_verified_by_company)].label)}
              </span>
            </div>
          );
        },
        enableSorting: false,
      },
      {
        header: "",
        id: "action",
        cell: (props) => <ActionColumn row={props.row.original} />,
        enableSorting: false,
      },
    ],
    [t]
  );

  const onPaginationChange = (page: number) => {
    const newTableData = cloneDeep(tableData);
    newTableData.pageIndex = page;
    updateTableData(newTableData);
  };

  const onSort = (sort: OnSortParam) => {
    const newTableData = cloneDeep(tableData);
    newTableData.sort = sort;
    updateTableData(newTableData);
  };

  return (
    <DataTable
      ref={tableRef}
      columns={columns}
      data={data}
      loading={loading}
      pagingData={{
        total: tableData.total as number,
        pageIndex: tableData.pageIndex as number,
        pageSize: tableData.pageSize as number,
      }}
      onPaginationChange={onPaginationChange}
      onSort={onSort}
    />
  );
};

export default EmployeesTable;
