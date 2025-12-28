const image = document.querySelector("img.hero-image");
let raf;

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

function rotateImage(event) {
    if (raf) { return };

    raf = requestAnimationFrame(() => {
        const rect = document.body.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 3;

        let rotateX = ((y - centerY) / centerY) * -6;  // Tilt up/down
        let rotateY = ((x - centerX) / centerX) * 2;  // Tilt left/right

        // Add limits
        if (rotateX < - 2.5) { rotateX = -2.5 };
        if (rotateY < -2.5) { rotateY = -2.5 };
        if (rotateX > 2.5) { rotateX = 2.5 };
        if (rotateY > 2.5) { rotateY = 2.5 };

        image.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.025)`;

        raf = null;
    })
}

function resetImage() {
    image.style.transform = `
    perspective(1000px)
    rotateX(0deg)
    rotateY(0deg)
  `;
}


// Enable image rotation on devices with a mouse pointer who are fine with motion
if (window.matchMedia("(pointer: fine)").matches && image && !prefersReducedMotion.matches) {
    document.body.addEventListener("mousemove", rotateImage);
    document.body.addEventListener("mouseleave", resetImage);
}
