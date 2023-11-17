const imgs = document.getElementById("img");
const img = document.querySelectorAll("#img img");

let isDragging = false;
let startPosX;
let startTranslateX;
let currentTranslateX = 0;

// Clone do conteúdo para criar um efeito contínuo
imgs.innerHTML += imgs.innerHTML;

function handleMouseDown(event) {
    isDragging = true;
    startPosX = event.clientX;
    startTranslateX = currentTranslateX;
    imgs.style.cursor = "grabbing";
}

function handleMouseMove(event) {
    if (isDragging) {
        const deltaX = event.clientX - startPosX;
        currentTranslateX = startTranslateX + deltaX;
        setTranslateX(currentTranslateX);
    }
}

function handleMouseUp() {
    if (isDragging) {
        isDragging = false;
        imgs.style.cursor = "grab";
    }
}

function handleMouseLeave() {
    handleMouseUp();
}

function setTranslateX(translateX) {
    imgs.style.transform = `translateX(${translateX}px)`;

    // Verifica se atingiu o final do segundo conjunto de imagens
    if (translateX <= -imgs.clientWidth) {
        currentTranslateX += imgs.clientWidth;
        setTranslateX(currentTranslateX);
    }

    // Verifica se atingiu o início do primeiro conjunto de imagens
    if (translateX > 0) {
        currentTranslateX -= imgs.clientWidth;
        setTranslateX(currentTranslateX);
    }
}

function carrossel() {
    if (!isDragging) {
        currentTranslateX -= 5; // Ajuste a velocidade conforme necessário
        setTranslateX(currentTranslateX);
    }

    requestAnimationFrame(carrossel);
}

imgs.addEventListener("mousedown", handleMouseDown);
imgs.addEventListener("mousemove", handleMouseMove);
imgs.addEventListener("mouseup", handleMouseUp);
imgs.addEventListener("mouseleave", handleMouseLeave);

requestAnimationFrame(carrossel);
