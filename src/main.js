import './style.css'

const projects = [
  {
    title: 'Lynchburg Parcels LLM Dashboard',
    description: 'An AI-powered dashboard for querying, analyzing, and visualizing Lynchburg parcel data using natural language.',
    url: 'https://lynchburg-parcels-llm-dashboard.blake-simon.com'
  },
  {
    title: 'Lynchburg Parcels Voice Dashboard',
    description: 'An interactive GIS dashboard featuring in-browser voice querying built purely with Vanilla JavaScript for hands-free parcel data exploration.',
    url: 'https://lynchburg-parcels-voice-dashboard.blake-simon.com'
  }
];

function renderProjects() {
  const grid = document.getElementById('projects-grid');
  
  projects.forEach((project, index) => {
    // Add a staggered delay to the animation
    const delay = index * 0.15;
    
    const card = document.createElement('a');
    card.href = project.url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.className = 'project-card';
    card.style.animation = `fadeInDown 0.8s ease-out ${delay}s both`;
    
    card.innerHTML = `
      <h3 class="project-title">${project.title}</h3>
      <p class="project-desc">${project.description}</p>
      <div class="project-link-text">
        View Project
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </div>
    `;
    
    grid.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', renderProjects);
