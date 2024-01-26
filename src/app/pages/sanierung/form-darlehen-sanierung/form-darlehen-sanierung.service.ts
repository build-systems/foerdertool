import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormDarlehenSanierungService {
  // Kalkulationszinssatz (Realzins) centralized form values
  kalkRealzins = {
    min: 0.1,
    init: 4,
    max: 8,
    step: 0.1,
  };

  // Kreditlaufzeit centralized form values
  kreditlaufzeit = {
    min: 1,
    init: 10,
    max: 30,
    step: 1,
  };

  // KfW-Darlehen centralized form values
  kfWDarlehenOptions: KfWDarlehenOptions[] = [
    { id: 'kfwd2', value: 'Annuitäten', disabled: false },
    { id: 'kfwd3', value: 'Endfälliges', disabled: false },
    { id: 'kfwd1', value: 'kein', disabled: false },
  ];

  // Bank-Darlehen centralized form values
  bankDarlehenOptions: BankDarlehenOptions[] = [
    { id: 'bankd1', value: 'Annuitäten', disabled: false },
    { id: 'bankd2', value: 'Endfälliges', disabled: false },
  ];

  // Observable for Kalkulationszinssatz (Realzins)
  private kalkRealzinsSource = new BehaviorSubject<number>(this.kalkRealzins.init);
  currentKalkRealzins$ = this.kalkRealzinsSource.asObservable(); 

  // Observable for Kreditlaufzeit
  private kreditlaufzeitSource = new BehaviorSubject<number>(this.kreditlaufzeit.init);
  currentKreditlaufzeit$ = this.kreditlaufzeitSource.asObservable(); 

  // Observable for kfW-Darlehen
  private kfWDarlehenSource = new BehaviorSubject<KfWDarlehen>(this.kfWDarlehenOptions[0].value); 
  currentKfWDarlehen$ = this.kfWDarlehenSource.asObservable();

  // Observable for Bank-Darlehen
  private bankDarlehenSource = new BehaviorSubject<BankDarlehen>(this.bankDarlehenOptions[0].value);
  currentBankDarlehen$ = this.bankDarlehenSource.asObservable();

  public setKalkRealzins(data: number) {
    this.kalkRealzinsSource.next(data);
  }

  public setKreditlaufzeit(data: number) {
    this.kreditlaufzeitSource.next(data);
  }

  public setKfWDarlehen(data: KfWDarlehen) {
    this.kfWDarlehenSource.next(data);
  }

  public setBankDarlehen(data: BankDarlehen) {
    this.bankDarlehenSource.next(data);
  }

  constructor() {}
}
