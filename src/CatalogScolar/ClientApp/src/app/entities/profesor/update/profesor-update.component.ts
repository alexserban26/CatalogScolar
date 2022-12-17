import { Component, OnInit } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";

import { IProfesor, Profesor } from "../profesor.model";
import { ProfesorService } from "../service/profesor.service";

@Component({
  selector: "jhi-profesor-update",
  templateUrl: "./profesor-update.component.html",
})
export class ProfesorUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nume: [null, [Validators.required]],
    mail: [null, [Validators.required]],
  });

  constructor(
    protected profesorService: ProfesorService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ profesor }) => {
      this.updateForm(profesor);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const profesor = this.createFromForm();
    if (profesor.id !== undefined) {
      this.subscribeToSaveResponse(this.profesorService.update(profesor));
    } else {
      this.subscribeToSaveResponse(this.profesorService.create(profesor));
    }
  }

  protected subscribeToSaveResponse(
    result: Observable<HttpResponse<IProfesor>>
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

  protected updateForm(profesor: IProfesor): void {
    this.editForm.patchValue({
      id: profesor.id,
      nume: profesor.nume,
      mail: profesor.mail,
    });
  }

  protected createFromForm(): IProfesor {
    return {
      ...new Profesor(),
      id: this.editForm.get(["id"])!.value,
      nume: this.editForm.get(["nume"])!.value,
      mail: this.editForm.get(["mail"])!.value,
    };
  }
}
