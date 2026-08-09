export const getAcceptedMeeting = (row) => (row?.negotiation || []).find((item) => item.accepted);

export const timeStringToMinutes = (value) => {
  if (!value || typeof value !== 'string' || !value.includes(':')) return 0;
  const [hours, minutes] = value.split(':').map((item) => Number(item) || 0);
  return (hours * 60) + minutes;
};

export const minutesToTimeString = (value) => {
  const totalMinutes = Number(value);
  if (!Number.isFinite(totalMinutes) || totalMinutes < 0) return '';
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

export const formatMeetingDate = (value) => {
  if (!value) return '—';
  return new Date(value).toLocaleDateString();
};

export const formatMeetingDateTime = (value, minutes) => {
  const dateText = formatMeetingDate(value);
  const timeText = formatMeetingTime(minutes);
  return `${dateText} at ${timeText}`;
};

export const formatMeetingTime = (minutes) => {
  const value = minutesToTimeString(minutes);
  if (!value) return '—';
  const [hours, mins] = value.split(':').map((item) => Number(item) || 0);
  const formattedHour = ((hours + 11) % 12) + 1;
  const suffix = hours >= 12 ? 'PM' : 'AM';
  return `${formattedHour}:${String(mins).padStart(2, '0')} ${suffix}`;
};

export const getMeetingStatusClass = (status) => {
  if (!status) return 'pending';
  return String(status).replace(/\s+/g, '-').toLowerCase();
};
