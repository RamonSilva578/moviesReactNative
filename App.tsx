import { StatusBar } from "expo-status-bar";
import React from "react";
import { Routes } from "./src/routes";
import { MoviesProvider } from "./src/contexts/MoviesContext";

export default function App() {
  return (
    <>
      <MoviesProvider>
        <Routes />
        <StatusBar style="auto" />
      </MoviesProvider>
    </>
  );
}
