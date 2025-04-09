// Utility: format grouped credits
function formatCredits({ penciler, inker, colorist }) {
    const roles = [
      { role: 'Pencils', name: penciler },
      { role: 'Inks', name: inker },
      { role: 'Color', name: colorist }
    ];
  
    // Group roles by name
    const nameMap = {};
    roles.forEach(({ role, name }) => {
      if (!nameMap[name]) {
        nameMap[name] = [];
      }
      nameMap[name].push(role);
    });
  
    // Build final credit string
    const creditStrings = [];
    for (const [name, roles] of Object.entries(nameMap)) {
      creditStrings.push(`${roles.join(', ')} by ${name}`);
    }
  
    return creditStrings.join(' · ');
  }
  
  // DOM references
  const gallery = document.getElementById('gallery');
  const shadowbox = document.getElementById('shadowbox');
  const shadowboxImage = document.getElementById('shadowboxImage');
  const shadowboxCredits = document.getElementById('shadowboxCredits');
  const closeShadowbox = document.getElementById('closeShadowbox');
  
  // Build gallery
  coloringGallery.forEach((entry) => {
    const thumbPath = `images/thumbs/${entry.file}`;
    const fullPath = `images/${entry.file}`;
    const creditsText = formatCredits(entry);
  
    // Create image wrapper
    const item = document.createElement('div');
    item.classList.add('gallery-item');
  
    // Create thumbnail image
    const img = document.createElement('img');
    img.src = thumbPath;
    img.alt = "Comic coloring sample";
    img.loading = "lazy";
  
    // Create credit overlay
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.textContent = creditsText;
  
    // Click to open shadowbox
    item.addEventListener('click', () => {
      shadowbox.classList.remove('hidden');
      shadowboxImage.src = fullPath;
      shadowboxCredits.textContent = creditsText;
    });
  
    // Assemble DOM
    item.appendChild(img);
    item.appendChild(overlay);
    gallery.appendChild(item);
  });
  
  // Close shadowbox
  closeShadowbox.addEventListener('click', () => {
    shadowbox.classList.add('hidden');
    shadowboxImage.src = "";
    shadowboxCredits.textContent = "";
  });
  
  // Optional: Close on background click or Esc key
  shadowbox.addEventListener('click', (e) => {
    if (e.target === shadowbox) {
      shadowbox.classList.add('hidden');
      shadowboxImage.src = "";
      shadowboxCredits.textContent = "";
    }
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      shadowbox.classList.add('hidden');
      shadowboxImage.src = "";
      shadowboxCredits.textContent = "";
    }
  });
  