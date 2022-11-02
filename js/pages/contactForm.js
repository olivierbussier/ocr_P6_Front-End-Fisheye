/**
 * Mise en place des hooks pour la modal de contact
 */
export function setupEventModal() {

    // Add event listener to open the modal
    const buttonDisplay = document.querySelectorAll(".contact-button");
    buttonDisplay.forEach((elem) => {elem.addEventListener('click', (e) => {
            const modal = document.getElementById("contact-modal")
            modal.style.display = "flex"
        })
    })

    // Add event listener to close the modal
    const buttonClose = document.querySelectorAll(".close-item");
    buttonClose.forEach((elem) => {elem.addEventListener('click', (e) => {
            const modal = document.getElementById("contact-modal")
            modal.style.display = "none"
        })
    })
}