import { server_url } from "@/utils/constants";
import axios from "axios";

export const fetcher = axios.create({
  baseURL: server_url,
});
