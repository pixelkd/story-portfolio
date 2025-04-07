// about_page.js

/**
 * Loads the About section dynamically.
 * Clears the current hero and article list contents.
 */
function load_about() {
    console.log("Loading About section...");

    // Clear hero section (main content area)
    const heroSection = document.querySelector(".hero");
    if (!heroSection) {
        console.error("Heror section not found.");
    }
    heroSection.innerHTML = "";

    about_side_bar()

    // Load hero content
    about_hero();
}

/**
 * Loads the profile image into the sidebar.
 */
function about_side_bar() {
    console.log("Adding profile image to sidebar...");

    // Select the sidebar list container
    const articleList = document.querySelector(".article_list_items");

    if (!articleList) {
        console.error("Sidebar list container not found.");
        return;
    }

    // Clear previous sidebar content
    articleList.innerHTML = "";

    // Create a new div for the profile image

    // Create the profile image element
    const profileImg = document.createElement("img");
    profileImg.src = "images/me.jpg"; // Path to profile image
    profileImg.alt = "Profile Image of Jason B. Wilson";
    profileImg.classList.add("about_profile_img");

    // Append image to sidebar item
    
    articleList.appendChild(profileImg);

    console.log("Profile image added to sidebar.");
}

/**
 * Loads the About content into the hero section.
 */
function about_hero() {
    console.log("Loading About content...");

    // Select the hero section and clear it
    const heroSection = document.querySelector(".hero");

    if (!heroSection) {
        console.error("Hero section not found.");
        return;
    }
    heroSection.innerHTML = ""; // Clear previous content

    // === About Banner (Text Container) ===
    const aboutBanner = document.createElement("div");
    aboutBanner.classList.add("about_banner");

    const aboutText = document.createElement("p");
    aboutText.textContent =
        "I’ve been creating stories since I was a kid, sketching characters and scenes from the world around me. " +
        "Over time, I've honed my skills working in games, comic books, and storyboards for independent films, " +
        "where I enjoy transforming concepts into compelling visuals. At the heart of my work is a commitment to bringing " +
        "narratives to life in a way that captivates readers and viewers alike.";

    aboutBanner.appendChild(aboutText);

    // === Resume Section (PDF Viewer) ===
    const resumeContainer = document.createElement("div");
    resumeContainer.classList.add("resume_container");

    const pdfViewer = document.createElement("iframe");
    pdfViewer.src = "Jason_Wilson_resume.pdf"; // Resume file
    pdfViewer.classList.add("pdf_viewer");

    const downloadButton = document.createElement("a");
    downloadButton.href = "Jason_Wilson_resume.pdf";
    downloadButton.download = "Jason_Wilson_resume.pdf";
    downloadButton.textContent = "Download Resume";
    downloadButton.classList.add("download_button");

    resumeContainer.appendChild(pdfViewer);
    resumeContainer.appendChild(downloadButton);

    // Append elements to the hero section
    heroSection.appendChild(aboutBanner);
    heroSection.appendChild(resumeContainer);

    console.log("About section added.");
}
