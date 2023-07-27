import withHeaderItem from "@/utils/hoc/withHeaderItem";
import classNames from "classnames";
import { HiOutlineQrCode, HiOutlineSquare2Stack, HiOutlineCheck } from "react-icons/hi2";
import type { CommonProps } from "@/@types/common";
import { Button, Tooltip } from "../ui";
import { useTranslation } from "react-i18next";
import React from "react";
import { useAppSelector } from "@/store";
import { useOnClickOutside } from "usehooks-ts";

export const GenerateQrCodeContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
}) => {
  const { t } = useTranslation();

  const company = useAppSelector((state) => state.auth.user);

  const inviteInfo = {
    qr: `https://api-dev.doctorchat.md/qrcode/company/${company.id}`,
    url: `https://app.doctorchat.md/registration-flow?company_id=${company.id}`,
  };

  const [isCopied, setIsCopied] = React.useState(false);

  const handleCopy = (url?: string) => {
    if (!url) return;

    navigator.clipboard.writeText(url);

    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const handleDownload = (url?: string) => {
    if (!url) return;

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
          src={inviteInfo.qr}
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
          onClick={() => handleCopy(inviteInfo.url)}
        >
          <span className="truncate">{inviteInfo.url}</span>
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
        onClick={() => handleDownload(inviteInfo.qr)}
      >
        {t("download_qrcode")}
      </Button>
    </div>
  );
};

const _GenerateQrCode = ({ className }: CommonProps) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const ref = React.useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setIsVisible(false));

  return (
    <div ref={ref} className="relative">
      <div
        className={classNames(className, "text-2xl")}
        onClick={() => setIsVisible((prev) => !prev)}
      >
        <HiOutlineQrCode />
      </div>
      <div
        className={classNames(
          "absolute top-full bg-white right-full translate-x-10 shadow-xl border border-neutral-200 rounded-md transition-all",
          isVisible
            ? "visible opacity-100 pointer-events-auto translate-y-2"
            : "invisible opacity-0 pointer-events-none translate-y-1"
        )}
      >
        <GenerateQrCodeContent className="p-2 md:max-w-xs max-w-[280px]" />
      </div>
    </div>
  );
};

const GenerateQrCode = withHeaderItem(_GenerateQrCode);

export default GenerateQrCode;
