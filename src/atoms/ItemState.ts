import { atom } from "recoil";

const itemState = atom({
    key: 'itemState', // unique ID (with respect to other atoms/selectors)
    default: {}
  });

  export  {itemState}