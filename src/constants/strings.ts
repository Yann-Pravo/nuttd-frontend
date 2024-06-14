export const welcomeText = [
  'one nut a day, keeps the doctor away',
  // 'la bourse ou la vie',
  'your will will never feel blue again',
  'crack one without touching the other',
  'crack nuts or die tryin’',
  'feeling better empty',
];

export const getRandomWelcomeText = () =>
  welcomeText[Math.floor(Math.random() * welcomeText.length)];
