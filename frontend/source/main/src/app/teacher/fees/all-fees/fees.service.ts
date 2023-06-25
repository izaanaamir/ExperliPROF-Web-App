import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Fees } from './fees.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
@Injectable()
export class FeesService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/fees.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Fees[]> = new BehaviorSubject<Fees[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Fees;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Fees[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllFeess(): void {
    const url = "http://localhost:8000/api/teacher/get_fees/" + localStorage.getItem("user_uuid")
    this.subs.sink = this.httpClient.get<Fees[]>(url).subscribe({
      next: (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
        console.log(data)
      },
      error: (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      },
    });
  }
  addFees(fees: Fees): void {
    this.dialogData = fees;

    this.httpClient.post(this.API_URL, fees)
      .subscribe({
        next: (data) => {
          this.dialogData = fees;
        },
        error: (error: HttpErrorResponse) => {
           // error code here
        },
      });
  }
  updateFees(fees: Fees): void {
    this.dialogData = fees;

    // this.httpClient.put(this.API_URL + fees.id, fees)
    //     .subscribe({
    //       next: (data) => {
    //         this.dialogData = fees;
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
  deleteFees(id: number): void {
    console.log(id);

    this.httpClient.delete("http://localhost:8000/api/teacher/delete_fees/" + id)
        .subscribe({
          next: (data) => {
            console.log(id);
          },
          error: (error: HttpErrorResponse) => {
             // error code here
          },
        });
  }
}
