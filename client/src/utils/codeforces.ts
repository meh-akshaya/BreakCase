export interface CFRatingInfo {
  title: string;
  className: string;
  color: string;
  bgColor: string;
}

export function getCFRatingInfo(rating: number): CFRatingInfo {
  if (rating < 1200) {
    return { title: 'Newbie', className: 'user-gray', color: '#808080', bgColor: '#F0F0F0' };
  } else if (rating < 1400) {
    return { title: 'Pupil', className: 'user-green', color: '#008000', bgColor: '#E6F4ED' };
  } else if (rating < 1600) {
    return { title: 'Specialist', className: 'user-cyan', color: '#03A89E', bgColor: '#E0F7F6' };
  } else if (rating < 1900) {
    return { title: 'Expert', className: 'user-blue', color: '#0000FF', bgColor: '#E6EEFF' };
  } else if (rating < 2100) {
    return { title: 'Candidate Master', className: 'user-purple', color: '#AA00AA', bgColor: '#F5E6FF' };
  } else if (rating < 2400) {
    return { title: 'Master', className: 'user-orange', color: '#FF8C00', bgColor: '#FFF3E0' };
  } else {
    return { title: 'Grandmaster', className: 'user-red', color: '#FF0000', bgColor: '#FFE6E6' };
  }
}

export function getDifficultyRating(diff: string, ratingValue?: number): { rating: number; color: string; tier: string } {
  const rating = ratingValue || (
    diff === 'Easy' ? 800 :
    diff === 'Easy/Medium' ? 1100 :
    diff === 'Medium' ? 1400 :
    diff === 'Medium/Hard' ? 1600 :
    diff === 'Hard' ? 1900 : 1000
  );

  if (rating < 1200) {
    return { rating, color: '#808080', tier: 'Newbie' };
  } else if (rating < 1400) {
    return { rating, color: '#008000', tier: 'Pupil' };
  } else if (rating < 1600) {
    return { rating, color: '#03A89E', tier: 'Specialist' };
  } else if (rating < 1900) {
    return { rating, color: '#0000FF', tier: 'Expert' };
  } else if (rating < 2100) {
    return { rating, color: '#AA00AA', tier: 'Candidate Master' };
  } else if (rating < 2400) {
    return { rating, color: '#FF8C00', tier: 'Master' };
  } else {
    return { rating, color: '#FF0000', tier: 'Grandmaster' };
  }
}
