export type TransmissionMetadata = {
  date: string;
  time: string;
  day: string;
  chapter: number;
  id: string;
};

export type TransmissionContent = {
  metadata: TransmissionMetadata;
  content: string[];
};

export type Transmission = {
  date: string;
  time: string;
  path: string;
  preview: string;
  chapter: number;
};

export type Chapter = {
  number: number;
  title: string;
  transmissions: Transmission[];
};