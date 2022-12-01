import { ProjectRoom } from "@types";
import { HTTP_METHOD } from ".";
import { _axios } from "../axiosService";

const projectRoomUrl = "/projectrooms";

// <----- 회원가입 관련 API -----

export const fetchProjectRoomList = async () => {
  return _axios<ProjectRoom[]>({
    url: `${projectRoomUrl}`,
    method: HTTP_METHOD.GET,
  });
};
