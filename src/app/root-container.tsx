"use client"

import { Header } from "@/components/Header";
import { NextUIProvider } from "@nextui-org/react";

export interface RootContainerProps {
  children?: React.ReactNode;
}

export function RootContainer({ children }: RootContainerProps) {
  return (
    <NextUIProvider>
      <div className="relative w-full h-full bg-space">
        <Header />
        <div className="h-full w-full flex items-center justify-center text-yellow-500 font-open-sans font-normal">
          {children}
        </div>
      </div>
    </NextUIProvider>
  );
}
