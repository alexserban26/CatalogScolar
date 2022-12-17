import { IStudentCurs } from "app/entities/student-curs/student-curs.model";

export interface IStudent {
  id?: number;
  nume?: string;
  mail?: string;
  studentCurs?: IStudentCurs[] | null;
}

export class Student implements IStudent {
  constructor(
    public id?: number,
    public nume?: string,
    public mail?: string,
    public studentCurs?: IStudentCurs[] | null
  ) {}
}

export function getStudentIdentifier(student: IStudent): number | undefined {
  return student.id;
}
