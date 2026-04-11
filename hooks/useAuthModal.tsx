"use client";

import { useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type AuthModalContextType = {
  token: string;
  setAuthToken: (token: string) => void;
  signInOpen: boolean;
  signUpOpen: boolean;
  setShowSignIn: (open: boolean) => void;
  setShowSignUp: (open: boolean) => void;
  openSignIn: () => void;
  openSignUp: () => void;
  closeSignIn: () => void;
  closeSignUp: () => void;
  closeAll: () => void;
  switchToSignUp: () => void;
  switchToSignIn: () => void;
};

const AuthModalContext = createContext<AuthModalContextType | undefined>(
  undefined,
);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [token, setTokenState] = useState("");
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);

  useEffect(() => {
    setTokenState(localStorage.getItem("token") ?? "");
  }, []);

  const setAuthToken = useCallback((next: string) => {
    localStorage.setItem("token", next);
    setTokenState(next);
  }, []);

  const setShowSignIn = (open: boolean) => {
    setSignInOpen(open);
  };

  const setShowSignUp = (open: boolean) => {
    setSignUpOpen(open);
  };

  const openSignIn = () => {
    setSignInOpen(true);
    setSignUpOpen(false);
  };

  const openSignUp = () => {
    setSignInOpen(false);
    setSignUpOpen(true);
  };

  const closeSignIn = () => setSignInOpen(false);
  const closeSignUp = () => setSignUpOpen(false);

  const closeAll = () => {
    setSignInOpen(false);
    setSignUpOpen(false);
  };

  const switchToSignUp = () => {
    setSignInOpen(false);
    setSignUpOpen(true);
  };

  const switchToSignIn = () => {
    setSignInOpen(true);
    setSignUpOpen(false);
  };

  const value: AuthModalContextType = {
    token,
    setAuthToken,
    signInOpen,
    signUpOpen,
    setShowSignIn,
    setShowSignUp,
    openSignIn,
    openSignUp,
    closeSignIn,
    closeSignUp,
    closeAll,
    switchToSignUp,
    switchToSignIn,
  };

  return (
    <AuthModalContext.Provider value={value}>
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error("useAuthModal must be used within AuthModalProvider");
  }
  return context;
}
