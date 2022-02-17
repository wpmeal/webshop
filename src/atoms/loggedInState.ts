import { atom } from "recoil";

const loggedInState = atom({
    key: 'loggedInState', // unique ID (with respect to other atoms/selectors)
    default: {}
  });

  export  {loggedInState}