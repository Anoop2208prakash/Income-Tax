
interface Annexure {
  Section: string;
  title: string;
  pdf: string;
}

interface Chapter {
  chapter: string;
  topic: string;
  annexure: Annexure[];
}

export interface Section {
  chapter: string;
  topic: string;
  Section: string;
  title: string;
  pdf: string;
}

export const getAllSections = (chapters: Chapter[]): Section[] => {
  return chapters.flatMap((chapter) =>
    chapter.annexure.map((sec) => ({
      chapter: chapter.chapter,
      topic: chapter.topic,
      Section: sec.Section,
      title: sec.title,
      pdf: sec.pdf,
    }))
  );
};
