import { NextRequest, NextResponse } from "next/server";
import { initialMatchweeks } from "@/lib/data";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "matches.json");

async function getStoredData() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return { matchweeks: initialMatchweeks };
  }
}

async function saveData(data: any) {
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error saving data:", error);
  }
}

export async function GET() {
  try {
    const data = await getStoredData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching matches:", error);
    return NextResponse.json({ matchweeks: initialMatchweeks });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await saveData(body);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving matches:", error);
    return NextResponse.json({ error: "Failed to save matches" }, { status: 500 });
  }
}