const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");

window.addEventListener("resize", function () {
    loadImage(Math.floor(frames.currentIndex));
});

const frames = {
    currentIndex: 0,
    maxIndex: 538,
};

let imagesLoaded = 0;
let images = [];

function preloadImages() {
    for (let i = 1; i <= frames.maxIndex; i++) {
        const imageUrl = `./frames/frame_${i.toString().padStart(4, "0")}.jpeg`;
        const img = new Image();
        img.src = imageUrl;
        img.onload = function () {
            imagesLoaded++;
            if (imagesLoaded === frames.maxIndex) {
                loadImage(frames.currentIndex);
                startAnimation();
            }
        };
        images.push(img);
    }
}

function loadImage(index) {
    if (index >= 0 && index <= frames.maxIndex) {
        const img = images[index];

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        const scale = Math.max(scaleX, scaleY);

        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
        frames.currentIndex = index;
    }
}

function startAnimation() {
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".parent",
            start: "top top",
            end: "bottom bottom",
            scrub: 2,
            ease: "linear",
        },
    });

    function updateFrame(index) {
        return {
            currentIndex: index,
            onUpdate: function () {
                loadImage(Math.floor(frames.currentIndex));
            },
        };
    }

    tl
    .to(frames, updateFrame(50), "first")
    .to(".animate1" , { ease: "linear", opacity: 0}, "first")
    .to(frames, updateFrame(80), "second")
    .to(".animate2" , { ease: "linear", opacity: 1}, "second")
    .to(frames, updateFrame(110), "third")
    .to(".animate2" , { ease: "linear", opacity: 1}, "third")
    .to(frames, updateFrame(140), "forth")
    .to(".animate2" , { ease: "linear", opacity: 0}, "forth")
    .to(frames, updateFrame(170), "fifth")
    .to(".animate3" , { ease: "linear", opacity: 1}, "fifth")
    .to(frames, updateFrame(200), "sixth")
    .to(".animate3" , { ease: "linear", opacity: 1}, "sixth")
    .to(frames, updateFrame(230), "seventh")
    .to(".animate3" , { ease: "linear", opacity: 0}, "seventh")
    .to(frames, updateFrame(260), "eighth")
    .to(".panel" , { ease: "expo", x: "0%"}, "eighth")
    .to(frames, updateFrame(290), "ninth")
    .to(".panel" , { ease: "expo", x: "0%"}, "ninth")
    .to(frames, updateFrame(320), "tenth")
    .to(".panel" , { ease: "linear", opacity: 0}, "tenth")
    .to(frames, updateFrame(350), "eleventh")
    .to("canvas" , { ease: "linear", scale: .5}, "eleventh")
    .to(frames, updateFrame(380), "twelfth")
    .to(".panelism" , { ease: "expo", opacity: 1}, "twelfth")
    .to(frames, updateFrame(410), "twelfth")
    .to(".panelism span" , { ease: "expo", width: 200}, "twelfth")
    .to(frames, updateFrame(440), "thirteenth")
    .to("canvas" , { ease: "linear", scale: 1}, "thirteenth")
    .to(frames, updateFrame(480), "fourteenth")
    .to(".panelism" , { ease: "circ", scale: 2}, "fourteenth")
    .to(frames, updateFrame(537), "fifteenth")
    .to(".panelism" , { ease: "circ", scale: 2}, "fifteenth")
    
}

const lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

preloadImages();


document.querySelectorAll(".headings h3")
.forEach((elm)=>{
    gsap.from(elm, {
        scrollTrigger: {
            trigger: elm,
            start: "top 90%",
            end: "bottom 20%",
            scrub: 2
        },
        opacity: .3
    })
})