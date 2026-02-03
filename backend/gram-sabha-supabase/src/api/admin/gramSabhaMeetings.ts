import * as service from '@/services/gramSabhaMeetingsService';

// Thin server-side wrappers intended to be used by admin routes
export const createMeeting = async (meeting: service.Meeting) => {
  // server-side validation
  if (!meeting.year || !meeting.meeting_number || !meeting.meeting_date || !meeting.agenda) {
    throw new Error('Missing required fields');
  }
  return await service.createMeeting(meeting);
};

export const updateMeeting = async (id: string, updates: Partial<service.Meeting>) => {
  if (!id) throw new Error('Missing id');
  return await service.updateMeeting(id, updates);
};

export const deleteMeeting = async (id: string) => {
  if (!id) throw new Error('Missing id');
  return await service.deleteMeeting(id);
};

export const getAllMeetings = async () => {
  return await service.fetchAllMeetings();
};

export const getMeetingsByYear = async (year: number) => {
  if (!year) throw new Error('Missing year');
  return await service.fetchMeetingsByYear(year);
};
