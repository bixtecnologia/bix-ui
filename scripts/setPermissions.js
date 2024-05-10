import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, "../dist/cli/index.js");

try {
  if (process.platform !== "win32") {
    fs.chmodSync(filePath, 0o755);
    console.log("Permissions set: 755");
  } else {
    console.log("Windows OS detected - no chmod required");
  }
} catch (err) {
  console.error("Failed to set permissions:", err);
}
