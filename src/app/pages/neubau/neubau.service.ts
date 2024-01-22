import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, skipWhile } from 'rxjs';
import { NeubauProjekt } from '../../shared/neubauprojekt';
import { neubau } from '../../shared/constants';
import { FormProjektNeuService } from '../../form-projekt-neubau/form-projekt-neu.service';
import { FormDarlehenService } from '../../form-darlehen/form-darlehen.service';
import { NavigationEnd, Router } from '@angular/router';
import { DashboardOutput } from '../../dashboard-output';

@Injectable({
  providedIn: 'root',
})
export class NeubauService {
  // Project parameters
  wohnflaeche = this.formProjektNeuService.wohnflaeche.init;
  anzahlWohnungen = this.formProjektNeuService.anzahlWohnungen.init;
  energiestandard: EnergiestandardNeubau =
    this.formProjektNeuService.energiestandard.options[0].value;
  konstruktion: Konstruktion =
    this.formProjektNeuService.konstruktion.options[0].value;
  zertifizierung: ZertifizierungNeubau =
    this.formProjektNeuService.zertifizierung.options[0].value;

  // Neubau form parameters
  kellergeschossIn: Kellergeschoss =
    this.formProjektNeuService.kellergeschoss.options[0].value;
  stellplaetzeIn: Stellplaetze =
    this.formProjektNeuService.stellplaetze.options[0].value;
  aufzugsanlageIn: Aufzugsanlage =
    this.formProjektNeuService.aufzugsanlage.options[0].value;
  barrierefreiheitIn: BarrierefreiesBauen =
    this.formProjektNeuService.barrierefreiheit.options[0].value;
  dachbegruenungIn: Dachbegruenung =
    this.formProjektNeuService.dachbegruenung.options[0].value;
  baustellenlogistikIn: Baustellenlogistik =
    this.formProjektNeuService.baustellenlogistik.options[0].value;
  aussenanlagenIn: Aussenanlagen =
    this.formProjektNeuService.aussenanlagen.options[0].value;
  grundstuecksbezogeneKosten: number =
    this.formProjektNeuService.grundstKosten.init;
  baunebenkostenKeinFin: number =
    this.formProjektNeuService.baunebenkostenKeinFin.init;

  // Darlehen parameters
  kalkRealzins = this.formDarlehenService.kalkRealzins.init;
  kreditlaufzeit: number = this.formDarlehenService.kreditlaufzeit.init;
  kfWDarlehen: KfWDarlehen =
    this.formDarlehenService.kfWDarlehenOptions[0].value;
  bankDarlehen: BankDarlehen =
    this.formDarlehenService.bankDarlehenOptions[0].value;

  // Router link
  currentRoute!: string;
  neubauRoute = '/neubau';

