"use client";
import { useState } from "react";
import Input, { InputProps } from "./input";

export default function InputPassword(props: InputProps) {
  const [show, setShow] = useState(false);

  function handleClick() {
    console.log("Hi");
    setShow(!show);
  }

  return (
    <Input type={show ? "text" : "password"} {...props} onClick={handleClick} />
  );
}
