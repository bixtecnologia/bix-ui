#!/usr/bin/env node
import { Command } from "commander";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
// Obter o diretório atual de forma semelhante ao __dirname em módulos CommonJS
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const program = new Command();
program
    .name("BIX-UI")
    .description("CLI to manage bix-ui components")
    .version("1.0.0");
program
    .command("add <component>")
    .description("Add a component to the project")
    .option("-c, --component-dir <dir>", "Directory to copy component into", "./components")
    .action((component, options) => {
    // Caminho corrigido para o componente na origem, apontando diretamente para o diretório 'src'
    const componentPath = path.resolve(__dirname, "../../src/components", `${component}/index.tsx`);
    const targetPath = path.resolve(process.cwd(), options.componentDir, component, "index.tsx");
    // Garantindo que o diretório de destino exista
    if (!fs.existsSync(path.dirname(targetPath))) {
        fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    }
    // Tente copiar o arquivo
    try {
        fs.copyFileSync(componentPath, targetPath);
        console.log(`Component ${component} added to ${options.componentDir}/${component}`);
    }
    catch (err) {
        console.error("Failed to copy component:", err);
    }
});
program.parse(process.argv);