  constructor(
    private constants: neubau,
    private formProjektNeuService: FormProjektNeuService,
    private formDarlehenService: FormDarlehenService,
    private router: Router
  ) {
    router.events.subscribe((val) => {
      // Check for changes on the url
      if (val instanceof NavigationEnd) {
        // Then assign the url as a string
        this.currentRoute = this.router.url.toString();
      }
    });

    // Subscribe to Projekt Form parameter and update after every change
    this.formProjektNeuService.currentWohnflaeche$
      .pipe(
        // Don't do anything until the user changes one of the forms
        skipWhile((value) => value === this.wohnflaeche),
        // Don't do anything unless the Router is in the neubau page
        filter(() => this.currentRoute === this.neubauRoute)
      )
      .subscribe((value) => {
        this.wohnflaeche = value;
        this.update();
      });

    this.formProjektNeuService.currentAnzahlWohnungen$
      .pipe(
        skipWhile((value) => value === this.anzahlWohnungen),
        filter(() => this.currentRoute === this.neubauRoute)
      )
      .subscribe((value) => {
        this.anzahlWohnungen = value;
        this.update();
      });

    this.formProjektNeuService.currentEnergiestandard$
      .pipe(
        skipWhile((value) => value === this.energiestandard),
        filter(() => this.currentRoute === this.neubauRoute)
      )
      .subscribe((value) => {
        this.energiestandard = value;
        this.update();
      });

    this.formProjektNeuService.currentKonstruktion$
      .pipe(
        skipWhile((value) => value === this.konstruktion),
        filter(() => this.currentRoute === this.neubauRoute)
      )
      .subscribe((value) => {
        this.konstruktion = value;
        this.update();
      });

    this.formProjektNeuService.currentZertifizierung$
      .pipe(
        skipWhile((value) => value === this.zertifizierung),
        filter(() => this.currentRoute === this.neubauRoute)
      )
      .subscribe((value) => {
        this.zertifizierung = value;
        this.update();
      });

    // Subscribe to all Neubau Form parameters and update after every change
    this.formProjektNeuService.currentKellergeschoss$
      .pipe(skipWhile((value) => value === this.kellergeschossIn))
      .subscribe((value) => {
        this.kellergeschossIn = value;
        this.update();
      });
    this.formProjektNeuService.currentStellplaetze$
      .pipe(skipWhile((value) => value === this.stellplaetzeIn))
      .subscribe((value) => {
        this.stellplaetzeIn = value;
        this.update();
      });
    this.formProjektNeuService.currentAufzugsanlage$
      .pipe(skipWhile((value) => value === this.aufzugsanlageIn))
      .subscribe((value) => {
        this.aufzugsanlageIn = value;
        this.update();
      });
    this.formProjektNeuService.currentBarriereFreiheit$
      .pipe(skipWhile((value) => value === this.barrierefreiheitIn))
      .subscribe((value) => {
        this.barrierefreiheitIn = value;
        this.update();
      });
    this.formProjektNeuService.currentDachbegruenun$
      .pipe(skipWhile((value) => value === this.dachbegruenungIn))
      .subscribe((value) => {
        this.dachbegruenungIn = value;
        this.update();
      });
    this.formProjektNeuService.currentBaustellenlogistik$
      .pipe(skipWhile((value) => value === this.baustellenlogistikIn))
      .subscribe((value) => {
        this.baustellenlogistikIn = value;
        this.update();
      });
    this.formProjektNeuService.currentAussenanlage$
      .pipe(skipWhile((value) => value === this.aussenanlagenIn))
      .subscribe((value) => {
        this.aussenanlagenIn = value;
        this.update();
      });
    this.formProjektNeuService.currentGrundstuecksbezogeneKosten$
      .pipe(skipWhile((value) => value === this.grundstuecksbezogeneKosten))
      .subscribe((value) => {
        this.grundstuecksbezogeneKosten = value;
        this.update();
      });
    this.formProjektNeuService.currentBaunebenkostenKeinFin$
      .pipe(skipWhile((value) => value === this.baunebenkostenKeinFin))
      .subscribe((value) => {
        this.baunebenkostenKeinFin = value;
        this.update();
      });

    // Subscribe to all Darlehen Form parameters and update after every change
    this.formDarlehenService.currentKalkRealzins$
      .pipe(
        // Don't do anything until the user changes one of the forms
        skipWhile((value) => value === this.kalkRealzins),
        // Don't do anything unless the Router is in the neubau page
        filter(() => this.currentRoute === this.neubauRoute)
      )
      .subscribe((value) => {
        this.kalkRealzins = value;
        this.update();
      });

    this.formDarlehenService.currentKreditlaufzeit$
      .pipe(
        skipWhile((value) => value === this.kreditlaufzeit),
        filter(() => this.currentRoute === this.neubauRoute)
      )
      .subscribe((value) => {
        this.kreditlaufzeit = value;
        this.update();
      });

    this.formDarlehenService.currentKfWDarlehen$
      .pipe(
        skipWhile((value) => value === this.kfWDarlehen),
        filter(() => this.currentRoute === this.neubauRoute)
      )
      .subscribe((value) => {
        this.kfWDarlehen = value;
        this.update();
      });

    this.formDarlehenService.currentBankDarlehen$
      .pipe(
        skipWhile((value) => value === this.bankDarlehen),
        filter(() => this.currentRoute === this.neubauRoute)
      )
      .subscribe((value) => {
        this.bankDarlehen = value;
        this.update();
      });

    this.update();
  }

