// scripts/portfolio.js

// Demo data for 4 pieces
const portfolioData = [
  {
    title: "Storyboard: Ride into the city",
    thumbs: [
      {
        src: "images/portfolio/dr_ride1_board.jpg",
        alt: "Dr. Ride Board",
        description: "Storyboard for a film project. Linked roughs show the concept’s progression. See the storyboard section for more in this sequence and other work like this.",
        linkType: "storyboard"
      },
      {
        src: "images/portfolio/ds_lobby_roughs.jpg",
        alt: "DS Lobby Roughs",
        description: "Rough sketches for the same project as I was developing ideas for the later progressions.",
        linkType: "storyboard"
      }
    ]
  },
  {
    title: "Comic page: Unexpected visitors",
    thumbs: [
      {
        src: "images/portfolio/E01_22_ink.jpg",
        alt: "EE01 Inks",
        description: "Inked comic book page. Compare pencils and roughs to see the evolution. See more pages in the Comic section.",
        linkType: "comic"
      },
      {
        src: "images/portfolio/E01_22_pencil.jpg",
        alt: "EE01 Pencils",
        description: "Pencil stage of the comic page.",
        linkType: "comic"
      },
      {
        src: "images/portfolio/E01_22_rough.jpg",
        alt: "EE01 Roughs",
        description: "Early rough layouts for the page.",
        linkType: "comic"
      }
    ]
  },
  {
    title: "Storyboard: Secure entry",
    thumbs: [
      {
        src: "images/portfolio/ds_tallboard_web.jpg",
        alt: "DS Tallboard",
        description: "A storyboard item for a film project. See the storyboard section for more in this sequence and other work like this.",
        linkType: "storyboard"
      },
      {
        src: "images/portfolio/ds_roughs.jpg",
        alt: "DS Roughs",
        description: "Early rough sketches for this scene.",
        linkType: "storyboard"
      }
    ]
  },
  {
    title: "Comic page: Flight",
    thumbs: [
      {
        src: "images/portfolio/gg_pg11_inks.jpg",
        alt: "GG Page 11 Inks",
        description: "Inked comic page. See the included icons to see development. See the comic section for more like this.",
        linkType: "comic"
      },
      {
        src: "images/portfolio/gg_pg11_color.jpg",
        alt: "GG Pg11 Color",
        description: "Color version to show final look.",
        linkType: "comic"
      },
      {
        src: "images/portfolio/gg_pg11_pencils.jpg",
        alt: "GG Pg11 Pencils",
        description: "Penciled layout prior to inking.",
        linkType: "comic"
      },
      {
        src: "images/portfolio/gg_pg11_rough.jpg",
        alt: "GG Pg11 Rough",
        description: "Rough sketch version.",
        linkType: "comic"
      },
      {
        src: "images/portfolio/gg_bella.jpg",
        alt: "GG Bella Sketch",
        description: "Character sketch for Bella.",
        linkType: "comic"
      }
    ]
  }
];

const shadowbox       = document.getElementById('shadowbox');
const shadowboxTitle  = document.getElementById('shadowboxTitle');
const shadowboxThumbs = document.getElementById('shadowboxThumbs');
const shadowboxMainImg= document.getElementById('shadowboxMainImg');
const shadowboxDescription = document.getElementById('shadowboxDescription');
const shadowboxMoreLink   = document.getElementById('shadowboxMoreLink');
const closeBtn        = document.getElementById('closeBtn');
const zoomBtn         = document.getElementById('zoomBtn');
const navDots         = document.getElementById('navDots');

let currentItemIndex  = 0;
let currentThumbIndex = 0;

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  // Make the portfolio columns clickable
  const columns = document.querySelectorAll('.portfolio-column');
  columns.forEach((col) => {
    col.addEventListener('click', () => {
      currentItemIndex = parseInt(col.dataset.index, 10);
      openShadowbox(currentItemIndex, 0); // start with the first thumb
    });
  });

  // Create nav dots for the 4 items
  portfolioData.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.addEventListener('click', () => {
      openShadowbox(i, 0);
    });
    navDots.appendChild(dot);
  });
});

// Open the shadowbox for a given item
function openShadowbox(itemIdx, thumbIdx) {
  currentItemIndex  = itemIdx;
  currentThumbIndex = thumbIdx;

  // Show shadowbox
  shadowbox.classList.add('show');

  // Update dots
  updateNavDots();

  // Load item data
  const itemData = portfolioData[currentItemIndex];
  shadowboxTitle.textContent = itemData.title;

  // Populate thumbs
  populateThumbs(itemData.thumbs);

  // Display the first (or specified) thumb
  showThumb(currentThumbIndex);

  // Scroll shadowbox to top
  shadowbox.scrollTop = 0;

  // Reset zoom states
  shadowboxMainImg.classList.remove('fit-view');
  shadowboxMainImg.classList.add('default-view');
  zoomBtn.textContent = "Fit Image";
}

// Mark active dot
function updateNavDots() {
  [...navDots.children].forEach((dot, i) => {
    dot.classList.toggle('active', i === currentItemIndex);
  });
}

// Populate the thumbnail column
function populateThumbs(thumbs) {
  shadowboxThumbs.innerHTML = '';
  thumbs.forEach((th, i) => {
    const imgEl = document.createElement('img');
    imgEl.src = th.src;
    imgEl.alt = th.alt;
    imgEl.addEventListener('click', () => {
      currentThumbIndex = i;
      showThumb(i);
    });
    shadowboxThumbs.appendChild(imgEl);
  });
}

// Show a particular thumb as main
function showThumb(idx) {
  const itemData = portfolioData[currentItemIndex];
  const thumbData = itemData.thumbs[idx];

  // Mark active thumb
  const thumbImgs = shadowboxThumbs.querySelectorAll('img');
  thumbImgs.forEach((img, i) => {
    img.classList.toggle('active-thumb', i === idx);
  });

  // Set main image, description
  shadowboxMainImg.src = thumbData.src;
  shadowboxMainImg.alt = thumbData.alt;
  shadowboxDescription.textContent = thumbData.description || "";

  // Link to storyboards/comics
  let linkHtml = "";
  if (thumbData.linkType === "storyboard") {
    linkHtml = '<a href="storyboards.html">See More Storyboards</a>';
  } else if (thumbData.linkType === "comic") {
    linkHtml = '<a href="comics.html">See More Comics</a>';
  }
  shadowboxMoreLink.innerHTML = linkHtml;

  // Reset zoom each time we switch images
  shadowboxMainImg.classList.remove('fit-view');
  shadowboxMainImg.classList.add('default-view');
  zoomBtn.textContent = "Fit Entire Image";
}

// Close button
closeBtn.addEventListener('click', () => {
  shadowbox.classList.remove('show');
});

// Zoom toggle
zoomBtn.addEventListener('click', () => {
  if (shadowboxMainImg.classList.contains('default-view')) {
    // Switch to "fit entire image"
    shadowboxMainImg.classList.remove('default-view');
    shadowboxMainImg.classList.add('fit-view');
    zoomBtn.textContent = "Default View";
  } else {
    // Switch back to default
    shadowboxMainImg.classList.remove('fit-view');
    shadowboxMainImg.classList.add('default-view');
    zoomBtn.textContent = "Fit Entire Image";
  }
});
