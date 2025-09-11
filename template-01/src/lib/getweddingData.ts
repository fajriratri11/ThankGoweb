import { WeddingData } from "@/types/wedding";
import fs from "fs";
import path from "path";

export function getWeddingData(slug: string): WeddingData {
  const filePath = path.join(process.cwd(), "src/data", `${slug}.json`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileContent);
}
