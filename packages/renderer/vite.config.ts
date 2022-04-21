/*
 * @Author: Cary
 * @Date: 2022-04-18 10:58:43
 * @FilePath: \alien-docse:\cary\node-project\gk-electron-project\packages\renderer\vite.config.ts
 */
import {builtinModules} from 'module'
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import resolve from "vite-plugin-resolve";
import electron from "vite-plugin-electron/renderer";
import pkg from "../../package.json";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  mode: process.env.NODE_ENV,
  root: __dirname,
  plugins: [
    vue(),
    resolve({
      electron: electronExport(), // 
      ...builtinModulesExport()
    }),
  ],
  base: "./",
  build: {
    outDir: "../../dist/renderer",
    // emptyOutDir: true,
    emptyOutDir: process.env.NODE_ENV === 'production',
    sourcemap: true,
    rollupOptions: {
      output: {
        format: "cjs",
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData:'@import "@/assets/style/mian.scss";'
      },
    },
  },
  server: {
    host: pkg.env.VITE_DEV_SERVER_HOST,
    port: pkg.env.VITE_DEV_SERVER_PORT,
  },
});

function electronExport() {
  return `
const electron = require("electron");
const {
clipboard,
nativeImage,
shell,
contextBridge,
crashReporter,
ipcRenderer,
webFrame,
desktopCapturer,
deprecate,
} = electron;

export {
electron as default,
clipboard,
nativeImage,
shell,
contextBridge,
crashReporter,
ipcRenderer,
webFrame,
desktopCapturer,
deprecate,
}
`;
}

function builtinModulesExport() {
  const builtins = builtinModules.filter((t) => !t.startsWith("_"));

  return builtins
    .map((moduleId) => {
      const nodeModule = require(moduleId);
      const requireModule = `const M = require("${moduleId}");`;
      const exportDefault = `export default M;`;
      const exportMembers =
        Object.keys(nodeModule)
          .map((attr) => `export const ${attr} = M.${attr}`)
          .join(";\n") + ";";
      const nodeModuleCode = `
${requireModule}
${exportDefault}
${exportMembers}
`;
      return { [moduleId]: nodeModuleCode };
    })
    .reduce((memo, item) => Object.assign(memo, item), {});
}
