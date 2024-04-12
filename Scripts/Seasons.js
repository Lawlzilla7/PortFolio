// Set the body class based on the current month
let g1, g2;
const currentMonth = new Date().getMonth() + 1;
// Determine the values for --g1 and --g2 based on the current season
// Spring
if (currentMonth >= 3 && currentMonth <= 5) { 
  g1 = '#d4fc79';
  g2 = '#96e6a1';
} 
// Summer
else if (currentMonth >= 6 && currentMonth <= 8) { 
  g1 = '#00c3ff';
  g2 = '#ffff1c';
}
// Autumn 
else if (currentMonth >= 9 && currentMonth <= 11) { 
  g1 = '#fc4a1a';
  g2 = '#f7b733';
} 
// Winter
else { 
  g1 = '#6CAFD9';
  g2 = '#03588C';
}
// Set the values of --g1 and --g2 directly
document.documentElement.style.setProperty('--g1', g1);
document.documentElement.style.setProperty('--g2', g2);