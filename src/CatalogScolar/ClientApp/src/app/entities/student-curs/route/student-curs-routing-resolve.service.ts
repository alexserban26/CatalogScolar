import { Injectable } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable, of, EMPTY } from "rxjs";
import { mergeMap } from "rxjs/operators";

import { IStudentCurs, StudentCurs } from "../student-curs.model";
import { StudentCursService } from "../service/student-curs.service";

@Injectable({ providedIn: "root" })
export class StudentCursRoutingResolveService implements Resolve<IStudentCurs> {
  constructor(
    protected service: StudentCursService,
    protected router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<IStudentCurs> | Observable<never> {
    const id = route.params["id"];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((studentCurs: HttpResponse<StudentCurs>) => {
          if (studentCurs.body) {
            return of(studentCurs.body);
          } else {
            this.router.navigate(["404"]);
            return EMPTY;
          }
        })
      );
    }
    return of(new StudentCurs());
  }
}
