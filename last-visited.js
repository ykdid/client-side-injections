(() => {
    const STORAGE_KEY = "visitedProducts";

    const init = () => {
        ensureTestData();
        buildHTML();
        buildCSS();
        setEvents();
    };

    const ensureTestData = () => {
        const existing = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        if (existing.length === 0) {
            const testProducts = [
                { 
                    title: "Samsung Galaxy S24", 
                    url: "#", 
                    image: "https://images.samsung.com/is/image/samsung/p6pim/tr/f2507/gallery/tr-galaxy-z-fold7-f966-sm-f966blgctur-thumb-547552022?$216_216_PNG$", 
                    price: "25.999,00 TL", 
                    chargerType: ["not"] 
                },
                { 
                    title: "Samsung Galaxy Tab S9", 
                    url: "#", 
                    image: "https://images.samsung.com/is/image/samsung/p6pim/tr/sm-a566bzkatur/gallery/tr-galaxy-a56-5g-sm-a566-sm-a566bzkatur-thumb-545455056?$216_216_PNG$", 
                    price: "12.499,00 TL", 
                    chargerType: ["10-25-usb-pd"] 
                },
                { 
                    title: "Samsung Galaxy Watch 6", 
                    url: "#", 
                    image: "https://images.samsung.com/is/image/samsung/p6pim/tr/sm-x210rzsrtur/gallery/tr-galaxy-tab-a9-plus-sm-x210r-sm-x210rzsrtur-thumb-547617106?$216_216_PNG$", 
                    price: "3.299,00 TL", 
                    chargerType: ["not", "10-25-usb-pd"] // ✅ iki ikon örneği
                },
                { 
                    title: "Samsung Galaxy S24", 
                    url: "#", 
                    image: "https://images.samsung.com/is/image/samsung/p6pim/tr/f2507/gallery/tr-galaxy-z-fold7-f966-sm-f966blgctur-thumb-547552022?$216_216_PNG$", 
                    price: "25.999,00 TL", 
                    chargerType: ["not"] 
                },
                { 
                    title: "Samsung Galaxy Tab S9", 
                    url: "#", 
                    image: "https://images.samsung.com/is/image/samsung/p6pim/tr/sm-a566bzkatur/gallery/tr-galaxy-a56-5g-sm-a566-sm-a566bzkatur-thumb-545455056?$216_216_PNG$", 
                    price: "12.499,00 TL", 
                    chargerType: ["10-25-usb-pd"] 
                },
                { 
                    title: "Samsung Galaxy Watch 6", 
                    url: "#", 
                    image: "https://images.samsung.com/is/image/samsung/p6pim/tr/sm-x210rzsrtur/gallery/tr-galaxy-tab-a9-plus-sm-x210r-sm-x210rzsrtur-thumb-547617106?$216_216_PNG$", 
                    price: "3.299,00 TL", 
                    chargerType: ["not", "10-25-usb-pd"] // ✅ iki ikon örneği
                }
            ];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(testProducts));
        }
    };

    const buildHTML = () => {
        const container = document.querySelector('.co78-recommended-product-carousel');
        if (!container) return;

        const visited = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        if (visited.length === 0) return;

        let html = `
            <div class="visited-carousel-wrapper">
                <h2 class="visited-carousel-title">Son Ziyaret Ettiğiniz Ürünler</h2>
                <div class="visited-carousel">
        `;

        visited.forEach(product => {
            let chargerHTML = "";
            if (Array.isArray(product.chargerType)) {
                product.chargerType.forEach(type => {
                    if (type === "not") {
                        chargerHTML += `<img class="charger-icon" src="https://www.samsung.com/etc.clientlibs/samsung/clientlibs/consumer/global/clientlib-common/resources/images/icon-charger-not.svg" alt="Charger not included"/>`;
                    } else if (type === "10-25-usb-pd") {
                        chargerHTML += `<img class="charger-icon" src="https://www.samsung.com/etc.clientlibs/samsung/clientlibs/consumer/global/clientlib-common/resources/images/icon-charger-10-25-usb-pd.svg" alt="Charger 10-25w USB PD"/>`;
                    }
                });
            }

            html += `
                <div class="visited-carousel-item">
                    <div class="visited-carousel-image">
                        <a href="${product.url}">
                            <img src="${product.image}" alt="${product.title}" />
                        </a>
                    </div>
                    <div class="visited-carousel-name-wrap">
                        <a href="${product.url}" class="visited-carousel-name">${product.title}</a>
                    </div>
                    <div class="visited-carousel-charger">
                        ${chargerHTML}
                    </div>
                    <div class="visited-carousel-price">
                        <strong>${product.price}</strong>
                    </div>
                </div>
            `;
        });

        html += `
                </div>
                <div class="co78-visited-nav__inner">
                    <div class="co78-visited-nav__progress">
                        <span class="co78-visited-nav__progress-fill"></span>
                    </div>
                    <div class="co78-visited-nav__buttons">
                        <button class="co78-visited-nav__button co78-visited-nav__button--prev swiper-button-disabled" disabled="true">
                            <span class="co78-visited-nav__hidden">Previous</span>
                            <svg class="co78-visited-nav__icon" focusable="false" aria-hidden="true" width="12.35" height="9" viewBox="0 0 12.35 9">
                                <path d="M11.71,3.76H2.4l2-2a.64.64,0,0,0,0-.9.63.63,0,0,0-.89,0L.19,4.15a.64.64,0,0,0,0,.9l3.33,3.33a.63.63,0,0,0,.89,0,.64.64,0,0,0,0-.9l-2-2h9.31a.64.64,0,0,0,0-1.27Z"></path>
                            </svg>
                        </button>
                        <button class="co78-visited-nav__button co78-visited-nav__button--next">
                            <span class="co78-visited-nav__hidden">Next</span>
                            <svg class="co78-visited-nav__icon" focusable="false" aria-hidden="true" width="12.35" height="9" viewBox="0 0 12.35 9">
                                <path d="M.64,3.76h9.31l-2-2a.64.64,0,0,1,0-.9.63.63,0,0,1,.89,0l3.33,3.33a.64.64,0,0,1,0,.9L8.84,8.42a.63.63,0,0,1-.89,0,.64.64,0,0,1,0-.9l2-2H.64a.64.64,0,0,1,0-1.27Z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;

        container.insertAdjacentHTML("afterend", html);
    };

    const buildCSS = () => {
        const style = document.createElement("style");
        style.textContent = `
            .visited-carousel-wrapper { position: relative; margin: 24px 0 60px; width: 100%; }
            .visited-carousel-title { font-family: 'SamsungSharpSans', arial, sans-serif; font-size: 40px; line-height: 1.33; margin-bottom: 24px; color: #000; padding: 0 24px;  margin: 0 232.500px; }
            .visited-carousel { display: flex; gap: 8px; overflow-x: auto; scroll-behavior: smooth; padding-bottom: 12px; margin: 0 232.500px; scrollbar-width: none; user-select: none; width: calc(100% - 465px); }
            .visited-carousel::-webkit-scrollbar { display: none; }
            .visited-carousel-item { flex-shrink: 0; width: 312px !important; font-family: 'SamsungOne', arial, sans-serif; color: #000; position: relative; transition: transform 0.3s; }
            .visited-carousel-image { position: relative; width: 312px; height: 312px; overflow: hidden; display: flex; align-items: center; justify-content: center; }
            .visited-carousel-image a { display: flex; align-items: center; justify-content: center; width: 216px; height: 216px; }
            .visited-carousel-image img { width: 216px; height: 216px; object-fit: contain; transition: transform 0.3s ease; }
            .visited-carousel-image:hover img { transform: scale(1.1); } 
            .visited-carousel-name-wrap { margin-top: 24px; height:59px;}
            .visited-carousel-name { font-family: 'SamsungOne',arial,sans-serif; font-weight: 700; font-size: 22px; line-height: 1.33; color: #000; text-decoration: none; }
            .visited-carousel-price { margin-top: 17px; font-size: 20px; font-weight: bold; color: #000; }
            .visited-carousel-charger { margin-top: 16px; display: flex; gap: 6px; }
            .charger-icon { width: 30px; height: 40px; object-fit: contain; } /* ✅ 30x40 */
            .co78-visited-nav__inner { 
                display: flex; 
                justify-content: center; 
                align-items: center; 
                gap: 60px; 
                margin: 40px 232.500px 0; 
            }
            .co78-visited-nav__progress { 
                background: rgba(0,0,0,0.1); 
                width: 562px; 
                height: 2px; 
                border-radius: 1000px; 
                overflow: hidden; 
            }
            .co78-visited-nav__progress-fill { 
                display: block; 
                width: 100%; 
                height: 100%; 
                background: #000; 
                transform-origin: left; 
                transition: transform 0.3s;
            }
            .co78-visited-nav__buttons { 
                display: flex; 
                gap: 8px; 
            }
            .co78-visited-nav__button { 
                cursor: pointer; 
                border: 1px solid rgba(0,0,0,0.1);
                border-radius: 50%; 
                width: 40px; 
                height: 40px; 
                background-color: #fff; 
                display: flex; 
                justify-content: center; 
                align-items: center;
                transition: all 0.3s ease;
                padding: 0;
            }
            .co78-visited-nav__button:not(:disabled):hover { 
                border-color: rgba(0,0,0,0.2);
            }
            .co78-visited-nav__button:disabled {
                opacity: 0.3;
                cursor: not-allowed;
            }
            .co78-visited-nav__icon {
                width: 12.35px;
                height: 9px;
                fill: currentColor;
            }
            .co78-visited-nav__hidden {
                position: absolute;
                width: 1px;
                height: 1px;
                padding: 0;
                margin: -1px;
                overflow: hidden;
                clip: rect(0,0,0,0);
                border: 0;
            }
        `;
        document.head.appendChild(style);
    };

    const setEvents = () => {
        const carousel = document.querySelector('.visited-carousel');
        const barFill = document.querySelector('.co78-visited-nav__progress-fill');
        const prevBtn = document.querySelector('.co78-visited-nav__button--prev');
        const nextBtn = document.querySelector('.co78-visited-nav__button--next');
        if (!carousel) return;

        let isDragging = false;
        let startX;
        let scrollLeft;

        const updateProgress = () => {
            const scrollWidth = carousel.scrollWidth - carousel.clientWidth;
            const progress = scrollWidth > 0 ? carousel.scrollLeft / scrollWidth : 0;
            barFill.style.transform = `scaleX(${progress})`;

            prevBtn.disabled = carousel.scrollLeft <= 0;
            nextBtn.disabled = carousel.scrollLeft >= scrollWidth;
            prevBtn.classList.toggle('swiper-button-disabled', prevBtn.disabled);
            nextBtn.classList.toggle('swiper-button-disabled', nextBtn.disabled);
        };

        const startDragging = (e) => {
            isDragging = true;
            carousel.classList.add('grabbing');
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        };

        const stopDragging = () => {
            isDragging = false;
            carousel.classList.remove('grabbing');
        };

        const drag = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
            updateProgress();
        };

        carousel.addEventListener('scroll', updateProgress);
        carousel.addEventListener('mousedown', startDragging);
        carousel.addEventListener('mousemove', drag);
        carousel.addEventListener('mouseup', stopDragging);
        carousel.addEventListener('mouseleave', stopDragging);

        prevBtn?.addEventListener('click', () => {
            carousel.scrollBy({ left: -320, behavior: 'smooth' });
            setTimeout(updateProgress, 300);
        });
        nextBtn?.addEventListener('click', () => {
            carousel.scrollBy({ left: 320, behavior: 'smooth' });
            setTimeout(updateProgress, 300);
        });

        updateProgress();
    };

    init();
})();
