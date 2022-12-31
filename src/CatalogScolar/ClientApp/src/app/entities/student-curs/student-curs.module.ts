import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { StudentCursComponent } from "./list/student-curs.component";
import { StudentCursDetailComponent } from "./detail/student-curs-detail.component";
import { StudentCursUpdateComponent } from "./update/student-curs-update.component";
import { StudentCursDeleteDialogComponent } from "./delete/student-curs-delete-dialog.component";
import { StudentCursRoutingModule } from "./route/student-curs-routing.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    StudentCursRoutingModule,
    
],
  declarations: [
    StudentCursComponent,
    StudentCursDetailComponent,
    StudentCursUpdateComponent,
    StudentCursDeleteDialogComponent,
  ],
  entryComponents: [StudentCursDeleteDialogComponent],
})
export class StudentCursModule {}
