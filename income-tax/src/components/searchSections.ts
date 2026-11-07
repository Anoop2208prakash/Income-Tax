
export interface SearchSection {
  Section: string;
  title: string;
  chapter: string;
  topic: string;
}

export const searchSections = (
  data: SearchSection[],
  query: string
): SearchSection[] => {
  if (!query.trim()) return data;

  const q = query.toLowerCase().trim();

  return data.filter((item) => {
    return (
      item.Section.toLowerCase().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      item.chapter.toLowerCase().includes(q) ||
      item.topic.toLowerCase().includes(q)
    );
  });
};
