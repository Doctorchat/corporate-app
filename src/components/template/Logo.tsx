import classNames from "classnames";
import { APP_NAME } from "@/constants/app.constant";
import type { CommonProps } from "@/@types/common";

interface LogoProps extends CommonProps {
  type?: "full" | "streamline";
  imgClass?: string;
  logoWidth?: number | string;
}

const LOGO_SRC_PATH = "/img/logo/";

const Logo = (props: LogoProps) => {
  const { type = "full", className, imgClass, style, logoWidth = "auto" } = props;

  return (
    <div
      className={classNames(
        "flex items-center py-4 h-16",
        type === "streamline" && "justify-center",
        className
      )}
      style={{
        ...style,
        ...{ width: logoWidth },
      }}
    >
      <img
        className={imgClass}
        src={`${LOGO_SRC_PATH}dc-logo.svg`}
        width={36}
        alt={`${APP_NAME} logo`}
      />
      {type === "full" && <span className="font-black text-[#1C1F62] ml-3">{APP_NAME}</span>}
    </div>
  );
};

export default Logo;
