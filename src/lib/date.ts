import { format,  } from 'date-fns'

export const formatFullDate = (date: Date) => {
  return format(date, "dd MMM yyyy");
};

export const formatMagazineDate = (date: Date) => {
  return format(date, "MMM d, yyyy").toUpperCase();
};

