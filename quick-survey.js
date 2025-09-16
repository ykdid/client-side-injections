(() => {

  //const LOG_ENDPOINT = "http://localhost:5001/api/logs"; // repository: https://github.com/ykdid/dotnet-minimalapi-elk-stack
  const LOG_ENDPOINT = "https://logger-api-y13g.onrender.com/api/logs";
  const STORAGE_KEY = "survey_submitted";

  const sendLog = async (payload) => {
    try {
      const additionalData = {};
      if (payload.data) {
        Object.entries(payload.data).forEach(([key, value]) => {
          additionalData[key] = String(value);
        });
      }

      const body = {
        Message: payload.message || "survey_event",
        Level: payload.level || "Info",
        AdditionalData: additionalData,
        Timestamp: new Date().toISOString()
      };

      const res = await fetch(LOG_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "omit"
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("[survey] log endpoint returned error", res.status, text);
        return { ok: false, status: res.status, text };
      }
      return { ok: true };
    } catch (err) {
      console.error("[survey] failed to send log", err);
      return { ok: false, error: String(err) };
    }
  };

  if (localStorage.getItem(STORAGE_KEY)) return;
  if (!location.hostname.includes("adidas.com.tr")) return;

  const buildCSS = () => {
    const css = `
      #survey-banner {
        position: fixed;
        right: 24px;
        bottom: 24px;
        width: 420px;
        max-width: calc(100% - 48px);
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.18);
        font-family: "Arial", sans-serif;
        z-index: 2147483647;
        overflow: hidden;
        border: 1px solid rgba(0,0,0,0.06);
      }
      #survey-banner .ins-header {
        display:flex;
        align-items:center;
        gap:12px;
        padding:16px;
        background: linear-gradient(90deg,#000 0%, #222 100%);
        color:#fff;
      }
      #survey-banner .ins-header h3 { margin:0; font-size:16px; font-weight:700; letter-spacing:0.2px; }
      #survey-banner .ins-body { padding:16px; color:#222; font-size:14px; }
      #survey-banner .ins-question { margin-bottom:12px; font-weight:600; color:#111; }
      #survey-banner .ins-options { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:12px; }
      #survey-banner .ins-option {
        flex: 1 1 calc(50% - 8px);
        border:1px solid #e6e6e6;
        padding:10px 12px;
        border-radius:8px;
        cursor:pointer;
        text-align:center;
        background: #fafafa;
        transition: transform 0.12s ease, box-shadow .12s;
        user-select:none;
      }
      #survey-banner .ins-option:hover { transform: translateY(-3px); box-shadow: 0 6px 18px rgba(0,0,0,0.06); }
      #survey-banner .ins-option.active { background:#000; color:#fff; border-color:#000; }
      #survey-banner .ins-actions { display:flex; gap:8px; justify-content:space-between; align-items:center; margin-top:8px; }
      #survey-banner .ins-btn { padding:10px 14px; border-radius:8px; border:none; cursor:pointer; font-weight:700; }
      #survey-banner .ins-btn.submit { background:#000; color:#fff; }
      #survey-banner .ins-btn.later { background:transparent; color:#000; border:1px solid #e6e6e6; }
      #survey-banner .ins-close { position:absolute; top:8px; right:8px; background:transparent; border:none; color:#fff; cursor:pointer; font-size:16px; }
      #survey-banner .ins-footer { padding:12px 16px; border-top:1px solid #f0f0f0; font-size:12px; color:#666; display:flex; justify-content:space-between; align-items:center; gap:8px; }
      #survey-banner .ins-success { color:#0a7a3d; font-weight:700; }
      #survey-banner .ins-error { color:#b00020; font-weight:700; }
      @media (max-width:480px) { #survey-banner { left:12px; right:12px; width:auto; bottom:12px; } }
    `;
    const style = document.createElement("style");
    style.id = "survey-banner-styles";
    style.textContent = css;
    document.head.appendChild(style);
  };

  const buildHTML = () => {
    const wrapper = document.createElement("div");
    wrapper.id = "survey-banner";
    wrapper.innerHTML = `
      <div class="ins-header">
        <div style="width:36px;height:36px;border-radius:6px;background:#fff;color:#000;display:flex;align-items:center;justify-content:center;font-weight:800"><svg role="presentation" viewBox="100 100 50 32" xmlns="http://www.w3.org/2000/svg"><title>Anasayfa</title><path fill-rule="evenodd" clip-rule="evenodd" d="M 150.07 131.439 L 131.925 100 L 122.206 105.606 L 137.112 131.439 L 150.07 131.439 Z M 132.781 131.439 L 120.797 110.692 L 111.078 116.298 L 119.823 131.439 L 132.781 131.439 Z M 109.718 121.401 L 115.509 131.439 L 102.551 131.439 L 100 127.007 L 109.718 121.401 Z" fill="black"></path></svg></div>
        <h3>Hızlı Anket</h3>
        <button class="ins-close" title="Kapat">✕</button>
      </div>
      <div class="ins-body">
        <div class="ins-question">Bugün adidas’tan alışveriş yapma olasılığınız nedir?</div>
        <div class="ins-options" role="list">
          <div class="ins-option" data-value="çok_muhtemel">Çok muhtemel</div>
          <div class="ins-option" data-value="muhtemel">Muhtemel</div>
          <div class="ins-option" data-value="nötr">Nötr</div>
          <div class="ins-option" data-value="muhtemel_değil">Muhtemel değil</div>
        </div>

        <div class="ins-question">Bugün siteye gelme sebebiniz nedir?</div>
        <div style="display:flex;gap:8px;margin-bottom:8px;">
          <input id="survey-input" type="text" placeholder="Arama, kampanya, ürün vs." style="flex:1;padding:8px;border:1px solid #e6e6e6;border-radius:8px" />
        </div>

        <div class="ins-actions">
          <button class="ins-btn submit">Gönder</button>
          <button class="ins-btn later">Belki sonra</button>
        </div>
      </div>
      <div class="ins-footer">
        <div class="ins-status">Yanıtınız deneyimi geliştirmemize yardımcı olur.</div>
      </div>
    `;
    document.body.appendChild(wrapper);
    return wrapper;
  };

  const setEvents = (root) => {
    const options = Array.from(root.querySelectorAll(".ins-option"));
    const input = root.querySelector("#survey-input");
    const btnSubmit = root.querySelector(".ins-btn.submit");
    const btnLater = root.querySelector(".ins-btn.later");
    const btnClose = root.querySelector(".ins-close");
    const statusEl = root.querySelector(".ins-status");

    let selected = null;

    options.forEach(opt => {
      opt.addEventListener("click", () => {
        options.forEach(o => o.classList.remove("active"));
        opt.classList.add("active");
        selected = opt.getAttribute("data-value");
      });
    });

    const hide = () => {
      root.style.display = "none";
      sendLog({ message: "survey_dismissed", level: "Info", data: { page: location.pathname, timestamp: new Date().toISOString() } });
    };
    btnClose.addEventListener("click", hide);
    btnLater.addEventListener("click", hide);

    btnSubmit.addEventListener("click", async () => {
      if (!selected && !input.value.trim()) {
        statusEl.textContent = "Lütfen bir seçenek seçin veya kısa bir açıklama yazın.";
        statusEl.style.color = "#b00020";
        return;
      }
      btnSubmit.disabled = true;
      btnSubmit.textContent = "Gönderiliyor...";
      const payload = {
        message: "survey_submission",
        level: "Info",
        data: {
          page: location.pathname,
          hostname: location.hostname,
          chosenLikelihood: selected,
          freeText: input.value.trim() || null,
          userAgent: navigator.userAgent,
          language: navigator.language,
          referrer: document.referrer || null,
          timestamp: new Date().toISOString()
        }
      };
      const res = await sendLog(payload);
      if (res.ok) {
        statusEl.innerHTML = '<span class="ins-success">Teşekkürler! Yanıtınız kaydedildi.</span>';
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ submittedAt: Date.now(), payload: payload.data }));
        await sendLog({ message: "survey_local_store", level: "Debug", data: { stored: true } });
        setTimeout(() => root.style.display = "none", 1200);
      } else {
        statusEl.innerHTML = '<span class="ins-error">Yanıtınız gönderilirken bir hata oluştu.</span>';
        btnSubmit.disabled = false;
        btnSubmit.textContent = "Gönder";
      }
    });

    sendLog({
      message: "survey_shown",
      level: "Debug",
      data: { page: location.pathname, hostname: location.hostname, timestamp: new Date().toISOString() }
    });
  };

  buildCSS();
  const root = buildHTML();
  setEvents(root);
})();
