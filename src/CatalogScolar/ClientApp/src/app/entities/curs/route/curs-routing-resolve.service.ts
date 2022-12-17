import { Injectable } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable, of, EMPTY } from "rxjs";
import { mergeMap } from "rxjs/operators";

import { ICurs, Curs } from "../curs.model";
import { CursService } from "../service/curs.service";

@Injectable({ providedIn: "root" })
export class CursRoutingResolveService implements Resolve<ICurs> {
  constructor(protected service: CursService, protected router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<ICurs> | Observable<never> {
    const id = route.params["id"];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((curs: HttpResponse<Curs>) => {
          if (curs.body) {
            return of(curs.body);
          } else {
            this.router.navigate(["404"]);
            return EMPTY;
          }
        })
      );
    }
    return of(new Curs());
  }
}
