interface GramSabhaRecord {
  year: number;
  date: string;
  membersPresent: number;
  membersAbsent: number;
  remarks: string;
}

interface UpdateGramSabhaRecord {
  year: number;
  records: GramSabhaRecord[];
}

export type { GramSabhaRecord, UpdateGramSabhaRecord };