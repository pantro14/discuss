"use client";

import {
  Avatar,
  Button,
  NavbarItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import { useSession } from "next-auth/react";

import * as actions from "@/actions";

export default function HeaderAuth() {
  const { data, status } = useSession();

  let authContent: React.ReactNode = null;

  if (status === "loading") {
    authContent = null;
  } else if (data?.user) {
    authContent = (
      <Popover placement="left">
        <PopoverTrigger>
          <Avatar src={data?.user.image || ""} />
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-4">
            <form action={actions.signOut}>
              <Button type="submit" color="secondary" variant="bordered">
                Sign Out
              </Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <>
        <NavbarItem>
          <form action={actions.signIn}>
            <Button type="submit" color="secondary" variant="bordered">
              Signed In
            </Button>
          </form>
        </NavbarItem>
        <NavbarItem>
          <form action={actions.signIn}>
            <Button type="submit" color="primary" variant="flat">
              Signed Up
            </Button>
          </form>
        </NavbarItem>
      </>
    );
  }
  return authContent;
}
