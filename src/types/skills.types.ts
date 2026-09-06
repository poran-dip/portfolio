interface Skill {
  /** Canonical display name, e.g. "Next.js" */
  name: string;
  /** Lowercase alternate spellings/abbreviations for fuzzy matching, e.g. ["nextjs", "next"] */
  aliases?: string[];
}

export interface SkillCategoryEntry {
  id: string;
  title: string;
  skills: Skill[];
}
