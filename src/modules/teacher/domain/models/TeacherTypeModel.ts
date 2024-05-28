export enum TEACHER_TYPE {
  colegiado = "colegiado",
  colaborador = "colaborador",
}

export type TeacherType = keyof typeof TEACHER_TYPE;
