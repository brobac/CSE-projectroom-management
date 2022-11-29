import { Tokens } from "@types";
import { atom } from "recoil";

export const tokenState = atom<Tokens | undefined>({
  key: "tokenState",
  default: undefined,
});
