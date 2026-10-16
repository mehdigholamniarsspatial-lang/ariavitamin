import type { SourceRef } from './types';

export const ods = (slug: string, fa: string): SourceRef => ({
  title: `${fa} — برگه اطلاعات برای متخصصان سلامت`,
  org: 'NIH Office of Dietary Supplements (آمریکا)',
  url: `https://ods.od.nih.gov/factsheets/${slug}-HealthProfessional/`,
});

export const lpi = (slug: string, fa: string): SourceRef => ({
  title: `${fa} — مرکز اطلاعات ریزمغذی‌ها`,
  org: 'Linus Pauling Institute, Oregon State University',
  url: `https://lpi.oregonstate.edu/mic/vitamins/${slug}`,
});

export const EFSA_DRV: SourceRef = {
  title: 'DRV Finder — مقادیر مرجع رژیمی اروپا',
  org: 'European Food Safety Authority (EFSA)',
  url: 'https://multimedia.efsa.europa.eu/drvs/index.htm',
};

export const ODS_RECS: SourceRef = {
  title: 'Nutrient Recommendations and Databases (جداول DRI)',
  org: 'NIH Office of Dietary Supplements',
  url: 'https://ods.od.nih.gov/HealthInformation/nutrientrecommendations.aspx',
};

export const USDA_DRI_CALC: SourceRef = {
  title: 'DRI Calculator for Healthcare Professionals',
  org: 'USDA National Agricultural Library',
  url: 'https://www.nal.usda.gov/human-nutrition-and-food-safety/dri-calculator',
};

export const FDC: SourceRef = {
  title: 'FoodData Central',
  org: 'USDA Agricultural Research Service',
  url: 'https://fdc.nal.usda.gov/',
};

export const IOM_ASSESS: SourceRef = {
  title: 'DRIs: Applications in Dietary Assessment (2000)',
  org: 'Institute of Medicine / National Academies Press',
  url: 'https://nap.nationalacademies.org/catalog/9956',
};

export const WHO_FOLATE: SourceRef = {
  title: 'Serum and red blood cell folate concentrations for assessing folate status in populations (2015)',
  org: 'World Health Organization (VMNIS)',
  url: 'https://www.who.int/publications/i/item/WHO-NMH-NHD-EPG-15.01',
};

export const WHO_RETINOL: SourceRef = {
  title: 'Serum retinol concentrations for determining the prevalence of vitamin A deficiency (2011)',
  org: 'World Health Organization (VMNIS)',
  url: 'https://www.who.int/publications/i/item/WHO-NMH-NHD-MNM-11.3',
};

export const MEDLINE: SourceRef = {
  title: 'Vitamins — MedlinePlus',
  org: 'U.S. National Library of Medicine',
  url: 'https://medlineplus.gov/vitamins.html',
};
