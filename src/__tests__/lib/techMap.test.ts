import {
  resumeTechList,
  techCategoryGroups,
  techIconMap,
} from '@/lib/shared/techMap';

describe('techMap data integrity', () => {
  describe('techIconMap', () => {
    it('has at least 20 entries', () => {
      expect(Object.keys(techIconMap).length).toBeGreaterThanOrEqual(20);
    });

    it('every value is a function (React component)', () => {
      for (const [_label, icon] of Object.entries(techIconMap)) {
        expect(typeof icon).toBe('function');
      }
    });
  });

  describe('techCategoryGroups', () => {
    it('has all expected categories', () => {
      expect(Object.keys(techCategoryGroups)).toEqual(
        expect.arrayContaining([
          'frontend',
          'backend',
          'database',
          'design',
          'tools',
        ]),
      );
    });

    it('every label in every category exists in techIconMap', () => {
      const missing: string[] = [];
      for (const [category, labels] of Object.entries(techCategoryGroups)) {
        for (const label of labels) {
          if (!(label in techIconMap)) {
            missing.push(`${category}/${label}`);
          }
        }
      }
      expect(missing).toEqual([]);
    });

    it('has no empty categories', () => {
      for (const [_category, labels] of Object.entries(techCategoryGroups)) {
        expect(labels.length).toBeGreaterThan(0);
      }
    });
  });

  describe('resumeTechList', () => {
    it('has at least 20 entries', () => {
      expect(resumeTechList.length).toBeGreaterThanOrEqual(20);
    });

    it('every label exists in techIconMap', () => {
      const missing = resumeTechList.filter((label) => !(label in techIconMap));
      expect(missing).toEqual([]);
    });

    it('has no duplicates', () => {
      const unique = new Set(resumeTechList);
      expect(unique.size).toBe(resumeTechList.length);
    });
  });
});
