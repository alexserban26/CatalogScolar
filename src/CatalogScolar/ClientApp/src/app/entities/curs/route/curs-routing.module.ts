import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UserRouteAccessService } from "app/core/auth/user-route-access.service";
import { CursComponent } from "../list/curs.component";
import { CursDetailComponent } from "../detail/curs-detail.component";
import { CursUpdateComponent } from "../update/curs-update.component";
import { CursRoutingResolveService } from "./curs-routing-resolve.service";

const cursRoute: Routes = [
  {
    path: "",
    component: CursComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ":id/view",
    component: CursDetailComponent,
    resolve: {
      curs: CursRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: "new",
    component: CursUpdateComponent,
    resolve: {
      curs: CursRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ":id/edit",
    component: CursUpdateComponent,
    resolve: {
      curs: CursRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cursRoute)],
  exports: [RouterModule],
})
export class CursRoutingModule {}