  // Formulas
  // #01
  // Neubau output
  private _kellergeschossOut = this.constants.kellerVorhanden;
  private updateKellergeschossOut() {
    if (this.kellergeschossIn === 'Vorhanden') {
      this._kellergeschossOut = this.constants.kellerVorhanden;
    } else {
      this._kellergeschossOut = 0;
    }
  }

  private _stellplaetzeOut = this.constants.stellplaetze.tiefgarage;
  private updateStellplaetzeOut() {
    if (this.stellplaetzeIn === 'Garage') {
      this._stellplaetzeOut = this.constants.stellplaetze.garage;
    } else if (this.stellplaetzeIn === 'Parkpalette') {
      this._stellplaetzeOut = this.constants.stellplaetze.parkpalette;
    } else if (this.stellplaetzeIn === 'Tiefgarage') {
      this._stellplaetzeOut = this.constants.stellplaetze.tiefgarage;
    } else {
      this._stellplaetzeOut = 0;
    }
  }

  private _redGarageOut = this.constants.redGarage;
  private updateRedGarageOut() {
    if (
      this.kellergeschossIn === 'Vorhanden' &&
      this.stellplaetzeIn === 'Tiefgarage'
    ) {
      this._redGarageOut = this.constants.redGarage;
    } else {
      this._redGarageOut = 0;
    }
  }

  private _aufzugsanlageOut = this.constants.aufzugsanlageVorhanden;
  private updateAufzugsanlageOut() {
    if (this.aufzugsanlageIn === 'Vorhanden') {
      this._aufzugsanlageOut = this.constants.aufzugsanlageVorhanden;
    } else {
      this._aufzugsanlageOut = 0;
    }
  }

  private _barrierefreiheitOut = this.constants.barriere.reduziert;
  private updateBarrierefreiheitOut() {
    if (this.barrierefreiheitIn === 'Barrierereduziert') {
      this._barrierefreiheitOut = this.constants.barriere.reduziert;
    } else if (this.barrierefreiheitIn === 'Barrierefrei') {
      this._barrierefreiheitOut = this.constants.barriere.frei;
    } else if (this.barrierefreiheitIn === 'Barrierefrei (R)') {
      this._barrierefreiheitOut = this.constants.barriere.reduziertR;
    } else {
      this._barrierefreiheitOut = 0;
    }
  }

  private _dachbegruenungOut = this.constants.dachbegruenungVorhanden;
  private updateDachbegruenungOut() {
    if (this.dachbegruenungIn === 'Vorhanden') {
      this._dachbegruenungOut = this.constants.dachbegruenungVorhanden;
    } else {
      this._dachbegruenungOut = 0;
    }
  }

  private _baustellenlogistikOut = this.constants.baustellenlogistikVorhanden;
  private updateBaustellenlogistikOut() {
    if (this.baustellenlogistikIn === 'Vorhanden') {
      this._baustellenlogistikOut = this.constants.baustellenlogistikVorhanden;
    } else {
      this._baustellenlogistikOut = 0;
    }
  }

  private _aussenanlagenOut = this.constants.aussenanlagen.gering;
  private updateAussenanlagenOut() {
    if (this.aussenanlagenIn === 'Gering') {
      this._aussenanlagenOut = this.constants.aussenanlagen.gering;
    } else if (this.aussenanlagenIn === 'Mittel') {
      this._aussenanlagenOut = this.constants.aussenanlagen.mittel;
    } else if (this.aussenanlagenIn === 'Hoch') {
      this._aussenanlagenOut = this.constants.aussenanlagen.hoch;
    } else {
      this._aussenanlagenOut = this.constants.aussenanlagen.gering;
    }
  }

