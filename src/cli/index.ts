#!/usr/bin/env node

import { Command } from "commander";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import inquirer from "inquirer";

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
    "components/ui"
  )
  .action(async (component, options) => {
    const componentPath = path.resolve(
      __dirname,
      "../../src/components",
      `${component}/index.tsx`
    );

    if (!fs.existsSync(componentPath)) {
      console.error(`Error: Component '${component}' does not exist.`);
      process.exit(1);
    }

    const targetDir = path.resolve(process.cwd(), options.componentDir);
    const targetPath = path.resolve(targetDir, `${component}.tsx`);

    if (fs.existsSync(targetPath)) {
      const answers = await inquirer.prompt([
        {
          type: "confirm",
          name: "overwrite",
          message: `The component ${component} already exists. Do you want to overwrite it?`,
          default: false,
        },
      ]);

      if (!answers.overwrite) {
        console.log("Component addition cancelled.");
        return;
      }
    }

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    try {
      fs.copyFileSync(componentPath, targetPath);
      console.log(`Component ${component} added to ${targetPath}`);
    } catch (err) {
      console.error("Failed to copy component:", err);
    }
  });

program.parse(process.argv);
