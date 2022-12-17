import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { CursComponent } from "./list/curs.component";
import { CursDetailComponent } from "./detail/curs-detail.component";
import { CursUpdateComponent } from "./update/curs-update.component";
import { CursDeleteDialogComponent } from "./delete/curs-delete-dialog.component";
import { CursRoutingModule } from "./route/curs-routing.module";

@NgModule({
  imports: [SharedModule, CursRoutingModule],
  declarations: [
    CursComponent,
    CursDetailComponent,
    CursUpdateComponent,
    CursDeleteDialogComponent,
  ],
  entryComponents: [CursDeleteDialogComponent],
})
export class CursModule {}
