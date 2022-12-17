import { Component, OnInit } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { ICurs } from "../curs.model";
import { CursService } from "../service/curs.service";
import { CursDeleteDialogComponent } from "../delete/curs-delete-dialog.component";

@Component({
  selector: "jhi-curs",
  templateUrl: "./curs.component.html",
})
export class CursComponent implements OnInit {
  curs?: ICurs[];
  isLoading = false;

  constructor(
    protected cursService: CursService,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.isLoading = true;

    this.cursService.query().subscribe({
      next: (res: HttpResponse<ICurs[]>) => {
        this.isLoading = false;
        this.curs = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: ICurs): number {
    return item.id!;
  }

  delete(curs: ICurs): void {
    const modalRef = this.modalService.open(CursDeleteDialogComponent, {
      size: "lg",
      backdrop: "static",
    });
    modalRef.componentInstance.curs = curs;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe((reason) => {
      if (reason === "deleted") {
        this.loadAll();
      }
    });
  }
}
