export interface SanierungProjekt {
  // Projekt
  wohnflaeche: number;
  anzahlWohnungen: number;
  energiestandard: Energiestandard;
  konstruktion: Konstruktion;
  zertifizierung: Zertifizierung;
  // Sanierung
  worstPerformingBuilding: boolean;
  serielleSanierung: boolean;
  zustandBestand: ZustandBestand;
  eeKlasse: boolean;
  // Dalehen
  kalkRealzins: number;
  kreditlaufzeit: number;
  kfWDarlehen: KfWDarlehen;
  bankDarlehen: BankDarlehen;
  // Output
  tilgungszuschuss: number;
  eeBonus: number;
  nhBonus: number;
  wpbBonus: number;
  serSanBonus: number;
  gestehungskosten: number;
  nrKredit: number;
  sollzinsKfw: number;
  maxKfwKredit: number;
  gesamtgestehungskosten: number;
  foerdersumme: number;
  restsumme: number;
  afKfw: number;
  afBank: number;
  annuitaetKfW: number;
  annuitaetBank: number;
  efKfW: number;
  efBank: number;
  gbAnnuitaet: number;
  gbEfd: number;
  // Zusammenfassung Ergebnisse
  kfwKredit: number;
  kfwKreditM2: number;
  bankKredit: number;
  bankKreditM2: number;
  finanzierungskostenKfw: number;
  finanzierungskostenKfwM2: number;
  finanzierungskostenFinanzmarkt: number;
  finanzierungskostenFinanzmarktM2: number;
  investitionskosten: number;
  investitionskostenM2: number;
  kfwZuschuss: number;
  kfwZuschussM2: number;
  gInvestition: number;
  gInvestitionM2: number;
  gFinanzierung: number;
  gFinanzierungM2: number;
  // Vergleichsrechnung
  ohneKfw: number;
  ohneKfwM2: number;
  mitKfw: number;
  mitKfwM2: number;
}