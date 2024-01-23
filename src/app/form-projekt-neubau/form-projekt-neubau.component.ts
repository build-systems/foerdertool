import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormProjektNeuService } from './form-projekt-neu.service';

@Component({
  selector: 'app-form-projekt-neubau',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-projekt-neubau.component.html',
  styleUrl: './form-projekt-neubau.component.css',
  host: {
    class: 'host-forms',
  },
})
export class FormProjektNeubauComponent implements OnInit {
  // ATTENTION: All form variables are stored at form-projekt.service.ts

  // The reactive forms do two things:
  // Update the bi-directional number fields (input <-> range).
  // Update the form service.

  // Form switches
  // Kellergeschoss and Stellplätze
  public noKellergeschoss: boolean = false;
  public withUserPrice: boolean = false;

  constructor(
    private fb: FormBuilder,
    public formService: FormProjektNeuService
  ) {}

  // Inititalize projekt form
  projektFormNeu!: FormGroup;

  ngOnInit(): void {
    this.projektFormNeu = this.fb.group({
      // These are form controls that go into the html
      userPriceToggle: new FormControl(false),
      userPriceRange: [
        this.formService.userPrice.init, // init
        [
          Validators.min(this.formService.userPrice.min),
          Validators.max(this.formService.userPrice.max),
        ],
      ],
      userPrice: [
        this.formService.userPrice.init, // init
        [
          Validators.min(this.formService.userPrice.min),
          Validators.max(this.formService.userPrice.max),
        ],
      ],
      wohnflaecheRange: [
        // The values come from the FormProjektService
        this.formService.wohnflaeche.init,
        [
          Validators.min(this.formService.wohnflaeche.min),
          Validators.max(this.formService.wohnflaeche.max),
        ],
      ],
      wohnflaeche: [
        this.formService.wohnflaeche.init,
        [
          Validators.min(this.formService.wohnflaeche.min),
          Validators.max(this.formService.wohnflaeche.max),
        ],
      ],
      anzahlWohnungenRange: [
        this.formService.anzahlWohnungen.init,
        [
          Validators.min(this.formService.anzahlWohnungen.min),
          Validators.max(this.formService.anzahlWohnungen.max),
        ],
      ],
      anzahlWohnungen: [
        this.formService.anzahlWohnungen.init,
        [
          Validators.min(this.formService.anzahlWohnungen.min),
          Validators.max(this.formService.anzahlWohnungen.max),
        ],
      ],
      konstruktion: new FormControl(
        this.formService.konstruktion.options[0].value
      ),
      energiestandard: new FormControl(
        this.formService.energiestandard.options[0].value
      ),
      zertifizierung: new FormControl(
        this.formService.zertifizierung.options[0].value
      ),
      // Details
      kellergeschossIn: new FormControl(
        this.formService.kellergeschoss.options[0].value
      ),
      stellplaetzeIn: new FormControl(
        this.formService.stellplaetze.options[0].value
      ),
      aufzugsanlageIn: new FormControl(
        this.formService.aufzugsanlage.options[0].value
      ),
      barrierefreiheitIn: new FormControl(
        this.formService.barrierefreiheit.options[0].value
      ),
      dachbegruenungIn: new FormControl(
        this.formService.dachbegruenung.options[0].value
      ),
      baustellenlogistikIn: new FormControl(
        this.formService.baustellenlogistik.options[0].value
      ),
      aussenanlagenIn: new FormControl(
        this.formService.aussenanlagen.options[0].value
      ),
      grundstuecksbezogeneKostenRange: [
        this.formService.grundstKosten.init,
        [
          Validators.min(this.formService.grundstKosten.min),
          Validators.max(this.formService.grundstKosten.max),
        ],
      ],
      grundstuecksbezogeneKosten: [
        this.formService.grundstKosten.init,
        [
          Validators.min(this.formService.grundstKosten.min),
          Validators.max(this.formService.grundstKosten.max),
        ],
      ],
      baunebenkostenKeinFinRange: [
        this.formService.baunebenkostenKeinFin.init,
        [
          Validators.min(this.formService.baunebenkostenKeinFin.min),
          Validators.max(this.formService.baunebenkostenKeinFin.max),
        ],
      ],
      baunebenkostenKeinFin: [
        this.formService.baunebenkostenKeinFin.init,
        [
          Validators.min(this.formService.baunebenkostenKeinFin.min),
          Validators.max(this.formService.baunebenkostenKeinFin.max),
        ],
      ],
    });

    //User price
    this.projektFormNeu
      .get('userPriceToggle')
      ?.valueChanges.subscribe((value) => {
        this.withUserPrice = value;
        ////////// Needs an observable //////////
      });

    this.projektFormNeu
      .get('userPriceRange')
      ?.valueChanges.subscribe((value) => {
        this.projektFormNeu
          .get('userPrice')
          ?.setValue(value, { emitEvent: false });
        ////////// Needs an observable //////////
      });

    this.projektFormNeu.get('userPrice')?.valueChanges.subscribe((value) => {
      this.projektFormNeu
        .get('userPriceRange')
        ?.setValue(value, { emitEvent: false });
      ////////// Needs an observable //////////
    });

    // Wohnflaeche
    this.projektFormNeu
      .get('wohnflaecheRange')
      ?.valueChanges.subscribe((value) => {
        // Update number input when range input changes
        this.projektFormNeu
          .get('wohnflaeche')
          ?.setValue(value, { emitEvent: false });
        // Also updates the FormProjektService
        this.formService.setWohnflaeche(value);
      });

    this.projektFormNeu.get('wohnflaeche')?.valueChanges.subscribe((value) => {
      // Update range input when number input changes
      this.projektFormNeu
        .get('wohnflaecheRange')
        ?.setValue(value, { emitEvent: false });
      // Also updates the FormProjektService
      this.formService.setWohnflaeche(value);
    });

    // Anzahl WohnungenRange
    this.projektFormNeu
      .get('anzahlWohnungenRange')
      ?.valueChanges.subscribe((value) => {
        // Update number input when range input changes
        this.projektFormNeu
          .get('anzahlWohnungen')
          ?.setValue(value, { emitEvent: false });
        // Also updates the FormProjektService
        this.formService.setAnzahlWohnungen(value);
      });

    this.projektFormNeu
      .get('anzahlWohnungen')
      ?.valueChanges.subscribe((value) => {
        // Update range input when number input changes
        this.projektFormNeu
          .get('anzahlWohnungenRange')
          ?.setValue(value, { emitEvent: false });
        // Also updates the FormProjektService
        this.formService.setAnzahlWohnungen(value);
      });

    // Energiestandard
    this.projektFormNeu
      .get('energiestandard')
      ?.valueChanges.subscribe((value) => {
        // Updates the sanierungService
        this.formService.setEnergiestandard(value);
        // Relationship with Zertifizierung
        const zertifizierung = this.projektFormNeu.get('zertifizierung');
        const konstruktion = this.projektFormNeu.get('konstruktion');
        if (value != 'EH 40') {
          zertifizierung?.setValue('Keine');
          this.formService.zertifizierungDisabled$i.set([false, true, true]);
          this.formService.zertifizierungWarningMessage$i.set(
            '* Zertifizierung ist nur mit EH 40 möglich'
          );
        } else if (value === 'EH 40' && konstruktion?.value === 'Holzbau') {
          this.formService.zertifizierungDisabled$i.set([false, false, false]);
        } else if (
          value === 'EH 40' &&
          konstruktion?.value === 'Konventionell'
        ) {
          this.formService.zertifizierungDisabled$i.set([false, false, true]);
          this.formService.zertifizierungWarningMessage$i.set(
            '* QNG-Zertifizierung ist nur mit Holzbau möglich'
          );
        }
      });

    // Konstruktion
    this.projektFormNeu.get('konstruktion')?.valueChanges.subscribe((value) => {
      // Updates the sanierungService
      this.formService.setKonstruktion(value);
      // Relationship with Zertifizierung
      const energiestandard = this.projektFormNeu.get('energiestandard');
      const zertifizierung = this.projektFormNeu.get('zertifizierung');
      if (value === 'Konventionell' && energiestandard?.value === 'EH 40') {
        if (zertifizierung?.value === 'mit QNG') {
          zertifizierung?.setValue('Keine');
        }
        this.formService.zertifizierungDisabled$i.set([false, false, true]);
        this.formService.zertifizierungWarningMessage$i.set(
          '* QNG-Zertifizierung ist nur mit Holzbau möglich'
        );
      } else if (
        value === 'Konventionell' &&
        energiestandard?.value != 'EH 40'
      ) {
        this.formService.zertifizierungDisabled$i.set([false, true, true]);
      } else if (value === 'Holzbau' && energiestandard?.value === 'EH 40') {
        this.formService.zertifizierungDisabled$i.set([false, false, false]);
      }
    });

    // Zertifizierung
    this.projektFormNeu
      .get('zertifizierung')
      ?.valueChanges.subscribe((value) => {
        // Relationship with Energiestandard and Konstruktion
        const energiestandard = this.projektFormNeu.get('energiestandard');
        const konstruktion = this.projektFormNeu.get('konstruktion');
        this.formService.setZertifizierung(value);
      });

    // Susbscribe to form changes
    this.projektFormNeu
      .get('kellergeschossIn')
      ?.valueChanges.subscribe((value) => {
        this.formService.setKellergeschoss(value);
        // If 'Nicht Vorhanden' is selected, then Tiefgarage is unsellected
        const stellplaetzeIn = this.projektFormNeu.get('stellplaetzeIn');
        if (value === 'Nicht Vorhanden') {
          stellplaetzeIn?.setValue('Garage');
          this.noKellergeschoss = true;
        } else {
          this.noKellergeschoss = false;
        }
      });
    this.projektFormNeu
      .get('stellplaetzeIn')
      ?.valueChanges.subscribe((value) => {
        this.formService.setStellplaetzeIn(value);
        // If 'Tiefgarage' is selected, then 'Nicht Vorhanden' is unsellected
        const kellergeschossIn = this.projektFormNeu.get('kellergeschossIn');
        if (
          value === 'Tiefgarage' &&
          kellergeschossIn?.value === 'Nicht Vorhanden'
        ) {
          kellergeschossIn?.setValue('Vorhanden');
        }
      });
    this.projektFormNeu
      .get('aufzugsanlageIn')
      ?.valueChanges.subscribe((value) => {
        this.formService.setAufzugsanlageIn(value);
      });
    this.projektFormNeu
      .get('barrierefreiheitIn')
      ?.valueChanges.subscribe((value) => {
        this.formService.setBarrierefreiheitIn(value);
      });
    this.projektFormNeu
      .get('dachbegruenungIn')
      ?.valueChanges.subscribe((value) => {
        this.formService.setDachbegruenungIn(value);
      });
    this.projektFormNeu
      .get('baustellenlogistikIn')
      ?.valueChanges.subscribe((value) => {
        this.formService.setBaustellenlogistikIn(value);
      });
    this.projektFormNeu
      .get('aussenanlagenIn')
      ?.valueChanges.subscribe((value) => {
        this.formService.setAussenanlagenIn(value);
      });
    this.projektFormNeu
      .get('grundstuecksbezogeneKostenRange')
      ?.valueChanges.subscribe((value) => {
        this.projektFormNeu
          .get('grundstuecksbezogeneKosten')
          ?.setValue(value, { emitEvent: false });
        this.formService.setGrundstuecksbezogeneKosten(value);
      });
    this.projektFormNeu
      .get('grundstuecksbezogeneKosten')
      ?.valueChanges.subscribe((value) => {
        this.projektFormNeu
          .get('grundstuecksbezogeneKostenRange')
          ?.setValue(value, { emitEvent: false });
        this.formService.setGrundstuecksbezogeneKosten(value);
      });
    this.projektFormNeu
      .get('baunebenkostenKeinFinRange')
      ?.valueChanges.subscribe((value) => {
        this.projektFormNeu
          .get('baunebenkostenKeinFin')
          ?.setValue(value, { emitEvent: false });
        this.formService.setBaunebenkostenKeinFin(value);
      });
    this.projektFormNeu
      .get('baunebenkostenKeinFin')
      ?.valueChanges.subscribe((value) => {
        this.projektFormNeu
          .get('baunebenkostenKeinFinRange')
          ?.setValue(value, { emitEvent: false });
        this.formService.setBaunebenkostenKeinFin(value);
      });
  }

  // Remove focus on enter
  onEnterKey(event: any): void {
    // Call the blur method on the target element to remove focus
    event.target.blur();
  }
}
