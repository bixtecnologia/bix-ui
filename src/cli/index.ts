#!/usr/bin/env node

import { Command } from "commander";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const program = new Command();

program
  .name("BIX-UI")
  .description("CLI to manage bix-ui components")
  .version("1.0.0");

program
  .command("add <component>")
  .description("Add a component to the project")
  .option(
    "-c, --component-dir <dir>",
    "Directory to copy component into",
    "./components"
  )
  .action((component, options) => {
    const componentPath = path.resolve(
      __dirname,
      "../../src/components",
      `${component}/index.tsx`
    );
    const targetPath = path.resolve(
      process.cwd(),
      options.componentDir,
      component,
      "index.tsx"
    );

    if (!fs.existsSync(path.dirname(targetPath))) {
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    }

    try {
      fs.copyFileSync(componentPath, targetPath);
      console.log(
        `Component ${component} added to ${options.componentDir}/${component}`
      );
    } catch (err) {
      console.error("Failed to copy component:", err);
    }
  });

program.parse(process.argv);
