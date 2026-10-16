#!/usr/bin/env node
/**
 * واردسازی و تطبیق مقادیر ویتامین غذاها از USDA FoodData Central
 *
 * کاربرد:
 *   FDC_API_KEY=xxxx node scripts/import-fdc.mjs "Spinach, cooked, boiled" "Egg, whole, cooked, hard-boiled"
 *   FDC_API_KEY=xxxx node scripts/import-fdc.mjs --compare      ← مقایسه همه غذاهای src/data/foods.ts با FDC
 *
 * کلید رایگان: https://fdc.nal.usda.gov/api-key-signup  (کلید را هرگز در مخزن کد قرار ندهید)
 * مجوز داده: CC0 1.0 — لطفاً «USDA FoodData Central» را به‌عنوان منبع ذکر کنید.
 * محدودیت: ۱۰۰۰ درخواست در ساعت برای هر کلید.
 */
import { readFile } from 'node:fs/promises';

const KEY = process.env.FDC_API_KEY;
if (!KEY) {
  console.error('FDC_API_KEY تنظیم نشده است. یک کلید رایگان از https://fdc.nal.usda.gov/api-key-signup بگیرید.');
  process.exit(1);
}

// شناسه مواد مغذی FDC → کلید ویتامین در پروژه (واحدها با واحدهای پروژه یکسان‌اند)
const NUTRIENTS = {
  1106: 'A',   // Vitamin A, RAE (µg)
  1114: 'D',   // Vitamin D (D2 + D3) (µg)
  1109: 'E',   // Vitamin E (alpha-tocopherol) (mg)
  1185: 'K',   // Vitamin K (phylloquinone) (µg)
  1162: 'C',   // Vitamin C (mg)
  1165: 'B1',  // Thiamin (mg)
  1166: 'B2',  // Riboflavin (mg)
  1167: 'B3',  // Niacin (mg)
  1170: 'B5',  // Pantothenic acid (mg)
  1175: 'B6',  // Vitamin B-6 (mg)
  1176: 'B7',  // Biotin (µg)
  1190: 'B9',  // Folate, DFE (µg)
  1178: 'B12', // Vitamin B-12 (µg)
};

async function search(query) {
  const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${KEY}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, dataType: ['SR Legacy', 'Foundation'], pageSize: 1 }),
  });
  if (res.status === 429) throw new Error('سقف درخواست‌ها پر شده است؛ یک ساعت بعد دوباره امتحان کنید.');
  if (!res.ok) throw new Error(`FDC ${res.status}`);
  const json = await res.json();
  const food = json.foods?.[0];
  if (!food) return null;
  const per100 = {};
  for (const n of food.foodNutrients ?? []) {
    const k = NUTRIENTS[n.nutrientId];
    if (k && typeof n.value === 'number') per100[k] = Math.round(n.value * 100) / 100;
  }
  return { fdcId: food.fdcId, description: food.description, dataType: food.dataType, per100 };
}

async function compare() {
  const src = await readFile(new URL('../src/data/foods.ts', import.meta.url), 'utf8');
  const re = /id: '([^']+)'[^]*?nameEn: '([^']+)'[^]*?per100: \{([^}]*)\}/g;
  let m;
  while ((m = re.exec(src))) {
    const [, id, nameEn, body] = m;
    const local = Object.fromEntries([...body.matchAll(/(\w+): ([\d.]+)/g)].map((x) => [x[1], +x[2]]));
    const fdc = await search(nameEn);
    if (!fdc) { console.log(`✗ ${id}: در FDC پیدا نشد`); continue; }
    const diffs = Object.keys(NUTRIENTS).map((n) => NUTRIENTS[n]).filter((k) => local[k] !== undefined && fdc.per100[k] !== undefined)
      .map((k) => ({ k, local: local[k], fdc: fdc.per100[k], pct: fdc.per100[k] ? Math.abs(local[k] - fdc.per100[k]) / fdc.per100[k] : 0 }))
      .filter((d) => d.pct > 0.15);
    console.log(`${diffs.length ? '⚠' : '✓'} ${id} ← FDC ${fdc.fdcId} «${fdc.description}»`);
    for (const d of diffs) console.log(`    ${d.k}: محلی ${d.local} | FDC ${d.fdc}  (${Math.round(d.pct * 100)}٪ اختلاف)`);
  }
}

const args = process.argv.slice(2);
if (args[0] === '--compare') await compare();
else for (const q of args) console.log(JSON.stringify(await search(q), null, 2));
