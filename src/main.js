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
  },
  {
    title: 'Drone Video Mapper',
    description: 'A web application for processing, analyzing, and mapping geospatial drone video footage on interactive maps.',
    url: 'https://drone-mapper-app.blake-simon.com/'
  },
  {
    title: '3D Coastal Flood Visualizer',
    description: 'A high-performance 3D geospatial web application for simulating sea-level rise and real-time flood impacts on property parcels with interactive 3D terrain and Google Street View integration.',
    url: 'https://3d-flood-viz.blake-simon.com/'
  },
  {
    title: 'Stop Sign Detection & Tracking System',
    description: 'Real-time computer vision and deep learning system built to detect, track, and log stop sign compliance from recorded driving video.',
    videoUrl: '/assets/videos/stop_sign_demo.mp4',
    isVideo: true
  }
];

function setupModalListeners() {
  const modal = document.getElementById('video-modal');
  const backdrop = document.getElementById('video-modal-backdrop');
  const closeBtn = document.getElementById('video-modal-close');
  const videoPlayer = document.getElementById('modal-video-player');

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    if (videoPlayer) {
      videoPlayer.pause();
      videoPlayer.currentTime = 0;
    }
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

function openVideoModal(title, videoSrc) {
  const modal = document.getElementById('video-modal');
  const modalTitle = document.getElementById('video-modal-title');
  const videoPlayer = document.getElementById('modal-video-player');

  if (!modal || !videoPlayer) return;

  if (modalTitle) modalTitle.textContent = title;
  videoPlayer.src = videoSrc;

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');

  videoPlayer.play().catch((err) => {
    console.log('Autoplay prevented:', err);
  });
}

function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  projects.forEach((project, index) => {
    const delay = index * 0.15;
    
    if (project.isVideo) {
      const card = document.createElement('div');
      card.className = 'project-card project-card-video';
      card.style.animation = `fadeInDown 0.8s ease-out ${delay}s both`;
      
      const tagsHTML = project.tags
        ? `<div class="project-tags">${project.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>`
        : '';

      card.innerHTML = `
        <div class="project-media-wrapper">
          <video 
            src="${project.videoUrl}" 
            autoplay 
            loop 
            muted 
            playsinline 
            class="project-video-preview"
          ></video>
          <div class="project-media-overlay">
            <div class="play-badge">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <polygon points="5,3 19,12 5,21"></polygon>
              </svg>
            </div>
          </div>
        </div>
        <div class="project-card-content">
          ${tagsHTML}
          <h3 class="project-title">${project.title}</h3>
          <p class="project-desc">${project.description}</p>
          <div class="project-link-text">
            Watch Video Demo
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        openVideoModal(project.title, project.videoUrl);
      });

      grid.appendChild(card);
    } else {
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
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  setupModalListeners();
});
