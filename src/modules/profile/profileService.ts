import { API_ENDPOINTS } from "../../constants/apiEndpoints";
import { RequestServer } from "../../utils/services";

export type Profile = {
  id: string;
  name: string;
  email: string;
};

export const fetchProfile = async (): Promise<Profile> =>
  RequestServer(API_ENDPOINTS.profile, "GET");
