import { AccountService } from './../../../core/auth/account.service';
import { Component, OnInit } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { finalize, map } from "rxjs/operators";

import { IStudentCurs, StudentCurs } from "../student-curs.model";
import { StudentCursService } from "../service/student-curs.service";
import { IStudent } from "app/entities/student/student.model";
import { StudentService } from "app/entities/student/service/student.service";
import { ICurs } from "app/entities/curs/curs.model";
import { CursService } from "app/entities/curs/service/curs.service";
import { Account } from "app/core/auth/account.model";

@Component({
  selector: "jhi-student-curs-update",
  templateUrl: "./student-curs-update.component.html",
})
export class StudentCursUpdateComponent implements OnInit {
  isSaving = false;

  studentsSharedCollection: IStudent[] = [];
  cursSharedCollection: ICurs[] = [];
  accountDetails: any;


  editForm = this.fb.group({
    id: [],
    nota: [null, [Validators.required]],
    anScolar: [null, [Validators.required]],
    student: [],
    curs: [],
  });

  constructor(
    protected studentCursService: StudentCursService,
    protected studentService: StudentService,
    protected cursService: CursService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    protected accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.accountDetails = this.accountService.userIdentity;
    this.activatedRoute.data.subscribe(({ studentCurs }) => {
      this.updateForm(studentCurs);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const studentCurs = this.createFromForm();
    if (studentCurs.id !== undefined) {
      this.subscribeToSaveResponse(this.studentCursService.update(studentCurs));
    } else {
      this.subscribeToSaveResponse(this.studentCursService.create(studentCurs));
    }
  }

  trackStudentById(_index: number, item: IStudent): number {
    return item.id!;
  }

  trackCursById(_index: number, item: ICurs): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(
    result: Observable<HttpResponse<IStudentCurs>>
  ): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(studentCurs: IStudentCurs): void {
    this.editForm.patchValue({
      id: studentCurs.id,
      nota: studentCurs.nota,
      anScolar: studentCurs.anScolar,
      student: studentCurs.student,
      curs: studentCurs.curs,
    });

    this.studentsSharedCollection =
      this.studentService.addStudentToCollectionIfMissing(
        this.studentsSharedCollection,
        studentCurs.student
      );
    this.cursSharedCollection = this.cursService.addCursToCollectionIfMissing(
      this.cursSharedCollection,
      studentCurs.curs
    );
  }

  protected loadRelationshipsOptions(): void {
    this.studentService
      .query()
      .pipe(map((res: HttpResponse<IStudent[]>) => res.body ?? []))
      .pipe(
        map((students: IStudent[]) =>
          this.studentService.addStudentToCollectionIfMissing(
            students,
            this.editForm.get("student")!.value
          )
        )
      )
      .subscribe(
        (students: IStudent[]) => (this.studentsSharedCollection = students)
      );

    this.cursService
      .query()
      .pipe(map((res: HttpResponse<ICurs[]>) => res.body ?? []))
      .pipe(
        map((curs: ICurs[]) =>
          this.cursService.addCursToCollectionIfMissing(
            curs,
            this.editForm.get("curs")!.value
          )
        )
      )
      .subscribe((curs: ICurs[]) => (
        this.cursSharedCollection = (this.accountDetails?.authorities[0]=== 'ROLE_PROFESOR')?
        curs.filter((c) => c.profesor?.mail === this.accountDetails?.email):
        curs))
  }

  protected createFromForm(): IStudentCurs {
    return {
      ...new StudentCurs(),
      id: this.editForm.get(["id"])!.value,
      nota: this.editForm.get(["nota"])!.value,
      anScolar: this.editForm.get(["anScolar"])!.value,
      student: this.editForm.get(["student"])!.value,
      curs: this.editForm.get(["curs"])!.value,
    };
  }
}
