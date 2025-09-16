(() => {
    const STORAGE_KEY = "visitedCategory";
  
    const categories = {
      "/giyim-tekstil": "Giyim & Tekstil",
      "/bebek-odasi": "Bebek Odası",
      "/banyo-bakim": "Banyo & Bakım",
      "/bez-mendil": "Bez & Mendil",
      "/oyuncak-kitap": "Oyuncak & Kitap",
      "/arac-gerec": "Araç & Gereç",
      "/beslenme": "Beslenme",
      "/emzirme": "Emzirme",
      "/guvenlik": "Güvenlik"
    };
  
    const saveCategory = () => {
      for (const [path, label] of Object.entries(categories)) {
        if (location.pathname.startsWith(path)) {
          localStorage.setItem(STORAGE_KEY, label);
          console.info("[inject] saved category:", label);
        }
      }
    };
  
    const init = () => {
      
          if (!location.hostname.includes("www.e-bebek.com")) {
            console.log("wrong page");
            return;
    }
  
      const lastCategory = localStorage.getItem(STORAGE_KEY) || "Bebek Arabaları";
      buildHTML(lastCategory);
      buildCSS();
      setEvents();
      console.info("[inject] loaded category:", lastCategory);
    };
  
    const buildHTML = (category) => {
      const target = document.querySelector(".Section2A");
      if (!target) return;
  
      const html = `
        <div class="personalized-banner">
          <h2>Son gezdiğiniz kategori: <b>${category}</b></h2>
          <p>Bu kategoriye özel %10 indirim kuponu sizin için hazır 🎁</p>
          <button class="claim-coupon">Kuponu Al</button>
        </div>
        <div class="coupon-popup hidden">
          <div class="popup-content">
            <h3>Tebrikler!</h3>
            <p>Kupon kodunuz: <b>EBEBEK10</b></p>
            <button class="close-popup">Kapat</button>
          </div>
        </div>
      `;
      target.insertAdjacentHTML("afterbegin", html);
    };
  
    const buildCSS = () => {
      const style = document.createElement("style");
      style.textContent = `
        .personalized-banner {
          border: 3px dashed #ff8a00;
          border-radius: 14px;
          padding: 24px;
          margin-bottom: 24px;
          background: #fffaf5;
          font-family: 'Quicksand-SemiBold', sans-serif;
          text-align: center;
          font-size: 18px;
        }
        .personalized-banner h2 {
          font-size: 28px;
          margin-bottom: 12px;
        }
        .personalized-banner p {
          font-size: 18px;
          margin-bottom: 16px;
        }
        .personalized-banner button {
          background: #ff8a00;
          color: white;
          border: none;
          padding: 14px 24px;
          border-radius: 10px;
          cursor: pointer;
          font-size: 18px;
        }
        .personalized-banner button:hover {
          background: #e67800;
        }
        .coupon-popup {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        .coupon-popup.hidden {
          display: none;
        }
        .popup-content {
          background: white;
          padding: 36px;
          border-radius: 16px;
          text-align: center;
          box-shadow: 0 6px 24px rgba(0,0,0,0.35);
          animation: fadeIn 0.3s ease;
          max-width: 400px;
          width: 90%;
        }
        .popup-content h3 {
          margin-bottom: 16px;
          font-size: 26px;
          color: #ff8a00;
        }
        .popup-content p {
          margin-bottom: 20px;
          font-size: 20px;
        }
        .popup-content button {
          background: #ff8a00;
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 10px;
          cursor: pointer;
          font-size: 18px;
        }
        .popup-content button:hover {
          background: #e67800;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        @media screen and (max-width: 1024px) {
          .personalized-banner h2 {
            font-size: 24px;
          }
          .personalized-banner p {
            font-size: 16px;
          }
          .personalized-banner button {
            padding: 12px 20px;
            font-size: 16px;
          }
          .popup-content {
            padding: 30px;
          }
          .popup-content h3 {
            font-size: 24px;
          }
          .popup-content p {
            font-size: 18px;
          }
        }

        @media screen and (max-width: 768px) {
          .personalized-banner {
            padding: 20px;
            margin-bottom: 20px;
            font-size: 16px;
          }
          .personalized-banner h2 {
            font-size: 22px;
            margin-bottom: 10px;
          }
          .personalized-banner p {
            font-size: 15px;
            margin-bottom: 14px;
          }
          .personalized-banner button {
            padding: 12px 18px;
            font-size: 15px;
          }
          .popup-content {
            padding: 24px;
          }
          .popup-content h3 {
            font-size: 22px;
            margin-bottom: 14px;
          }
          .popup-content p {
            font-size: 16px;
            margin-bottom: 18px;
          }
          .popup-content button {
            padding: 10px 18px;
            font-size: 16px;
          }
        }

        @media screen and (max-width: 480px) {
          .personalized-banner {
            padding: 16px;
            margin-bottom: 16px;
            border-width: 2px;
            border-radius: 10px;
          }
          .personalized-banner h2 {
            font-size: 20px;
            margin-bottom: 8px;
          }
          .personalized-banner p {
            font-size: 14px;
            margin-bottom: 12px;
          }
          .personalized-banner button {
            padding: 10px 16px;
            font-size: 14px;
            border-radius: 8px;
          }
          .popup-content {
            padding: 20px;
            border-radius: 12px;
          }
          .popup-content h3 {
            font-size: 20px;
            margin-bottom: 12px;
          }
          .popup-content p {
            font-size: 15px;
            margin-bottom: 16px;
          }
          .popup-content button {
            padding: 10px 16px;
            font-size: 14px;
            border-radius: 8px;
          }
        }
      `;
      document.head.appendChild(style);
    };
  
    const setEvents = () => {
      const popup = document.querySelector(".coupon-popup");
      
      const closePopup = () => {
        popup?.classList.add("hidden");
      };

      document.addEventListener("click", (e) => {
        if (e.target.classList.contains("claim-coupon")) {
          //console.log("EVENT_TRACKED: coupon_claimed", { category: localStorage.getItem(STORAGE_KEY) });
          popup?.classList.remove("hidden");
        }
        if (e.target.classList.contains("close-popup")) {
          closePopup();
        }
        if (e.target === popup) {
          closePopup();
        }
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          closePopup();
        }
      });
    };
  
    saveCategory();
    init();
  })();
  