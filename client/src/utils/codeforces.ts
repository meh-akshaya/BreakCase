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

export function getDifficultyRating(diff: string): { rating: number; color: string } {
  switch (diff) {
    case 'Easy':
      return { rating: 800, color: '#808080' };
    case 'Easy/Medium':
      return { rating: 1200, color: '#008000' };
    case 'Medium':
      return { rating: 1400, color: '#03A89E' };
    case 'Medium/Hard':
      return { rating: 1700, color: '#0000FF' };
    case 'Hard':
      return { rating: 2100, color: '#FF8C00' };
    default:
      return { rating: 1000, color: '#808080' };
  }
}
