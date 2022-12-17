import { IStudent } from "app/entities/student/student.model";
import { ICurs } from "app/entities/curs/curs.model";

export interface IStudentCurs {
  id?: number;
  nota?: number;
  student?: IStudent | null;
  curs?: ICurs | null;
}

export class StudentCurs implements IStudentCurs {
  constructor(
    public id?: number,
    public nota?: number,
    public student?: IStudent | null,
    public curs?: ICurs | null
  ) {}
}

export function getStudentCursIdentifier(
  studentCurs: IStudentCurs
): number | undefined {
  return studentCurs.id;
}
