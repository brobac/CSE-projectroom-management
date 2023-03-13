import { ProjectRoom } from "@types";
import { API_VERSION, HTTP_METHOD } from ".";
import { _axios } from "../axiosService";

const projectRoomUrl = "rooms";

// <----- 회원가입 관련 API -----

export const fetchProjectRoomList = async () => {
  return _axios<ProjectRoom[]>({
    url: `/${API_VERSION.v1}/${projectRoomUrl}`,
    method: HTTP_METHOD.GET,
  });
};
