document.addEventListener("DOMContentLoaded", () => {
    const tooltip = document.getElementById('tooltip');
    let isControlHeld = false;
    let mouseOnTooltipableArea = false;
    let currentTooltipContent = '';

    setInterval(() => {
        console.log("Control is held:", isControlHeld);
    }, 500)

    const showTooltip = (content, e) => {
        mouseOnTooltipableArea = true;
        currentTooltipContent = content;
        // console.log("Set currentTooltipContent to", currentTooltipContent);
        if (isControlHeld) return;
        tooltip.innerHTML = content;
        tooltip.style.display = 'flex';
        positionTooltip(e);
    };

    const hideTooltip = () => {
        mouseOnTooltipableArea = false;
        currentTooltipContent = '';
        // console.log("Set currentTooltipContent to", currentTooltipContent);
        if (isControlHeld) return;
        tooltip.style.display = 'none';
    };

    const positionTooltip = (e) => {
        if (isControlHeld) return;

        tooltip.innerHTML = currentTooltipContent;
        if (currentTooltipContent) tooltip.style.display = 'flex';

        const tooltipWidth = tooltip.offsetWidth;
        const tooltipHeight = tooltip.offsetHeight;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        // Default positioning (to the right and below the cursor)
        let tooltipX = e.pageX + 10;
        let tooltipY = e.pageY + 10;

        // Horizontal Overflow (Check if tooltip overflows on the right side)
        if (tooltipX + tooltipWidth > screenWidth) {
            tooltipX = e.pageX - tooltipWidth - 10;
        }

        // Vertical Overflow (Check if tooltip overflows at the bottom)
        if (tooltipY + tooltipHeight > screenHeight) {
            tooltipY = e.pageY - tooltipHeight - 10;
        }

        tooltip.style.left = `${tooltipX}px`;
        tooltip.style.top = `${tooltipY}px`;
    };

    const attachTooltipHandlers = (elements, getContentCallback) => {
        elements.forEach(element => {
            element.addEventListener('mouseover', (e) => {
                const content = getContentCallback(element);
                showTooltip(content, e);
            });

            element.addEventListener('mousemove', positionTooltip);

            element.addEventListener('mouseout', hideTooltip);
        });
    };

    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) isControlHeld = true;
    });

    document.addEventListener('keyup', (e) => {
        if (!e.ctrlKey && !e.metaKey) {
            isControlHeld = false;
            // if (!mouseOnTooltipableArea) hideTooltip();
        }
    });

    document.addEventListener('mousemove', (e) => {
        // console.log("IsControlHeld", isControlHeld);
        // console.log("MouseOnTooltipableArea", mouseOnTooltipableArea);
        if (!isControlHeld && !mouseOnTooltipableArea) {
            hideTooltip();
        }
    });

    const locations = document.querySelectorAll('.location');
    attachTooltipHandlers(locations, getLocationTooltip);

    const regions = document.querySelectorAll('.region');
    attachTooltipHandlers(regions, getRegionTooltip);
});

/**
 * @typedef {Object} RegionData
 * @property {string} name
 * @property {string} capital
 * @property {string} description
 * @property {string} ruler
 * @property {string} population
 */

/**
 * Get region tooltip
 * @param {Element} element
 * @return {string}
 */
function getRegionTooltip(element) {
    const regionName = element.getAttribute('data-name');
    const regionPopulation = element.getAttribute('data-population');
    const regionCapital = element.getAttribute('data-capital');
    const regionDescription = element.getAttribute('data-description');
    const regionRuler = element.getAttribute('data-ruler');
    const url = element.getAttribute('data-url');

    // let data = url ? `<a href="${url}" class="titlelink" target="_blank" rel="noreferrer noopener"><h3>${regionName}</h3></a>` : `<h3>${regionName}</h3>`;
    let data = `<h3>${regionName}</h3>`;

    data += `<div class="border"></div>`;

    if (regionCapital) data += `
        <div class="detailbox">
            <svg title="wsda" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4.5 14L3 15V21H7M7 21H10M7 21V13L9.5 11V6L12 3L14.5 6V11L17 13V21M10 21H14M10 21V17C10 15.8954 10.8954 15 12 15C13.1046 15 14 15.8954 14 17V21M14 21H17M17 21H21V15L19.5 14" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            <span>${regionCapital}</span>
        </div>
    `;
    if (regionPopulation) data += `
        <div class="detailbox">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 20V18C13 15.2386 10.7614 13 8 13C5.23858 13 3 15.2386 3 18V20H13ZM13 20H21V19C21 16.0545 18.7614 14 16 14C14.5867 14 13.3103 14.6255 12.4009 15.6311M11 7C11 8.65685 9.65685 10 8 10C6.34315 10 5 8.65685 5 7C5 5.34315 6.34315 4 8 4C9.65685 4 11 5.34315 11 7ZM18 9C18 10.1046 17.1046 11 16 11C14.8954 11 14 10.1046 14 9C14 7.89543 14.8954 7 16 7C17.1046 7 18 7.89543 18 9Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            <span>${regionPopulation}</span>
        </div>
    `;
    if (regionRuler) data += `
        <div class="detailbox">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 8L6 20H18L20 8M4 8L5.71624 9.37299C6.83218 10.2657 7.39014 10.7121 7.95256 10.7814C8.4453 10.8421 8.94299 10.7173 9.34885 10.4314C9.81211 10.1051 10.0936 9.4483 10.6565 8.13476L12 5M4 8C4.55228 8 5 7.55228 5 7C5 6.44772 4.55228 6 4 6C3.44772 6 3 6.44772 3 7C3 7.55228 3.44772 8 4 8ZM20 8L18.2838 9.373C17.1678 10.2657 16.6099 10.7121 16.0474 10.7814C15.5547 10.8421 15.057 10.7173 14.6511 10.4314C14.1879 10.1051 13.9064 9.4483 13.3435 8.13476L12 5M20 8C20.5523 8 21 7.55228 21 7C21 6.44772 20.5523 6 20 6C19.4477 6 19 6.44772 19 7C19 7.55228 19.4477 8 20 8ZM12 5C12.5523 5 13 4.55228 13 4C13 3.44772 12.5523 3 12 3C11.4477 3 11 3.44772 11 4C11 4.55228 11.4477 5 12 5ZM12 4H12.01M20 7H20.01M4 7H4.01" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            <span>${regionRuler}</span>
        </div>
    `;
    if (regionDescription) data += `
        <div class="detailbox">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 10H16M3 14H21M3 18H16M3 6H21" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            <span>${regionDescription}</span>
        </div>
    `;

    if (url) data += `<a href="${url}" class="icon" target="_blank" rel="noreferrer noopener" class="more"><img src="img/icons/book.svg">Wiki</a>`;

    return data;
}

function getLocationTooltip(location) {
    const locationName = location.getAttribute('data-name');
    const locationDescription = location.getAttribute('data-description');
    const url = location.getAttribute('data-url');

    // let locationString = url ? `<a href="${url}" class="titlelink" target="_blank" rel="noreferrer noopener"><h3>${locationName}</h3></a>` : `<h3>${locationName}</h3>`;
    let locationString = `<h3>${locationName}</h3>`;

    if (locationDescription) locationString += `<div class="border"></div>`;
    if (locationDescription) locationString += `<span>${locationDescription}</span>`;
    if (url) locationString += `<a href="${url}" class="icon" target="_blank" rel="noreferrer noopener" class="more"><img src="img/icons/book.svg">Wiki</a>`;

    return locationString;
}