  private _energetischerStandardOut = 0;
  private updateEnergetischerStandard() {
    if (this.energiestandard === 'EH 40') {
      this._energetischerStandardOut =
        this.constants.energetischerStandardPrice.EH40;
    } else if (this.energiestandard === 'GEG') {
      this._energetischerStandardOut =
        this.constants.energetischerStandardPrice.EH55;
    } else if (this.energiestandard === 'EH 70') {
      this._energetischerStandardOut =
        this.constants.energetischerStandardPrice.EH70;
    // } else if (this.energiestandard === 'EH 85') {
      // this._energetischerStandardOut =
        // this.constants.energetischerStandardPrice.EH85;
    } else {
      this._energetischerStandardOut = 0;
    }
  }

  // #02
  // Gestehungskosten [€/m²]
  private _gestehungskosten = 0;
  private updateGestehungskosten() {
    this._gestehungskosten =
      this.constants.gestehungskostenBase +
      this._kellergeschossOut +
      this._stellplaetzeOut +
      this._redGarageOut +
      this._aufzugsanlageOut +
      this._barrierefreiheitOut +
      this._dachbegruenungOut +
      this._baustellenlogistikOut +
      this._energetischerStandardOut +
      this._aussenanlagenOut +
      this.grundstuecksbezogeneKosten +
      this.baunebenkostenKeinFin;
  }

  // NR-Kredit [%]
  private _nrKredit = this.constants.nrKredit.lessThan10;
  private updateNrKredit() {
    if (this.kreditlaufzeit < 10) {
      this._nrKredit = this.constants.nrKredit.lessThan10;
    } else if (this.kreditlaufzeit >= 10 && this.kreditlaufzeit <= 25) {
      this._nrKredit = this.constants.nrKredit.between10And25;
    } else {
      this._nrKredit = this.constants.nrKredit.moreThan25;
    }
  }

  // Sollzins KFW [%]
  private _sollzinsKfw = 0;
  private updateSollzinsKfw() {
    if (this.kfWDarlehen === 'Endfälliges') {
      this._sollzinsKfw = this.constants.sollzinsKfw_Endfälliges;
    } else if (this.kfWDarlehen === 'Annuitäten') {
      this._sollzinsKfw = this._nrKredit;
    }
  }

  // Gesamtgestehungskosten [€]
  private _gesamtgestehungskosten = this._gestehungskosten * this.wohnflaeche;
  private updateGesamtgestehungskosten() {
    this._gesamtgestehungskosten = this._gestehungskosten * this.wohnflaeche;
  }

  // How will the formula look like with the new class? (keine, ohne QNG Siegel, mit QNG Siegel)
  //=IF(AND(B7="keine Zertifizierung";B5="EH 40");100000*B4;IF(AND(B7="QNG";B5="EH 40");150000*B4;0))
  // KfW-Kredit [€]
  private _kfwKredit = 0;
  private updateKfwKredit() {
    if (
      this.zertifizierung === 'ohne QNG' &&
      this.energiestandard === 'EH 40'
    ) {
      this._kfwKredit =
        this.constants.kfwKreditLimit.lower * this.anzahlWohnungen;
    } else if (
      this.zertifizierung === 'mit QNG' &&
      this.energiestandard === 'EH 40'
    ) {
      this._kfwKredit =
        this.constants.kfwKreditLimit.higher * this.anzahlWohnungen;
    } else if (this.zertifizierung === 'Keine') {
      this._kfwKredit = 0;
    }
  }

  // Restsumme [€]
  private _restsumme =
    this.wohnflaeche * this._gestehungskosten - this._kfwKredit;
  private updateRestsumme() {
    if (this.konstruktion === 'Holzbau') {
      this._restsumme =
        (this.wohnflaeche *
          this._gestehungskosten *
          this.constants.restsummeHolzbau -
        this._kfwKredit) * this.constants.safetyMultiplier;
    } else {
      this._restsumme =
        (this.wohnflaeche * this._gestehungskosten - this._kfwKredit) * this.constants.safetyMultiplier;
    }
    // Make sure it doesn't go negative
    this._restsumme = this._restsumme < 0 ? 0 : this._restsumme;
  }

