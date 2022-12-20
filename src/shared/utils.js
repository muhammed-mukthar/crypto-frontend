import { toast } from "react-hot-toast";

// export const BASEURL = "http://localhost:4000";
export const BASEURL = "https://cryptovipsignal.io/server";
export const TELEGRAM_BASE_URL =
  "https://api.telegram.org/bot5466070024:AAHalO5pyVwMdKmFQiJQfN9d_c6Bfj64TA8";
export const TELEGRAM_FILE_URL =
 "https://api.telegram.org/file/bot5466070024:AAHalO5pyVwMdKmFQiJQfN9d_c6Bfj64TA8";
export const BASECOINGEKO = "https://api.coingecko.com/api/v3";
export const BASECOVALENT = "https://api.covalenthq.com/v1";
export const Success = (message) => toast.success(message);
export const Error = (message) => toast.error(message);
