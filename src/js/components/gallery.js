export function gallery() {
    const openModalBtn = document.querySelectorAll('[data-open-popup="#popupGallery"]');
    const gallery = document.querySelector(".gallery");
    const galleryInner = document.querySelector(".gallery__inner");
    const filters = document.querySelectorAll(".filters__inner button");
    const filtersInner = document.querySelector(".filters__inner");
    const filtersOpenTrigger = document.querySelector(".filters__toggle-btn");
    let images = [];
    let loadedImages = 0;
    const initialLoadCount = 16;
    const subsequentLoadCount = 8;
    let currentFilter = "all";
    let isLoading = false;


    // AWS Path to Project
    const pathImgs = "https://d3b6muno9lbfvx.cloudfront.net/sky-vista-vr/modals360/"

    // Функция для перемешивания массива (Fisher-Yates алгоритм)
    // function shuffleArray(array) {
    //     const newArray = [...array];
    //     for (let i = newArray.length - 1; i > 0; i--) {
    //         const j = Math.floor(Math.random() * (i + 1));
    //         [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    //     }
    //     return newArray;
    // }

    async function fetchImages() {
        try {
            const response = await fetch("../../files/gallery.json");
            const data = await response.json();
            // images = shuffleArray(data); // Перемешиваем изображения сразу после загрузки
            images = data;
            loadMoreImages(initialLoadCount);
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    }

    function loadMoreImages(count) {
        if (isLoading || !images.length) return;
        isLoading = true;

        const filteredImages = currentFilter === "all"
            ? images
            : images.filter(img => img.category === currentFilter);

        const nextBatch = filteredImages.slice(loadedImages, loadedImages + count);

        if (nextBatch.length === 0) {
            isLoading = false;
            return;
        }

        const fragment = document.createDocumentFragment();



        nextBatch.forEach(img => {
            // Image Path
            const imagePath = pathImgs + img.src
            const imgWrapper = document.createElement("div");
            imgWrapper.className = "gallery__img";

            const link = document.createElement("a");
            link.setAttribute("href", imagePath);
            link.setAttribute("data-fancybox", "gallery");

            const skeleton = document.createElement("div");
            skeleton.className = "skeleton";

            const image = new Image();
            image.dataset.src = imagePath;
            image.loading = "lazy";

            image.onload = () => {
                skeleton.style.display = "none";
            };
            image.onerror = () => {
                skeleton.style.display = "none";
                console.error("Failed to load image:", img.src);
            };

            setTimeout(() => {
                image.src = image.dataset.src;
            }, 100);

            link.appendChild(image);
            imgWrapper.appendChild(link);
            imgWrapper.appendChild(skeleton);
            fragment.appendChild(imgWrapper);
        });

        galleryInner.appendChild(fragment);
        loadedImages += nextBatch.length;
        isLoading = false;
    }

    function handleScroll() {
        if (isLoading) return;

        const scrollTop = gallery.scrollTop;
        const scrollHeight = gallery.scrollHeight;
        const clientHeight = gallery.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight * 0.8) {
            const loadCount = loadedImages <= initialLoadCount ? subsequentLoadCount : subsequentLoadCount;
            loadMoreImages(loadCount);
        }
    }

    gallery.addEventListener("scroll", handleScroll);

    filters.forEach(button => {
        button.addEventListener("click", () => {
            filters.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            currentFilter = button.getAttribute("data-filter");
            loadedImages = 0;
            galleryInner.innerHTML = "";
            filtersOpenTrigger.innerHTML = button.querySelector('span').innerText
            gallery.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            // При смене фильтра снова перемешиваем изображения
            // if (currentFilter === "all") {
            //     images = shuffleArray(images);
            // } else {
            //     // Для отдельных фильтров перемешиваем только соответствующие изображения
            //     const filtered = images.filter(img => img.category === currentFilter);
            //     const rest = images.filter(img => img.category !== currentFilter);
            //     images = [...shuffleArray(filtered), ...rest];
            // }
            if (filtersInner.classList.contains('_show')) {
                filtersInner.classList.remove('_show')
            }
            loadMoreImages(initialLoadCount);
        });
    });

    openModalBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            fetchImages();
        });
    })

    filtersOpenTrigger.addEventListener('click', () => {
        filtersInner.classList.toggle('_show')
    })

    Fancybox.bind('[data-fancybox="gallery"]', {
        Hash: false,
        on: {
            close: () => { },
            initLayout: () => { },
        },
    });
}