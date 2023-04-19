import { Input, Text } from "@chakra-ui/react";
import React, { ChangeEvent, useState } from "react";

import { BsChevronDown } from "react-icons/bs";
import PopUp from "./PopUp";
import { NewEmployeeType } from "../types/employee";
import Information from "./Information";

interface Props {
  company: NewEmployeeType[];
  search: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: (name: string) => void;
}

const DropDown = ({ company, search, onChange, onClick }: Props) => {
  return (
    <>
      <div style={{ position: "relative" }}>
        <Input
          placeholder="Buscar por nombre"
          type="text"
          value={search}
          onChange={(e) => onChange(e)}
        />
        <div
          style={{
            position: "absolute",
            background: "#fff",
            top: 40,
            left: 0,
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            width: "100%",
          }}
        >
          {search && company.length ? (
            <div>
              {company?.map((employee) => {
                return (
                  <Text
                    key={employee.id}
                    fontSize="xl"
                    onClick={() => {
                      onClick(employee.nombre!);
                    }}
                  >
                    {" "}
                    {employee.nombre}
                  </Text>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default DropDown;
