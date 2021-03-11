import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private selectedTx: any;

  constructor() {}

  setSelectedTx(tx) {
    this.selectedTx = tx;
  }

  getSelectedTx() {
    return this.selectedTx;
  }
}
