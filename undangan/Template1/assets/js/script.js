document.addEventListener("DOMContentLoaded", function () {
  // --- 0. INISIALISASI & VARIABEL GLOBAL ---
  AOS.init({
    duration: 1000,
    once: true,
  });

  const sampul = document.getElementById("sampul");
  const bukaUndanganBtn = document.getElementById("buka-undangan");
  const kontenUtama = document.getElementById("konten-utama");
  const audio = document.getElementById("background-audio");
  const vinylRecord = document.getElementById("vinyl-record");
  const bottomNav = document.getElementById("bottom-nav");
  const rsvpForm = document.getElementById("rsvp-form");
  const pesanForm = document.getElementById("pesan-form");
  const detailAmplop = document.getElementById("detail-amplop");
  const envelopeWrapper = document.getElementById("envelope-wrapper");

  const elements = {
    pageTitle: document.querySelector("title"),
    sampulNama: document.getElementById("sampul-nama-mempelai"),
    audio: document.getElementById("background-audio"),
    namaPria: document.getElementById("nama-pria"),
    orangtuaPria: document.getElementById("orangtua-pria"),
    namaWanita: document.getElementById("nama-wanita"),
    orangtuaWanita: document.getElementById("orangtua-wanita"),
    tanggalAkad: document.getElementById("tanggal-akad"),
    waktuAkad: document.getElementById("waktu-akad"),
    tanggalResepsi: document.getElementById("tanggal-resepsi"),
    waktuResepsi: document.getElementById("waktu-resepsi"),
    lokasiAcara: document.getElementById("lokasi-acara"),
    mapsUrl: document.getElementById("maps-url"),
    ceritaContainer: document.getElementById("cerita-container"),
    galeriContainer: document.getElementById("galeri-container"),
    namaBank: document.getElementById("nama-bank"),
    nomorRekening: document.getElementById("nomor-rekening"),
    namaEwallet: document.getElementById("nama-ewallet"),
    nomorEwallet: document.getElementById("nomor-ewallet"),
    footerNama: document.getElementById("footer-nama-mempelai"),
    // Tambahkan ID lain di sini jika ada
  };

  async function loadWeddingData() {
    let slug = null;

    // --- 1. Coba metode Vercel (URL Path) ---
    // --- 1. Coba metode Vercel (URL Path dengan akhiran -wedding) ---
    const path = window.location.pathname; // contoh: "/rudi-siti-wedding"
    if (path.endsWith("-wedding")) {
      // Menghapus '/ ' di awal dan '-wedding' di akhir untuk mendapatkan slug
      slug = path.substring(1, path.length - "-wedding".length);
      console.log("Mode: Vercel. Slug ditemukan dari path:", slug);
    }

    // --- 2. Jika metode Vercel gagal, coba metode Localhost (Query Parameter) ---
    if (!slug) {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has("undangan")) {
        slug = urlParams.get("undangan");
        console.log("Mode: Localhost. Slug ditemukan dari query param:", slug);
      }
    }

    // --- 3. Jika slug tidak ditemukan, tampilkan pesan error ---
    if (!slug) {
      console.error(
        "Slug undangan tidak ditemukan di URL path maupun query parameter."
      );
      document.body.innerHTML = `<div style="text-align: center; padding: 50px;"><h1>Error</h1><p>Tidak ada data undangan yang bisa ditampilkan.</p><p>Pastikan URL Anda benar.</p></div>`;
      return;
    }

    // --- 4. Ambil dan tampilkan data JSON berdasarkan slug ---
    try {
      // Path absolut dari root domain, bekerja di mana saja
      const response = await fetch(`/undangan/data/${slug}.json`);
      if (!response.ok) {
        throw new Error(`File data untuk "${slug}" tidak ditemukan.`);
      }
      const data = await response.json();

      // Mengisi data ke elemen HTML
      elements.pageTitle.textContent = `Undangan Pernikahan ${data.nama_wanita} & ${data.nama_pria}`;
      if (elements.sampulNama)
        elements.sampulNama.textContent = `${data.sapaan_wanita} & ${data.sapaan_pria}`;
      if (elements.audio) elements.audio.src = data.musik;
      if (elements.namaPria) elements.namaPria.textContent = data.nama_pria;
      if (elements.orangtuaPria)
        elements.orangtuaPria.textContent = data.orangtua_pria;
      if (elements.namaWanita)
        elements.namaWanita.textContent = data.nama_wanita;
      if (elements.orangtuaWanita)
        elements.orangtuaWanita.textContent = data.orangtua_wanita;
      if (elements.tanggalAkad)
        elements.tanggalAkad.innerHTML = data.tanggal_akad.replace(
          /, /g,
          ",<br/>"
        );
      if (elements.waktuAkad) elements.waktuAkad.textContent = data.waktu_akad;
      if (elements.tanggalResepsi)
        elements.tanggalResepsi.innerHTML = data.tanggal_resepsi.replace(
          /, /g,
          ",<br/>"
        );
      if (elements.waktuResepsi)
        elements.waktuResepsi.textContent = data.waktu_resepsi;
      if (elements.lokasiAcara)
        elements.lokasiAcara.textContent = `Alamat : ${data.lokasi.nama}`;
      if (elements.mapsUrl) elements.mapsUrl.href = data.maps_url;

      // =======================================================
      // BAGIAN BARU: Logika untuk mengisi "Cerita Kami"
      // =======================================================
      if (elements.ceritaContainer && data.cerita) {
        elements.ceritaContainer.innerHTML = ""; // Kosongkan dulu isinya
        data.cerita.forEach((item, index) => {
          // Menentukan layout (kiri atau kanan) berdasarkan urutan
          const isReversed = index % 2 !== 0;
          const fadeDirection = isReversed ? "fade-left" : "fade-right";
          const layoutClass = isReversed
            ? "md:flex-row-reverse"
            : "md:flex-row";

          const ceritaElement = document.createElement("div");
          ceritaElement.className = `flex flex-col ${layoutClass} items-center mb-12`;
          ceritaElement.setAttribute("data-aos", fadeDirection);

          ceritaElement.innerHTML = `
            <div class="md:w-1/2 md:pr-8 mb-4 md:mb-0">
              <img src="${item.gambar}" alt="${item.judul}" class="rounded-lg shadow-lg w-full" />
            </div>
            <div class="md:w-1/2 md:pl-8 text-center md:text-left">
              <h3 class="font-playfair text-3xl text-gray-700 mb-2">${item.judul}</h3>
              <p>${item.deskripsi}</p>
            </div>
          `;
          elements.ceritaContainer.appendChild(ceritaElement);
        });
      }

      // =======================================================
      // BAGIAN BARU: Logika untuk mengisi "Galeri"
      // =======================================================
      if (elements.galeriContainer && data.galeri) {
        elements.galeriContainer.innerHTML = ""; // Kosongkan dulu isinya

        // Membagi gambar menjadi 4 kolom
        const columns = [[], [], [], []];
        data.galeri.forEach((imgSrc, index) => {
          columns[index % 4].push(imgSrc);
        });

        columns.forEach((columnImages) => {
          const columnDiv = document.createElement("div");
          columnDiv.className = "grid gap-4";

          columnImages.forEach((imgSrc) => {
            columnDiv.innerHTML += `
              <div data-aos="zoom-in">
                <img class="h-auto max-w-full rounded-lg" src="${imgSrc}" alt="Galeri Pernikahan" />
              </div>
            `;
          });
          elements.galeriContainer.appendChild(columnDiv);
        });
      }

      // =======================================================
      // BAGIAN BARU: Logika untuk mengisi "Amplop Digital"
      // =======================================================
      if (data.rekening) {
        if (elements.namaBank && data.rekening.bank) {
          elements.namaBank.textContent = data.rekening.bank.nama;
        }
        if (elements.nomorRekening && data.rekening.bank) {
          elements.nomorRekening.textContent = `${data.rekening.bank.nomor} (a.n. ${data.rekening.bank.atas_nama})`;
        }
        if (elements.namaEwallet && data.rekening.ewallet) {
          elements.namaEwallet.textContent =
            data.rekening.ewallet.nama || "E-Wallet";
        }
        if (elements.nomorEwallet && data.rekening.ewallet) {
          elements.nomorEwallet.textContent = `${data.rekening.ewallet.nomor} (a.n. ${data.rekening.ewallet.atas_nama})`;
        }
      }

      // =======================================================
      // BAGIAN BARU: Logika untuk mengisi "Footer"
      // =======================================================
      if (elements.footerNama && data.sapaan_pria && data.sapaan_wanita) {
        elements.footerNama.textContent = `${data.sapaan_wanita} & ${data.sapaan_pria}`;
      }
    } catch (error) {
      console.error("Gagal memuat atau menampilkan data pernikahan:", error);
      document.body.innerHTML = `<div style="text-align: center; padding: 50px;"><h1>404</h1><p>Maaf, data undangan untuk <strong>${slug}</strong> tidak ditemukan.</p></div>`;
    }
  }

  // --- Jalankan semua fungsi lain dan logika UI Anda di sini ---
  loadWeddingData();

  // --- 1. LOGIKA SAMPUL & MUSIK ---
  document.body.classList.add("no-scroll");
  const urlParams = new URLSearchParams(window.location.search);
  const namaTamu = urlParams.get("to") || "Bapak/Ibu/Saudara/i";
  document.getElementById("nama-tamu").textContent =
    decodeURIComponent(namaTamu);

  bukaUndanganBtn.addEventListener("click", () => {
    sampul.classList.add(
      "transition-all",
      "duration-1000",
      "opacity-0",
      "-translate-y-full"
    );
    setTimeout(() => {
      sampul.style.display = "none";
    }, 1000);
    document.body.classList.remove("no-scroll");
    kontenUtama.classList.remove("hidden");
    bottomNav.classList.remove("hidden");
    bottomNav.classList.add("flex");
    audio
      .play()
      .catch((error) => console.log("Autoplay dicegah oleh browser."));
    vinylRecord.classList.add("spinning");
  });

  vinylRecord.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      vinylRecord.classList.add("spinning");
    } else {
      audio.pause();
      vinylRecord.classList.remove("spinning");
    }
  });

  // --- 2. LOGIKA HITUNG MUNDUR ---
  const weddingDate = new Date("Dec 10, 2025 09:00:00").getTime();
  const countdownFunction = setInterval(() => {
    const now = new Date().getTime();
    const distance = weddingDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("days").innerText = days
      .toString()
      .padStart(2, "0");
    document.getElementById("hours").innerText = hours
      .toString()
      .padStart(2, "0");
    document.getElementById("minutes").innerText = minutes
      .toString()
      .padStart(2, "0");
    document.getElementById("seconds").innerText = seconds
      .toString()
      .padStart(2, "0");
    if (distance < 0) {
      clearInterval(countdownFunction);
      document.getElementById("countdown").innerHTML =
        "Acara Telah Berlangsung";
    }
  }, 1000);

  // --- 3. LOGIKA NAVIGASI BAWAH (SCROLL & ACTIVE STATE) ---
  const navItems = document.querySelectorAll(".nav-item");
  const sections = document.querySelectorAll("main section");

  // === BAGIAN YANG HILANG & KINI DIKEMBALIKAN ===
  navItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault(); // Mencegah lompatan instan
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth", // Melakukan smooth scroll
        });
      }
    });
  });
  // ===============================================

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navItems.forEach((item) => {
            const link = item.getAttribute("href");
            if (link && link.substring(1) === entry.target.id) {
              item.classList.add("active");
            } else {
              item.classList.remove("active");
            }
          });
        }
      });
    },
    { rootMargin: "-50% 0px -50% 0px" }
  );

  sections.forEach((section) => observer.observe(section));

  // --- 4. LOGIKA FORM RSVP (KIRIM KE GOOGLE SHEET) ---
  const scriptURLRSVP = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";
  const rsvpFeedback = document.getElementById("rsvp-feedback");
  if (rsvpForm) {
    rsvpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const button = rsvpForm.querySelector('button[type="submit"]');
      button.disabled = true;
      button.innerHTML = "Mengirim...";
      fetch(scriptURLRSVP, { method: "POST", body: new FormData(rsvpForm) })
        .then((response) => {
          button.innerHTML = "Kirim Konfirmasi";
          button.disabled = false;
          if (rsvpFeedback)
            rsvpFeedback.textContent =
              "Terima kasih, konfirmasi Anda telah kami terima!";
          if (rsvpFeedback)
            rsvpFeedback.className = "text-green-600 text-center mt-4";
          rsvpForm.reset();
        })
        .catch((error) => {
          button.innerHTML = "Kirim Konfirmasi";
          button.disabled = false;
          if (rsvpFeedback)
            rsvpFeedback.textContent =
              "Maaf, terjadi kesalahan. Silakan coba lagi.";
          if (rsvpFeedback)
            rsvpFeedback.className = "text-red-600 text-center mt-4";
        });
    });
  }

  // --- 5. LOGIKA FORM PESAN & DOA (SIMULASI LIVE) ---
  const daftarPesan = document.getElementById("daftar-pesan");
  if (pesanForm) {
    pesanForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nama = document.getElementById("nama_pesan").value;
      const pesan = document.getElementById("pesan").value;
      const pesanBaru = document.createElement("div");
      pesanBaru.className = "border-b pb-4 mb-4";
      pesanBaru.innerHTML = `<p class="font-semibold">${nama}</p><p class="text-gray-600">${pesan}</p>`;
      if (daftarPesan) daftarPesan.prepend(pesanBaru);
      pesanForm.reset();
    });
  }

  // --- 6. LOGIKA AMPLOP DIGITAL (Versi CSS Interaktif) ---
  if (envelopeWrapper && detailAmplop) {
    envelopeWrapper.addEventListener("click", () => {
      envelopeWrapper.classList.add("open");
      envelopeWrapper.style.cursor = "default";
      setTimeout(() => {
        envelopeWrapper.style.display = "none";
        detailAmplop.classList.remove("hidden");
        setTimeout(() => {
          detailAmplop.classList.add("visible");
        }, 50);
      }, 1000);
    });
  }
}); // Akhir dari event listener DOMContentLoaded

// --- FUNGSI GLOBAL (DI LUAR DOMContentLoaded) ---
function copyToClipboard(elementId) {
  const element = document.getElementById(elementId);
  if (!element) return;

  // Mengambil teks utama tanpa nama dalam kurung
  const textToCopy = element.innerText.split(" (")[0];

  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      const feedback = document.getElementById("copy-feedback");
      if (feedback) feedback.textContent = "Berhasil disalin!";
      setTimeout(() => {
        if (feedback) feedback.textContent = "";
      }, 2000);
    })
    .catch((err) => console.error("Gagal menyalin: ", err));
}
