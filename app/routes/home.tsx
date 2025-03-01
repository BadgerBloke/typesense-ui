import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Typesense UI | Developed by MKSingh" },
    { name: "description", content: "Typesense UI/Console | Developed by MKSingh" },
  ];
}

export default function Home() {
  return <Welcome />;
}
