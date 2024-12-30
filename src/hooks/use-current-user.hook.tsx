"use client";

import { useEffect, useState } from "react";
import * as fcl from "@onflow/fcl";

interface FlowUser {
  addr: string | null;
  loggedIn: boolean;
}

// Define the type for FCL current user response
interface FCLCurrentUser {
  addr: string | null;
  loggedIn: boolean | null;
  cid: string | null;
  expiresAt: number | null;
}

type UseCurrentUserReturn = [
  FlowUser,
  boolean,
  () => Promise<void>,
  () => Promise<void>,
  unknown | null
];

export default function useCurrentUser(): UseCurrentUserReturn {
  const [user, setUser] = useState<FlowUser>({ addr: null, loggedIn: false });
  const [error, setError] = useState<unknown | null>(null);

  const logIn = async () => {
    try {
      await fcl.authenticate();
    } catch (err) {
      setError(err);
    }
  };

  const logOut = async () => {
    try {
      await fcl.unauthenticate();
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fcl.currentUser().subscribe((currentUser: FCLCurrentUser) => {
      setUser({
        addr: currentUser?.addr ?? null,
        loggedIn: currentUser?.addr != null,
      });
    });
  }, []);

  return [user, user.loggedIn, logIn, logOut, error];
}
