export enum EXTENSION_TYPE {
  program = "program",
  project = "project",
}

export type ExtensionType = keyof typeof EXTENSION_TYPE;
