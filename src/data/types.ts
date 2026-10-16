// مدل داده علمی ویتامین‌نامه
// همه مقادیر عددی در «واحد مرجع» هر ویتامین ذخیره می‌شوند (فیلد unit در VitaminProfile).

export type VitaminKey =
  | 'A' | 'D' | 'E' | 'K' | 'C'
  | 'B1' | 'B2' | 'B3' | 'B5' | 'B6' | 'B7' | 'B9' | 'B12';

export type Sex = 'male' | 'female';
export type PhysStatus = 'none' | 'pregnant' | 'lactating';

export type LifeStageKey =
  | 'inf0' | 'inf7' | 'c1' | 'c4'
  | 'm9' | 'm14' | 'm19' | 'm31' | 'm51' | 'm71'
  | 'f9' | 'f14' | 'f19' | 'f31' | 'f51' | 'f71'
  | 'p14' | 'p19' | 'p31'
  | 'l14' | 'l19' | 'l31';

export type StageTable = Partial<Record<LifeStageKey, number | null>>;

/** نوع مقدار توصیه‌شده در هر گروه سنی */
export type RecType = 'RDA' | 'AI';

export interface DriSet {
  key: VitaminKey;
  /** مقدار توصیه‌شده (RDA یا AI) */
  rec: StageTable;
  /** گروه‌هایی که مقدار rec آن‌ها AI است (اگر همه AI باشند allAI=true) */
  allAI?: boolean;
  ear?: StageTable;
  ul?: StageTable;
  /** دامنه شمول UL: چه منابعی در مقایسه با UL شمرده می‌شوند */
  ulScope: 'total' | 'preformed' | 'supplemental' | 'synthetic' | 'none';
  /** ضریب تغییرات نیاز (CV) برای روش احتمال کفایت — IOM 2000 */
  cvRequirement: number;
  /** فرض ضریب تغییرات روزبه‌روز دریافت درون‌فردی (برآورد تقریبی، فقط برای نمایش عدم قطعیت) */
  cvWithin: number;
}

export interface EfsaAdult {
  key: VitaminKey;
  type: 'PRI' | 'AI';
  male?: number | null;
  female?: number | null;
  pregnant?: number | null;
  lactating?: number | null;
  ul?: number | null;
  ulNoteFa?: string;
  noteFa?: string;
  year: string;
}

export type EvidenceLevel = 'strong' | 'moderate' | 'limited' | 'conflicting' | 'unproven';

export interface EvidenceItem {
  claim: string;
  level: EvidenceLevel;
  note: string;
}

export interface SourceRef {
  title: string;
  org: string;
  url: string;
}

export interface LabMarker {
  id: string;
  nameFa: string;
  nameEn: string;
  units: { id: string; label: string; toCanonical: number }[]; // ضریب تبدیل به واحد canonical (اول لیست)
  bands: { max: number; status: 'deficient' | 'low' | 'adequate' | 'high'; labelFa: string }[]; // در واحد canonical، صعودی
  caveats: string[];
  source: SourceRef;
}

export interface VitaminProfile {
  key: VitaminKey;
  slug: string;
  nameFa: string;
  nameEn: string;
  shortFa: string; // نام کوتاه نمایشی
  aliases: string[];
  solubility: 'fat' | 'water';
  unit: string; // واحد مرجع
  unitFa: string;
  unitNote?: string;
  hue: number; // رنگ شناسه ویتامین
  summary: string;
  forms: { name: string; note: string }[];
  classification: string;
  functions: string[];
  metabolism: { absorption: string; transport: string; storage: string; excretion: string };
  bioavailability: string[];
  deficiency: { riskGroups: string[]; signs: string[]; assessment: string[] };
  toxicity: { summary: string; signs: string[]; riskFactors: string[] };
  clinical: string[];
  interactionsSummary: string[];
  intakeStrategies: string[];
  supplements: { forms: string[]; labelNotes: string[]; cautions: string[] };
  evidence: EvidenceItem[];
  labs?: string[]; // id نشانگرهای آزمایشگاهی
  sources: SourceRef[];
  lastReviewed: string; // ISO
  confidence: 'high' | 'moderate' | 'low';
}

export interface Food {
  id: string;
  nameFa: string;
  nameEn: string;
  group: 'animal' | 'dairy' | 'fish' | 'veg' | 'fruit' | 'legume' | 'nut' | 'grain' | 'fat' | 'fortified';
  animal: boolean; // منشأ حیوانی؛ ویتامین A آن (و غذاهای غنی‌شده) از نوع از پیش ساخته فرض می‌شود
  fortified?: boolean;
  folicAcid?: number; // µg اسید فولیک سنتتیک در ۱۰۰ گرم (غذای غنی‌شده)
  serving: { g: number; labelFa: string };
  per100: Partial<Record<VitaminKey, number>>;
  noteFa?: string;
}

export type InteractionSeverity = 'major' | 'moderate' | 'minor';

export interface Interaction {
  id: string;
  agentFa: string;
  agentEn: string;
  kind: 'drug' | 'nutrient' | 'lab' | 'condition';
  vitamins: VitaminKey[];
  severity: InteractionSeverity;
  effect: string;
  mechanism: string;
  management: string;
  source: SourceRef;
  keywords: string[];
}
