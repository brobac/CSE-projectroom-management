import { ProjectRoom } from "@types";
import { HTTP_METHOD } from ".";
import { _axios } from "../axiosService";

const projectRoomUrl = "rooms";
const versionURL = "v1";

// <----- 회원가입 관련 API -----

export const fetchProjectRoomList = async () => {
  return _axios<ProjectRoom[]>({
    url: `/${versionURL}/${projectRoomUrl}`,
    method: HTTP_METHOD.GET,
  });
};
