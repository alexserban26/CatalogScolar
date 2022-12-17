import { Component, OnInit } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { IProfesor } from "../profesor.model";
import { ProfesorService } from "../service/profesor.service";
import { ProfesorDeleteDialogComponent } from "../delete/profesor-delete-dialog.component";

@Component({
  selector: "jhi-profesor",
  templateUrl: "./profesor.component.html",
})
export class ProfesorComponent implements OnInit {
  profesors?: IProfesor[];
  isLoading = false;

  constructor(
    protected profesorService: ProfesorService,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.isLoading = true;

    this.profesorService.query().subscribe({
      next: (res: HttpResponse<IProfesor[]>) => {
        this.isLoading = false;
        this.profesors = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IProfesor): number {
    return item.id!;
  }

  delete(profesor: IProfesor): void {
    const modalRef = this.modalService.open(ProfesorDeleteDialogComponent, {
      size: "lg",
      backdrop: "static",
    });
    modalRef.componentInstance.profesor = profesor;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe((reason) => {
      if (reason === "deleted") {
        this.loadAll();
      }
    });
  }
}
