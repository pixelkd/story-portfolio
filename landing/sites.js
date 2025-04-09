const sites = [
    {
        title: "Storyboard Portfolio",
        link: "/story", 
        image: "landing/assets/storypage.png",
        description: "A portfolio showcasing my work as a storyboard artist, including a collection of my storyboards and some comics pages.",
    },
    {
        title: "Colorist Portfolio",
        link: "/color", 
        image: "landing/assets/color_page.png",
        description: "Some exaples of my comic book colorist work.",
    }
];

const container = document.querySelector("#site-container");

sites.forEach(site => {
    const card = document.createElement("div");
    card.className = "site-card";  

    card.innerHTML = `
        <img src="${site.image}" alt="${site.title}">
        <div class="content">
            <h2>${site.title}</h2>
            <p>${site.description}</p>
            <a href="${site.link}" target="_blank" rel="noopener">Open in new tab →</a>
        </div>
    `;

    container.appendChild(card);
});
