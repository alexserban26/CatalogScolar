import { IProfesor } from "app/entities/profesor/profesor.model";
import { IStudentCurs } from "app/entities/student-curs/student-curs.model";

export interface ICurs {
  id?: number;
  nume?: string;
  profesor?: IProfesor | null;
  studentCurs?: IStudentCurs[] | null;
}

export class Curs implements ICurs {
  constructor(
    public id?: number,
    public nume?: string,
    public profesor?: IProfesor | null,
    public studentCurs?: IStudentCurs[] | null
  ) {}
}

export function getCursIdentifier(curs: ICurs): number | undefined {
  return curs.id;
}
