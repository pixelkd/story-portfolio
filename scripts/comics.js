// scripts/comics.js

/*************************************************
 * Data Structure for the 7 comic sequences
 *************************************************/
const comicsData = [
  {
    title: "Evil Apple Invasion",
    description: "An evil apple plans to cross dimensions, threatening our world.",
    boards: [
      {
        src: "images/comics/appleOfEvile_01.jpg",
        alt: "Evil Apple Page 1"
      },
      {
        src: "images/comics/appleOfEvile_02.jpg",
        alt: "Evil Apple Page 2"
      }
    ]
  },
  {
    title: "Lucy Returns Home",
    description: "Selected pages from Halloween-Man. Lucy returns home to regroup, only to find more trouble than she planned for.",
    boards: [
      {
        src: "images/comics/E01_20_ink.jpg",
        alt: "Lucy Returns - Page 1"
      },
      {
        src: "images/comics/E01_22_ink.jpg",
        alt: "Lucy Returns - Page 2"
      }
    ]
  },
  {
    title: "Lucy’s Evil Doppelganger",
    description: "Sequential pages from Halloween-Man. Lucy's evil doppelganger senses her presence and sends a minion to intercept.",
    boards: [
      {
        src: "images/comics/E2_18.jpg",
        alt: "E2_18"
      },
      {
        src: "images/comics/E2_19.jpg",
        alt: "E2_19"
      },
      {
        src: "images/comics/E2_20.jpg",
        alt: "E2_20"
      },
      {
        src: "images/comics/E2_21.jpg",
        alt: "E2_21"
      }
    ]
  },
  {
    title: "Cult Leader’s Escape",
    description: "A cult leader flees with a spellbook, but doesn't get far...",
    boards: [
      {
        src: "images/comics/gg_pg11_inks.jpg",
        alt: "Cult Leader Board"
      }
    ]
  },
  {
    title: "Anniversary Issue Page",
    description: "Selected page from a Halloween-Man anniversary issue.",
    boards: [
      {
        src: "images/comics/page0008.jpg",
        alt: "Anniversary Issue - Page 8"
      }
    ]
  },
  {
    title: "Spinosaurus Vampiric Encounter",
    description: "A spinosaurus takes down its prey, only to be turned by a vampire for his own ends.",
    boards: [
      {
        src: "images/comics/v_p14.jpg",
        alt: "Vampire Dino - Page 14"
      },
      {
        src: "images/comics/v_p15.jpg",
        alt: "Vampire Dino - Page 15"
      },
      {
        src: "images/comics/v_p16.jpg",
        alt: "Vampire Dino - Page 16"
      }
    ]
  },
  {
    title: "The Wurst",
    description: "\"Funny animal\" comic. Two bad dogs try to enjoy Wurst Fest, but an unexpected visitor catches one off guard.",
    boards: [
      {
        src: "images/comics/WurstFest_01_lrg.jpg",
        alt: "The Wurst - Page"
      }
    ]
  }
];

/*************************************************
 * DOM References
 *************************************************/
const shadowbox       = document.getElementById('shadowbox');
const lightboxTitle   = document.getElementById('lightboxTitle');
const lightboxThumbs  = document.getElementById('lightboxThumbs');
const lightboxBoards  = document.getElementById('lightboxBoards');
const lightboxDesc    = document.getElementById('lightboxDescription');
const closeBtn        = document.getElementById('closeBtn');
const zoomBtn         = document.getElementById('zoomBtn');

let currentSequenceIndex = 0;
let observer = null; // IntersectionObserver reference

document.addEventListener('DOMContentLoaded', () => {
  // Make row tiles clickable
  const boards = document.querySelectorAll('.primary-board, .secondary-board');
  boards.forEach(boardEl => {
    boardEl.addEventListener('click', () => {
      const seqIdx   = parseInt(boardEl.dataset.sequenceIndex, 10);
      const boardIdx = parseInt(boardEl.dataset.boardIndex, 10);
      openLightbox(seqIdx, boardIdx);
    });
  });
});

/*************************************************
 * openLightbox: Build 3-column layout & scroll
 *************************************************/
function openLightbox(seqIdx, boardIdx) {
  currentSequenceIndex = seqIdx;
  const seqData = comicsData[seqIdx];

  // Show the shadowbox
  shadowbox.classList.add('show');

  // Set Title & Description
  lightboxTitle.textContent = seqData.title;
  lightboxDesc.textContent   = seqData.description || "";

  // Clear previous content
  lightboxThumbs.innerHTML = '';
  lightboxBoards.innerHTML = '';

  // Destroy old observer if any
  if (observer) {
    observer.disconnect();
  }

  // Build new boards & thumbs
  seqData.boards.forEach((board, i) => {
    // Thumbnails (left column)
    const thumbImg = document.createElement('img');
    thumbImg.src = board.src;
    thumbImg.alt = board.alt;
    thumbImg.addEventListener('click', () => {
      scrollToBoard(i);
    });
    lightboxThumbs.appendChild(thumbImg);

    // Center board item
    const boardItem = document.createElement('div');
    boardItem.className = 'board-item';
    boardItem.id = `board_${i}`;
    const imgEl = document.createElement('img');
    imgEl.src = board.src;
    imgEl.alt = board.alt;
    boardItem.appendChild(imgEl);
    lightboxBoards.appendChild(boardItem);
  });

  // Set up IntersectionObserver to highlight thumbs
  setupIntersectionObserver();

  // Wait a bit for DOM to render, then scroll to the chosen board
  setTimeout(() => {
    scrollToBoard(boardIdx);
  }, 50);
}

/*************************************************
 * IntersectionObserver to highlight current board
 *************************************************/
function setupIntersectionObserver() {
  const options = {
    root: lightboxBoards, // The scrollable center container
    rootMargin: "0px",
    threshold: 0.5 // 50% of board in view => consider it "active"
  };

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const itemId = entry.target.id; // e.g. "board_3"
        const idx = parseInt(itemId.split('_')[1], 10);

        // Mark the corresponding thumbnail as active
        const thumbImages = lightboxThumbs.querySelectorAll('img');
        thumbImages.forEach((img, i) => {
          img.classList.toggle('active-thumb', i === idx);
        });
      }
    });
  }, options);

  // Observe each .board-item
  const boardItems = lightboxBoards.querySelectorAll('.board-item');
  boardItems.forEach(item => {
    observer.observe(item);
  });
}

/*************************************************
 * Scroll to a specific board index
 *************************************************/
function scrollToBoard(idx) {
  const boardElem = document.getElementById(`board_${idx}`);
  if (boardElem) {
    boardElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/*************************************************
 * Close / Zoom
 *************************************************/
closeBtn.addEventListener('click', () => {
  shadowbox.classList.remove('show');
});

zoomBtn.addEventListener('click', () => {
  // Example: toggling a "fit-width" vs. "auto width"
  const boardItems = document.querySelectorAll('.board-item img');
  boardItems.forEach((img) => {
    if (img.classList.contains('fit-width')) {
      img.classList.remove('fit-width');
    } else {
      img.classList.add('fit-width');
    }
  });
  // Toggle button text
  if (zoomBtn.textContent === "Fit Entire Width") {
    zoomBtn.textContent = "Original Size";
  } else {
    zoomBtn.textContent = "Fit Entire Width";
  }
});
