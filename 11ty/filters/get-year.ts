function getYear(value: string | number | Date): string {
  return String(new Date(value).getFullYear());
}

export { getYear };
