import { enviroment } from "../enviroments/enviroment.env";

export const consoleLog = (...args: any[]) => {
  if (!enviroment.isProd) {
    console.log(...args);
  }
};

export const consoleError = (...args: any[]) => {
  if (!enviroment.isProd) {
    console.error(...args);
  }
};

export const consoleWarn = (...args: any[]) => {
  if (!enviroment.isProd) {
    console.warn(...args);
  }
};

export const consoleDebug = (...args: any[]) => {
  if (!enviroment.isProd) {
    console.debug(...args);
  }
};

export const consoleTable = (...args: any[]) => {
  if (!enviroment.isProd) {
    console.table(...args);
  }
};