  // #03
  // AF KFW [€]
  private _afKfw = 0;
  private updateAfKfW() {
    this._afKfw =
      ((this._sollzinsKfw / 100) *
        Math.pow(1 + this._sollzinsKfw / 100, this.kreditlaufzeit)) /
      (Math.pow(1 + this._sollzinsKfw / 100, this.kreditlaufzeit) - 1);
  }

  // AF Bank [€]
  private _afBank = 0;
  private updateAfBank() {
    this._afBank =
      ((this.kalkRealzins / 100) *
        Math.pow(1 + this.kalkRealzins / 100, this.kreditlaufzeit)) /
      (Math.pow(1 + this.kalkRealzins / 100, this.kreditlaufzeit) - 1);
  }

  // Annuität KfW [€]
  private _annuitaetKfW = 0;
  private updateAnnuitaetKfw() {
    this._annuitaetKfW = this._afKfw * this._kfwKredit;
  }

  // Annuität Bank [€]
  private _annuitaetBank = 0;
  private updateAnnuitaetBank() {
    this._annuitaetBank = this._restsumme * this._afBank;
  }

  // EF KFW [€]
  private _efKfW = 0;
  private updateEfKfw() {
    this._efKfW =
      ((this._kfwKredit * this._sollzinsKfw) / 100) * this.kreditlaufzeit;
  }

  // EF Bank [€]
  private _efBank = 0;
  private updateEfBank() {
    this._efBank =
      ((this.kalkRealzins * this._restsumme) / 100) * this.kreditlaufzeit;
  }

  // Bank-Kredit [€]
  private _bankKredit = 0;
  private updateBankKredit() {
    this._bankKredit = this._restsumme;
  }

  // Finanzierungskosten (KfW) [€]
  private _finanzierungskostenKfw = 0;
  private updateFinanzierungskostenKfw() {
    if (this.kfWDarlehen === 'Annuitäten') {
      this._finanzierungskostenKfw =
        this._annuitaetKfW * this.kreditlaufzeit - this._kfwKredit;
    } else if (this.kfWDarlehen === 'Endfälliges') {
      this._finanzierungskostenKfw = this._efKfW;
    }
  }

  // Finazierungskosten (Finanzmarkt) [€]
  private _finanzierungskostenFinanzmarkt = 0;
  private updateFinanzierungskostenFinanzmarkt() {
    if (this.bankDarlehen === 'Annuitäten') {
      this._finanzierungskostenFinanzmarkt =
        this._annuitaetBank * this.kreditlaufzeit - this._bankKredit;
    } else if (this.bankDarlehen === 'Endfälliges') {
      this._finanzierungskostenFinanzmarkt = this._efBank;
    }
  }

  // Investitionskosten [€]
  private _investitionskosten = 0;
  private updateInvestitionskosten() {
    this._investitionskosten = this.wohnflaeche * this._gestehungskosten;
  }

  // #04
  // GB: Annuität [€]
  private _gbAnnuitaet = 0;
  private updateGbAnnuitaet() {
    this._gbAnnuitaet =
      (this._kfwKredit + this._restsumme) * this._afBank * this.kreditlaufzeit -
      (this._kfwKredit + this._restsumme);
  }

  // GB: EFD [€]
  private _gbEfd = 0;
  private updateGbEfd() {
    this._gbEfd =
      ((this.kalkRealzins * (this._kfwKredit + this._restsumme)) / 100) *
      this.kreditlaufzeit;
  }

