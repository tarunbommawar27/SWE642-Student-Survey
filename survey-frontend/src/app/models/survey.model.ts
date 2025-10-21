export type InterestSource = 'FRIENDS'|'TELEVISION'|'INTERNET'|'OTHER';
export type RecommendLikelihood = 'VERY_LIKELY'|'LIKELY'|'UNLIKELY';

export interface Survey {
  id?: number;
  firstName: string;
  lastName: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  telephone: string;
  email: string;
  dateOfSurvey: string; // yyyy-mm-dd
  likedMost: string[];
  interestSource: InterestSource;
  recommendLikelihood: RecommendLikelihood;
  comments?: string;
}
