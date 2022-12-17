import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { ICurs } from "../curs.model";
import { CursService } from "../service/curs.service";

@Component({
  templateUrl: "./curs-delete-dialog.component.html",
})
export class CursDeleteDialogComponent {
  curs?: ICurs;

  constructor(
    protected cursService: CursService,
    protected activeModal: NgbActiveModal
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cursService.delete(id).subscribe(() => {
      this.activeModal.close("deleted");
    });
  }
}
