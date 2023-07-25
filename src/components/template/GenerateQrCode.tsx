import Dropdown from "@/components/ui/Dropdown";
import withHeaderItem from "@/utils/hoc/withHeaderItem";
import classNames from "classnames";
import { HiOutlineQrCode, HiOutlineSquare2Stack, HiOutlineCheck } from "react-icons/hi2";
import type { CommonProps } from "@/@types/common";
import { Button, Tooltip } from "../ui";
import { useTranslation } from "react-i18next";
import React from "react";

export const GenerateQrCodeContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
}) => {
  const { t } = useTranslation();

  const [isCopied, setIsCopied] = React.useState(false);

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);

    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const handeleDownload = (url: string) => {
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", "QRCode.png");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={classNames(className)}>
      <div className="p-1 border rounded-lg">
        <img
          src="https://cdn.ttgtmedia.com/rms/misc/qr_code_barcode.jpg"
          alt="QR Code"
          className="w-full h-full aspect-square object-contain"
        />
      </div>
      <Tooltip
        title={isCopied ? t("copied") : t("click_to_copy")}
        placement="top-end"
        wrapperClass="w-full"
      >
        <div
          className={classNames(
            "mt-2 border rounded-lg flex items-center justify-center overflow-hidden py-1 px-2 cursor-pointer select-none",
            "hover:bg-gray-100 border-gray-200"
          )}
          onClick={() => handleCopy("https://cdn.ttgtmedia.com/rms/misc/qr_code_barcode.jpg")}
        >
          <span className="truncate">https://cdn.ttgtmedia.com/rms/misc/qr_code_barcode.jpg</span>
          {isCopied ? (
            <HiOutlineCheck className="w-6 flex-shrink-0 h-6 ml-2 text-emerald-500" />
          ) : (
            <HiOutlineSquare2Stack className="w-6 flex-shrink-0 h-6 ml-2" />
          )}
        </div>
      </Tooltip>

      <div className="flex items-center mt-2">
        <div className="flex-1 border-t border-gray-200 dark:border-gray-700" />
        <div className="mx-2 text-gray-500 dark:text-gray-400">{t("or")}</div>
        <div className="flex-1 border-t border-gray-200 dark:border-gray-700" />
      </div>

      <Button
        variant="solid"
        size="sm"
        className="w-full mt-2"
        onClick={() => handeleDownload("https://cdn.ttgtmedia.com/rms/misc/qr_code_barcode.jpg")}
      >
        {t("download_qrcode")}
      </Button>
    </div>
  );
};

const _GenerateQrCode = ({ className }: CommonProps) => {
  const Title = (
    <div className={classNames(className, "text-2xl")}>
      <HiOutlineQrCode />
    </div>
  );

  return (
    <div>
      <Dropdown menuStyle={{ minWidth: 240 }} renderTitle={Title} placement="bottom-end">
        <Dropdown.Item variant="header">
          <GenerateQrCodeContent className="p-2 max-w-xs" />
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

const GenerateQrCode = withHeaderItem(_GenerateQrCode);

export default GenerateQrCode;
