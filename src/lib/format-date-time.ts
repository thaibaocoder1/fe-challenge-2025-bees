export const formatDateTime = (dateString: Date) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const formattedDate: string = `${year}-${month}-${day}`;

  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    month: 'short',
    year: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  };
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    year: 'numeric',
    day: 'numeric',
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  };
  const formattedDateTime: string = new Date(dateString).toLocaleString('en-US', dateTimeOptions);
  const formattedDateOnly: string = new Date(dateString).toLocaleString('en-US', dateOptions);
  const formattedTimeOnly: string = new Date(dateString).toLocaleString('en-US', timeOptions);
  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDateOnly,
    timeOnly: formattedTimeOnly,
    registrationDate: formattedDate,
  };
};
