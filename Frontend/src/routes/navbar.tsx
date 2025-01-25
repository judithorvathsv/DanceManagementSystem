import { createFileRoute } from "@tanstack/react-router";
import NavBar from "../components/navBar";

export const Route = createFileRoute("/navbar")({
  component: NavBar,
});