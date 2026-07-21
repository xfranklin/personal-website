type Book = {
  read?: string;
  [key: string]: unknown;
};

type BookWithReadDate = Book & {
  readDate: string | null;
  readDisplay: string | null;
};

type BookGroup = {
  year: number | null;
  books: BookWithReadDate[];
};

function parseReadDate(read?: string) {
  const match = read?.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!match) return null;

  const [, day, month, year] = match;

  return {
    display: `${day}.${month}`,
    iso: `${year}-${month}-${day}`,
    timestamp: Date.UTC(Number(year), Number(month) - 1, Number(day)),
    year: Number(year)
  };
}

export function groupBooksByReadYear(books: Book[] = []): BookGroup[] {
  const groups = new Map<number | null, Array<BookWithReadDate & { readTimestamp: number }>>();

  for (const book of books) {
    const readDate = parseReadDate(book.read);
    const year = readDate?.year ?? null;
    const group = groups.get(year) ?? [];

    group.push({
      ...book,
      readDate: readDate?.iso ?? null,
      readDisplay: readDate?.display ?? null,
      readTimestamp: readDate?.timestamp ?? 0
    });
    groups.set(year, group);
  }

  return [...groups.entries()]
    .sort(([firstYear], [secondYear]) => {
      if (firstYear === null) return 1;
      if (secondYear === null) return -1;

      return secondYear - firstYear;
    })
    .map(([year, group]) => ({
      year,
      books: group
        .sort((firstBook, secondBook) => secondBook.readTimestamp - firstBook.readTimestamp)
        .map(({ readTimestamp: _readTimestamp, ...book }) => book)
    }));
}