  // Option 1: ohne KfW [€]
  private _ohneKfw = 0;
  private updateOhneKfw() {
    if (this.bankDarlehen === 'Endfälliges') {
      this._ohneKfw = this._gbEfd;
    } else {
      this._ohneKfw = this._gbAnnuitaet;
    }
  }

  // Option 2: mit KfW [€]
  private _mitKfw = 0;
  private updateMitKfw() {
    this._mitKfw =
      this._finanzierungskostenKfw + this._finanzierungskostenFinanzmarkt;
  }

  // Gesamtkosten
  private _gInvestition = 0;
  private updateGInvestition() {
    this._gInvestition = this._investitionskosten;
  }

  private _gFinanzierung = 0;
  private updateGFinanzierung() {
    this._gFinanzierung =
      this._kfwKredit +
      this._bankKredit +
      this._finanzierungskostenKfw +
      this._finanzierungskostenFinanzmarkt;
  }

  private _kfwKreditM2 = 0;
  private updateKfwKreditM2() {
    this._kfwKreditM2 = this._kfwKredit / this.wohnflaeche;
  }

  private _bankKreditM2 = 0;
  private updateBankKreditM2() {
    this._bankKreditM2 = this._bankKredit / this.wohnflaeche;
  }

  private _finanzierungskostenKfwM2 = 0;
  private updateFinanzierungskostenKfwM2() {
    this._finanzierungskostenKfwM2 =
      this._finanzierungskostenKfw / this.wohnflaeche;
  }

  private _finanzierungskostenFinanzmarktM2 = 0;
  private updateFinanzierungskostenFinanzmarktM2() {
    this._finanzierungskostenFinanzmarktM2 =
      this._finanzierungskostenFinanzmarkt / this.wohnflaeche;
  }

  private _investitionskostenM2 = 0;
  private updateInvestitionskostenM2() {
    this._investitionskostenM2 = this._investitionskosten / this.wohnflaeche;
  }

  private _gInvestitionM2 = 0;
  private updateGInvestitionM2() {
    this._gInvestitionM2 = this._gInvestition / this.wohnflaeche;
  }

  private _gFinanzierungM2 = 0;
  private updateGFinanzierungM2() {
    this._gFinanzierungM2 = this._gFinanzierung / this.wohnflaeche;
  }

  private _ohneKfwM2 = 0;
  private updateOhneKfwM2() {
    this._ohneKfwM2 = this._ohneKfw / this.wohnflaeche;
  }

  private _mitKfwM2 = 0;
  private updateMitKfwM2() {
    this._mitKfwM2 = this._mitKfw / this.wohnflaeche;
  }

  // I am creating one output observable for Sanierung and one for Neubau to input in the dashboard
  outputDashboard!: DashboardOutput;
  private outputDashboardSource = new BehaviorSubject<DashboardOutput>(
    this.outputDashboard
  );
  currentOutputDashboard$ = this.outputDashboardSource.asObservable();

  // Neubau Output to be used in the Save and Export
  outputNeubau!: NeubauProjekt;
  private outputNeubauSource = new BehaviorSubject<NeubauProjekt>(
    this.outputNeubau
  );
  currentOutputNeubau$ = this.outputNeubauSource.asObservable();

