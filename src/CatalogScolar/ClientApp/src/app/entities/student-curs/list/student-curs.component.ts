import { ProfesorService } from 'app/entities/profesor/service/profesor.service';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { Component, OnInit } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";


import { IStudentCurs } from "../student-curs.model";
import { StudentCursService } from "../service/student-curs.service";
import { StudentCursDeleteDialogComponent } from "../delete/student-curs-delete-dialog.component";
import { IProfesor, Profesor } from 'app/entities/profesor/profesor.model';
import jsPDF from 'jspdf';
import { DatePipe } from '@angular/common';

@Component({
  selector: "jhi-student-curs",
  templateUrl: "./student-curs.component.html",
})
export class StudentCursComponent implements OnInit {
  studentCurs!: any[];
  isLoading = false;
  accountDetails!: Account | null;
  profesorDetails!: Profesor | null;
  averageGrade: any;
  selected = '';

  constructor(
    protected studentCursService: StudentCursService,
    protected modalService: NgbModal,
    protected accountService: AccountService,
    protected profesorService: ProfesorService,
    private datePipe: DatePipe
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
    if (this.accountDetails?.authorities[0] === 'ROLE_PROFESOR') {
        this.getProfesors();
    }
    this.loadAll();
  }

  filterDataByAccount(): void {
    if (this.accountDetails?.authorities[0] === 'ROLE_STUDENT'){
        this.studentCurs = this.studentCurs.filter((note) => note.student?.mail === this.accountDetails?.email);
        this.getAverage();
    }
    if (this.accountDetails?.authorities[0] === 'ROLE_PROFESOR') {
        if(this.profesorDetails){
            this.studentCurs = this.studentCurs.filter((note) => note.curs?.profesorId === this.profesorDetails?.id);
        }
        else {
            this.studentCurs = this.studentCurs.filter((note) => note.curs?.profesor?.id === -1);
        }
    }
    }

  trackId(_index: number, item: IStudentCurs): number {
    return item.id!;
  }

  getProfesors(): void{
    this.profesorService.query().subscribe({
        next: (res: HttpResponse<IProfesor[]>) => {
        this.isLoading = false;
        const profesors = res.body ?? [];
        this.profesorDetails = profesors.filter((profesor) => profesor.mail === this.accountDetails?.email)[0];
        },
        error: () => {
        this.isLoading = false;
        },
    });
  }

  getAverage(): void {
    if(this.accountDetails?.authorities[0] === 'ROLE_STUDENT'){
        let sum = 0;
        this.studentCurs.forEach(function(item){sum+=item.nota;});
        this.averageGrade = sum / this.studentCurs.length;
    }
  }

  delete(studentCurs: IStudentCurs): void {
    const modalRef = this.modalService.open(StudentCursDeleteDialogComponent, {
      size: "lg",
      backdrop: "static",
    });
    modalRef.componentInstance.studentCurs = studentCurs;
    modalRef.closed.subscribe((reason) => {
      if (reason === "deleted") {
        this.loadAll();
      }
    });
  }

  public openPDF(): void {
    const doc = new jsPDF('p', 'mm', 'a4');
    const name: string = this.studentCurs[0].student?.nume;
    const date: string = this.datePipe.transform(new Date(), 'dd-MM-yyyy')!;
    doc.setFontSize(22);
    doc.text('Adeverinta', 80, 20);

    doc.setFontSize(16);
    doc.text('Studentul '+name, 40, 50);
    doc.text(' este inscris in anul universitar 2022-2023, forma de invatamant IF.', 15, 60);
    doc.text( 'Data: ' + date, 50, 80);

    doc.save('adeverintaStudent.pdf');
  }
}
