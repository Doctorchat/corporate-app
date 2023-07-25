import { useState, useMemo, useRef } from "react";
import Badge from "@/components/ui/Badge";
import DataTable from "@/components/shared/DataTable";
import { HiOutlineCheck, HiX } from "react-icons/hi";
import cloneDeep from "lodash/cloneDeep";
import dayjs from "dayjs";
import type { DataTableResetHandle, OnSortParam, ColumnDef } from "@/components/shared/DataTable";
import { useTranslation } from "react-i18next";
import { Button, Dialog } from "@/components/ui";
import { TableQueries } from "@/@types/common";
import { Employee } from "../types";

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
    dotClass: "bg-amber-500",
    textClass: "text-amber-500",
  },
  1: {
    label: "approved",
    dotClass: "bg-emerald-500",
    textClass: "text-emerald-500",
  },
};

const ActionColumn = ({ row }: { row: Employee }) => {
  const { t } = useTranslation();

  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  if (row.is_verified_by_company) {
    return null;
  }

  return (
    <div className="flex justify-end text-base space-x-2">
      <Button
        size="xs"
        variant="twoTone"
        color="red"
        icon={<HiX />}
        onClick={() => setIsCancelDialogOpen(true)}
      >
        {t("decline")}
      </Button>
      <Button
        size="xs"
        variant="twoTone"
        icon={<HiOutlineCheck />}
        onClick={() => setIsAcceptDialogOpen(true)}
      >
        {t("accept")}
      </Button>

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
          <Button variant="solid" size="sm" onClick={() => setIsAcceptDialogOpen(false)}>
            {t("accept")}
          </Button>
        </div>
      </Dialog>
      <Dialog
        isOpen={isCancelDialogOpen}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        onClose={() => setIsCancelDialogOpen(false)}
        onRequestClose={() => setIsCancelDialogOpen(false)}
      >
        <p>{t("decline_confirmation")}</p>
        <div className="text-right mt-6">
          <Button
            className="ltr:mr-2 rtl:ml-2"
            variant="plain"
            size="sm"
            onClick={() => setIsCancelDialogOpen(false)}
          >
            {t("cancel")}
          </Button>
          <Button variant="solid" size="sm" onClick={() => setIsCancelDialogOpen(false)}>
            {t("decline")}
          </Button>
        </div>
      </Dialog>
    </div>
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
      },
      {
        header: t("name"),
        accessorKey: "name",
      },
      {
        header: t("phone"),
        accessorKey: "phone",
      },
      {
        header: t("created_at"),
        accessorKey: "created_at",
        cell: (props) => {
          return <span>{dayjs(props.row.original.created_at).format("DD/MM/YYYY")}</span>;
        },
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
                className={`ml-2 rtl:mr-2 capitalize font-semibold ${
                  orderStatusColor[Number(is_verified_by_company)].textClass
                }`}
              >
                {t(orderStatusColor[Number(is_verified_by_company)].label)}
              </span>
            </div>
          );
        },
      },
      {
        header: "",
        id: "action",
        cell: (props) => <ActionColumn row={props.row.original} />,
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