  update() {
    this.updateKellergeschossOut();
    this.updateStellplaetzeOut();
    this.updateRedGarageOut();
    this.updateAufzugsanlageOut();
    this.updateBarrierefreiheitOut();
    this.updateDachbegruenungOut();
    this.updateBaustellenlogistikOut();
    this.updateAussenanlagenOut();
    this.updateEnergetischerStandard();
    this.updateGestehungskosten();
    this.updateNrKredit();
    this.updateSollzinsKfw();
    this.updateGesamtgestehungskosten();
    this.updateKfwKredit();
    this.updateKfwKreditM2();
    this.updateRestsumme();
    this.updateAfKfW();
    this.updateAfBank();
    this.updateAnnuitaetKfw();
    this.updateAnnuitaetBank();
    this.updateEfKfw();
    this.updateEfBank();
    this.updateBankKredit();
    this.updateBankKreditM2();
    this.updateFinanzierungskostenKfw();
    this.updateFinanzierungskostenKfwM2();
    this.updateFinanzierungskostenFinanzmarkt();
    this.updateFinanzierungskostenFinanzmarktM2();
    this.updateInvestitionskosten();
    this.updateInvestitionskostenM2();
    this.updateGbAnnuitaet();
    this.updateGbEfd();
    this.updateOhneKfw();
    this.updateOhneKfwM2();
    this.updateMitKfw();
    this.updateMitKfwM2();
    this.updateGInvestition();
    this.updateGInvestitionM2();
    this.updateGFinanzierung();
    this.updateGFinanzierungM2();

    this.outputDashboardSource.next(
      (this.outputDashboard = {
        typ: 'Neubau',
        // Dalehen
        kreditlaufzeit: this.kreditlaufzeit,
        kfWDarlehen: this.kfWDarlehen,
        bankDarlehen: this.bankDarlehen,
        // Zusammenfassung Ergebnisse
        annuitaetKfW: this._annuitaetKfW,
        annuitaetBank: this._annuitaetBank,
        efKfW: this._efKfW,
        efBank: this._efBank,
        kfwKredit: this._kfwKredit,
        kfwKreditM2: this._kfwKreditM2,
        bankKredit: this._bankKredit,
        bankKreditM2: this._bankKreditM2,
        finanzierungskostenKfw: this._finanzierungskostenKfw,
        finanzierungskostenKfwM2: this._finanzierungskostenKfwM2,
        finanzierungskostenFinanzmarkt: this._finanzierungskostenFinanzmarkt,
        finanzierungskostenFinanzmarktM2:
          this._finanzierungskostenFinanzmarktM2,
        investitionskosten: this._investitionskosten,
        investitionskostenM2: this._investitionskostenM2,
        kfwZuschuss: 0,
        kfwZuschussM2: 0,
        ohneKfw: this._ohneKfw,
        ohneKfwM2: this._ohneKfwM2,
        mitKfw: this._mitKfw,
        mitKfwM2: this._mitKfwM2,
      })
    );

    this.outputNeubauSource.next(
      (this.outputNeubau = {
        // Projekt
        wohnflaeche: this.wohnflaeche,
        anzahlWohnungen: this.anzahlWohnungen,
        energiestandard: this.energiestandard,
        konstruktion: this.konstruktion,
        zertifizierung: this.zertifizierung,
        // Neubau input
        kellergeschossIn: this.kellergeschossIn,
        stellplaetzeIn: this.stellplaetzeIn,
        aufzugsanlageIn: this.aufzugsanlageIn,
        barrierefreiheitIn: this.barrierefreiheitIn,
        dachbegruenungIn: this.dachbegruenungIn,
        baustellenlogistikIn: this.baustellenlogistikIn,
        aussenanlagenIn: this.aussenanlagenIn,
        grundstuecksbezogeneKosten: this.grundstuecksbezogeneKosten,
        baunebenkostenKeinFin: this.baunebenkostenKeinFin,
        // Neubau output
        kellergeschossOut: this._kellergeschossOut,
        stellplaetzeOut: this._stellplaetzeOut,
        redGarageOut: this._redGarageOut,
        aufzugsanlageOut: this._aufzugsanlageOut,
        barrierefreiheitOut: this._barrierefreiheitOut,
        dachbegruenungOut: this._dachbegruenungOut,
        baustellenlogistikOut: this._baustellenlogistikOut,
        aussenanlagenOut: this._aussenanlagenOut,
        energetischerStandard: this._energetischerStandardOut,
        // Dalehen
        kalkRealzins: this.kalkRealzins,
        kreditlaufzeit: this.kreditlaufzeit,
        kfWDarlehen: this.kfWDarlehen,
        bankDarlehen: this.bankDarlehen,
        // Output
        gestehungskosten: this._gestehungskosten,
        nrKredit: this._nrKredit,
        sollzinsKfw: this._sollzinsKfw,
        gesamtgestehungskosten: this._gesamtgestehungskosten,
        restsumme: this._restsumme,
        afKfw: this._afKfw,
        afBank: this._afBank,
        annuitaetKfW: this._annuitaetKfW,
        annuitaetBank: this._annuitaetBank,
        efKfW: this._efKfW,
        efBank: this._efBank,
        gbAnnuitaet: this._gbAnnuitaet,
        gbEfd: this._gbEfd,
        // Zusammenfassung Ergebnisse
        kfwKredit: this._kfwKredit,
        kfwKreditM2: this._kfwKreditM2,
        bankKredit: this._bankKredit,
        bankKreditM2: this._bankKreditM2,
        finanzierungskostenKfw: this._finanzierungskostenKfw,
        finanzierungskostenKfwM2: this._finanzierungskostenKfwM2,
        finanzierungskostenFinanzmarkt: this._finanzierungskostenFinanzmarkt,
        finanzierungskostenFinanzmarktM2:
          this._finanzierungskostenFinanzmarktM2,
        investitionskosten: this._investitionskosten,
        investitionskostenM2: this._investitionskostenM2,
        gInvestition: this._gInvestition,
        gInvestitionM2: this._gInvestitionM2,
        gFinanzierung: this._gFinanzierung,
        gFinanzierungM2: this._gFinanzierungM2,
        // Vergleichsrechnung
        ohneKfw: this._ohneKfw,
        ohneKfwM2: this._ohneKfwM2,
        mitKfw: this._mitKfw,
        mitKfwM2: this._mitKfwM2,
      })
    );
  }

