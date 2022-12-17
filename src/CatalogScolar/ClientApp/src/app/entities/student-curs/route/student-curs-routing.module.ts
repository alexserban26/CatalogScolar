import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UserRouteAccessService } from "app/core/auth/user-route-access.service";
import { StudentCursComponent } from "../list/student-curs.component";
import { StudentCursDetailComponent } from "../detail/student-curs-detail.component";
import { StudentCursUpdateComponent } from "../update/student-curs-update.component";
import { StudentCursRoutingResolveService } from "./student-curs-routing-resolve.service";

const studentCursRoute: Routes = [
  {
    path: "",
    component: StudentCursComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ":id/view",
    component: StudentCursDetailComponent,
    resolve: {
      studentCurs: StudentCursRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: "new",
    component: StudentCursUpdateComponent,
    resolve: {
      studentCurs: StudentCursRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ":id/edit",
    component: StudentCursUpdateComponent,
    resolve: {
      studentCurs: StudentCursRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(studentCursRoute)],
  exports: [RouterModule],
})
export class StudentCursRoutingModule {}
