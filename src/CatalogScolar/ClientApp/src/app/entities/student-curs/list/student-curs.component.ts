import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { Component, OnInit } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";


import { IStudentCurs } from "../student-curs.model";
import { StudentCursService } from "../service/student-curs.service";
import { StudentCursDeleteDialogComponent } from "../delete/student-curs-delete-dialog.component";

@Component({
  selector: "jhi-student-curs",
  templateUrl: "./student-curs.component.html",
})
export class StudentCursComponent implements OnInit {
  studentCurs!: IStudentCurs[];
  isLoading = false;
  accountDetails!: Account | null;

  constructor(
    protected studentCursService: StudentCursService,
    protected modalService: NgbModal,
    protected accountService: AccountService
  ) {}

  loadAll(): void {
    this.isLoading = true;

    this.studentCursService.query().subscribe({
      next: (res: HttpResponse<IStudentCurs[]>) => {
        this.isLoading = false;
        this.studentCurs = res.body ?? [];
        this.filterDataByAccount();
      },
      error: () => {
        this.isLoading = false;
      },
    }
    );
  }

  ngOnInit(): void {
    this.accountDetails = this.accountService.userIdentity;
    this.loadAll();

  }

  filterDataByAccount(): void {
    if (this.accountDetails?.authorities[0] === 'ROLE_STUDENT'){
        this.studentCurs = this.studentCurs.filter((note) => note.student?.mail === this.accountDetails?.email);
    }
  }

  trackId(_index: number, item: IStudentCurs): number {
    return item.id!;
  }

  delete(studentCurs: IStudentCurs): void {
    const modalRef = this.modalService.open(StudentCursDeleteDialogComponent, {
      size: "lg",
      backdrop: "static",
    });
    modalRef.componentInstance.studentCurs = studentCurs;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe((reason) => {
      if (reason === "deleted") {
        this.loadAll();
      }
    });
  }
}
