/**
 * Experience. Titles, organisations and dates are from the CV (CV/main.tex
 * lines 92–112). The home page shows `summary`; the About page (Phase 4) adds
 * the full detail from docs/content-plan.md §5.5.
 *
 * Wording: the two internship summaries are the owner's own text from the old
 * site, unchanged. The current role had no text on the old site, so its
 * summary is taken from the CV. See docs/review-checklist.md.
 */
export interface Role {
  title: string;
  organisation: string;
  /** Display string, as on the CV. */
  dates: string;
  summary: string;
}

export const experience: Role[] = [
  {
    title: 'Software Development Engineer',
    organisation: 'Amadeus IT Group',
    dates: 'Sep 2024 – present',
    // From CV/main.tex:94 (no old-site text exists for this role).
    summary:
      'Primary technical contact for ~50 airline clients on self-service check-in; I gather requirements, then design, build and ship features.',
  },
  {
    title: 'Software Development Intern',
    organisation: 'Amadeus IT Group',
    dates: 'Apr 2023 – Oct 2023',
    // Old site, legacy/src/components/Experience/Professional/Amadeus.tsx:13-17 (two sentences, unchanged).
    summary:
      'I was in charge of developing two powerful internal tools for use by the company. These tools saved several hundred hours of manual labour and were used by several teams across the company.',
  },
  {
    title: 'Software Engineer Intern',
    organisation: 'Jacobs',
    dates: 'Jul 2019 – Aug 2019',
    // Old site, legacy/src/components/Experience/Professional/Jacobs.tsx:10-11 (unchanged).
    summary:
      'In summer 2019 at 17, I worked with Jacobs for a month as a Software Engineering intern. This was my first experience working in a professional environment and I learnt a lot about the industry.',
  },
];
