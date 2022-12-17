import { Component, OnInit } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { finalize, map } from "rxjs/operators";

import { ICurs, Curs } from "../curs.model";
import { CursService } from "../service/curs.service";
import { IProfesor } from "app/entities/profesor/profesor.model";
import { ProfesorService } from "app/entities/profesor/service/profesor.service";

@Component({
  selector: "jhi-curs-update",
  templateUrl: "./curs-update.component.html",
})
export class CursUpdateComponent implements OnInit {
  isSaving = false;

  profesorsSharedCollection: IProfesor[] = [];

  editForm = this.fb.group({
    id: [],
    nume: [null, [Validators.required]],
    profesor: [],
  });

  constructor(
    protected cursService: CursService,
    protected profesorService: ProfesorService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ curs }) => {
      this.updateForm(curs);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const curs = this.createFromForm();
    if (curs.id !== undefined) {
      this.subscribeToSaveResponse(this.cursService.update(curs));
    } else {
      this.subscribeToSaveResponse(this.cursService.create(curs));
    }
  }

  trackProfesorById(_index: number, item: IProfesor): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(
    result: Observable<HttpResponse<ICurs>>
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

  protected updateForm(curs: ICurs): void {
    this.editForm.patchValue({
      id: curs.id,
      nume: curs.nume,
      profesor: curs.profesor,
    });

    this.profesorsSharedCollection =
      this.profesorService.addProfesorToCollectionIfMissing(
        this.profesorsSharedCollection,
        curs.profesor
      );
  }

  protected loadRelationshipsOptions(): void {
    this.profesorService
      .query()
      .pipe(map((res: HttpResponse<IProfesor[]>) => res.body ?? []))
      .pipe(
        map((profesors: IProfesor[]) =>
          this.profesorService.addProfesorToCollectionIfMissing(
            profesors,
            this.editForm.get("profesor")!.value
          )
        )
      )
      .subscribe(
        (profesors: IProfesor[]) => (this.profesorsSharedCollection = profesors)
      );
  }

  protected createFromForm(): ICurs {
    return {
      ...new Curs(),
      id: this.editForm.get(["id"])!.value,
      nume: this.editForm.get(["nume"])!.value,
      profesor: this.editForm.get(["profesor"])!.value,
    };
  }
}
