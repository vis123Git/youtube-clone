
// Example JavaScript for handling section visibility
const premiumSection = document.querySelector('.premium-section');
const gamingSection = document.querySelector('.gaming-section');
const liveSection = document.querySelector('.live-section');

premiumSection.style.display = 'none';
gamingSection.style.display = 'none';
liveSection.style.display = 'none';

function toggleSection(section) {
    section.style.display = section.style.display === 'none' ? 'block' : 'none';
}

document.querySelector('.premium-section h2').addEventListener('click', () => toggleSection(premiumSection));
document.querySelector('.gaming-section h2').addEventListener('click', () => toggleSection(gamingSection));
document.querySelector('.live-section h2').addEventListener('click', () => toggleSection(liveSection));
