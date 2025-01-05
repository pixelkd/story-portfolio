// scripts/storyboards.js

/*************************************************
 * Data Structure
 *************************************************/
const storyboardData = [
  {
    title: "Nature Sequence",
    description: "A brief sequence depicting the natural world...",
    boards: [
      {
        src: "images/storyboards/nature.jpg",
        alt: "Nature Sequence Board"
      }
    ]
  },
  {
    title: "Science Fiction Opening",
    description: "A meeting with mysterious investors...",
    boards: [
      {
        src: "images/storyboards/hallboards_01.jpg",
        alt: "Sci-Fi Op Board 1"
      },
      {
        src: "images/storyboards/collective_01.jpg",
        alt: "Sci-Fi Op Board 2"
      },
      {
        src: "images/storyboards/collective_02.jpg",
        alt: "Sci-Fi Op Board 3"
      },
      {
        src: "images/storyboards/collective_03.jpg",
        alt: "Sci-Fi Op Board 4"
      }
    ]
  },
  {
    title: "Heist Scene Opening",
    description: "An insider distracts security while the cameras are hacked...",
    boards: [
      {
        src: "images/storyboards/dr_ride1_board.jpg",
        alt: "Heist Board 1"
      },
      {
        src: "images/storyboards/lobby_boards01.jpg",
        alt: "Heist Board 2"
      },
      {
        src: "images/storyboards/lobby_boards02.jpg",
        alt: "Heist Board 3"
      },
      {
        src: "images/storyboards/lobby_boards03.jpg",
        alt: "Heist Board 4"
      },
      {
        src: "images/storyboards/lobby_boards04.jpg",
        alt: "Heist Board 5"
      },
      {
        src: "images/storyboards/lobby_boards05.jpg",
        alt: "Heist Board 6"
      },
      {
        src: "images/storyboards/lobby_boards06.jpg",
        alt: "Heist Board 7"
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

/*************************************************
 * State / Observer
 *************************************************/
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
  const seqData = storyboardData[seqIdx];

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
  // This is optional; you can tailor the logic
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