  // Reset was created to make sure the outputs match the form values
  // After doing some changes, going to another route, and then coming back,
  // the outputs in the services were the same while the forms had reset to default values.
  // Another solution would be to restore the previous values in the forms. But that would require more work.
  // The main problem is that the forms are being reused across different projects/routes
  // So it would require either separating the forms, or identifying the current route in each form
  // to then assign the form values from the service(neubau / sanierung).
  reset() {
    // Project parameters
    this.wohnflaeche = this.formProjektNeuService.wohnflaeche.init;
    this.anzahlWohnungen = this.formProjektNeuService.anzahlWohnungen.init;
    this.energiestandard =
      this.formProjektNeuService.energiestandard.options[0].value;
    this.konstruktion =
      this.formProjektNeuService.konstruktion.options[0].value;
    this.zertifizierung =
      this.formProjektNeuService.zertifizierung.options[0].value;

    // Neubau form parameters
    this.kellergeschossIn =
      this.formProjektNeuService.kellergeschoss.options[0].value;
    this.stellplaetzeIn =
      this.formProjektNeuService.stellplaetze.options[0].value;
    this.aufzugsanlageIn =
      this.formProjektNeuService.aufzugsanlage.options[0].value;
    this.barrierefreiheitIn =
      this.formProjektNeuService.barrierefreiheit.options[0].value;
    this.dachbegruenungIn =
      this.formProjektNeuService.dachbegruenung.options[0].value;
    this.baustellenlogistikIn =
      this.formProjektNeuService.baustellenlogistik.options[0].value;
    this.aussenanlagenIn =
      this.formProjektNeuService.aussenanlagen.options[0].value;
    this.grundstuecksbezogeneKosten =
      this.formProjektNeuService.grundstKosten.init;
    this.baunebenkostenKeinFin =
      this.formProjektNeuService.baunebenkostenKeinFin.init;

    // Darlehen parameters
    this.kalkRealzins = this.formDarlehenService.kalkRealzins.init;
    this.kreditlaufzeit = this.formDarlehenService.kreditlaufzeit.init;
    this.kfWDarlehen = this.formDarlehenService.kfWDarlehenOptions[0].value;
    this.bankDarlehen = this.formDarlehenService.bankDarlehenOptions[0].value;

    this.update();
  }
}
