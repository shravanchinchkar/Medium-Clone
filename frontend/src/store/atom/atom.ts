import { atom } from "recoil";

export const lognedInUser = atom({
  key: "lognedInUser",
  default: [],
});

export const isAuthenticated = atom({
  key: "isAuthenticated",
  default: localStorage.getItem("mediumToken")
    ? localStorage.getItem("mediumToken")
    : null,
});

export const isSubmitting=atom({
  key:"isSubmitting",
  default:false
})
