import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { IStudentCurs } from "../student-curs.model";
import { StudentCursService } from "../service/student-curs.service";

@Component({
  templateUrl: "./student-curs-delete-dialog.component.html",
})
export class StudentCursDeleteDialogComponent {
  studentCurs?: IStudentCurs;

  constructor(
    protected studentCursService: StudentCursService,
    protected activeModal: NgbActiveModal
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.studentCursService.delete(id).subscribe(() => {
      this.activeModal.close("deleted");
    });
  }
}
