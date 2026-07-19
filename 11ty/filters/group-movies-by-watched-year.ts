type Movie = {
  watched?: string;
  [key: string]: unknown;
};

type MovieWithWatchDate = Movie & {
  watchedDate: string | null;
  watchedDisplay: string | null;
};

type MovieGroup = {
  year: number | null;
  movies: MovieWithWatchDate[];
};

function parseWatchedDate(watched?: string) {
  const match = watched?.match(/^(\d{2})\.(\d{2})\.(\d{4})/);

  if (!match) {
    return null;
  }

  const [, day, month, year] = match;

  return {
    display: `${day}.${month}`,
    iso: `${year}-${month}-${day}`,
    timestamp: Date.UTC(Number(year), Number(month) - 1, Number(day)),
    year: Number(year)
  };
}

export function groupMoviesByWatchedYear(movies: Movie[] = []): MovieGroup[] {
  const groups = new Map<number | null, Array<MovieWithWatchDate & { watchedTimestamp: number }>>();

  for (const movie of movies) {
    const watchedDate = parseWatchedDate(movie.watched);
    const year = watchedDate?.year ?? null;
    const group = groups.get(year) ?? [];

    group.push({
      ...movie,
      watchedDate: watchedDate?.iso ?? null,
      watchedDisplay: watchedDate?.display ?? null,
      watchedTimestamp: watchedDate?.timestamp ?? 0
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
      movies: group
        .sort(
          (firstMovie, secondMovie) => secondMovie.watchedTimestamp - firstMovie.watchedTimestamp
        )
        .map(({ watchedTimestamp: _watchedTimestamp, ...movie }) => movie)
    }));
}
