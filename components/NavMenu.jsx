"use client";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";

export default function NavMenu() {
  const router = useRouter();

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<HamburgerIcon />}
        variant="outline"
        aria-label="Opciones"
      />
      <MenuList>
        <MenuItem onClick={() => router.push("/")}>Inicio</MenuItem>
        <MenuItem onClick={() => router.push("/groups/new")}>
          Crear grupo
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
