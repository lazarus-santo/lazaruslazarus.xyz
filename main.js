const ROTATE_INTERVAL = 10 * 60 * 1000; // 10 minutes

const ARTWORKS = [
  { id: 13061,  title: "Cypress and Poppies",                       artist: "Elihu Vedder",                 image: "https://images.metmuseum.org/CRDImages/ad/original/DT7413.jpg" },
  { id: 761114, title: "Mercury and Cupid",                         artist: "Francesco Fanelli",             image: "https://images.metmuseum.org/CRDImages/es/original/DP-21676-042.jpg" },
  { id: 436669, title: "Lady Rich (Elizabeth Jenks, died 1558)",    artist: "Hans Holbein the Younger",      image: "https://images.metmuseum.org/CRDImages/ep/original/DP280377.jpg" },
  { id: 437190, title: "The Farrier",                               artist: "Aert van der Neer",             image: "https://images.metmuseum.org/CRDImages/ep/original/DP-21084-001.jpg" },
  { id: 232119, title: "Casket",                                    artist: "Michel Redlin",                 image: "https://images.metmuseum.org/CRDImages/es/original/DP151458.jpg" },
  { id: 437654, title: "Circus Sideshow (Parade de cirque)",        artist: "Georges Seurat",                image: "https://images.metmuseum.org/CRDImages/ep/original/DP375450_cropped.jpg" },
  { id: 768547, title: "The Wood Sawyer",                           artist: "Charles E. Weir",               image: "https://images.metmuseum.org/CRDImages/ad/original/AW.Weir.DebraForce.2017.jpg" },
  { id: 16345,  title: "Conversation Piece",                        artist: "Lilly Martin Spencer",          image: "https://images.metmuseum.org/CRDImages/ad/original/DT4335.jpg" },
  { id: 437873, title: "Philip IV (1605–1665), King of Spain",      artist: "Velázquez",                     image: "https://images.metmuseum.org/CRDImages/ep/original/DP239023.jpg" },
  { id: 204246, title: "Censer",                                    artist: "",                               image: "https://images.metmuseum.org/CRDImages/es/original/LC-64_164_145.jpg" },
];

let lastIndex = -1;

function getRandomArtwork() {
  let idx;
  do { idx = Math.floor(Math.random() * ARTWORKS.length); }
  while (idx === lastIndex && ARTWORKS.length > 1);
  lastIndex = idx;
  return Promise.resolve(ARTWORKS[idx]);
}

function setCredit(title, artist) {
  const el = document.getElementById('artwork-credit');
  if (!el) return;
  el.textContent = artist ? `${title} — ${artist}` : title;
}

const bg = document.getElementById('bg');
const bgNext = document.getElementById('bg-next');

async function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(url);
    img.onerror = reject;
    img.src = url;
  });
}

async function rotateBackground() {
  try {
    const artwork = await getRandomArtwork();
    await loadImage(artwork.image);

    bgNext.style.backgroundImage = `url('${artwork.image}')`;
    bgNext.style.opacity = '1';

    setTimeout(() => {
      bg.style.backgroundImage = `url('${artwork.image}')`;
      bgNext.style.opacity = '0';
      setCredit(artwork.title, artwork.artist);
    }, 1300);
  } catch (err) {
    console.warn('Could not load Met artwork:', err);
  }
}

// Init
rotateBackground();
setInterval(rotateBackground, ROTATE_INTERVAL);

// ─── FAVICON ─────────────────────────────────────────────
function setFavicon() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#e2ce3a';
  ctx.font = 'bold 52px Array, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('L', 32, 34);

  const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
  link.rel = 'icon';
  link.href = canvas.toDataURL('image/png');
  document.head.appendChild(link);
}

document.fonts.ready.then(setFavicon);

// ─── KLAVIYO EMAIL SIGNUP ─────────────────────────────────
const KLAVIYO_PUBLIC_KEY = 'pk_0d2feaaae4ebad5bc88fca4b9134db26fd';
const KLAVIYO_LIST_ID = 'UmWFM7';

const signupForm = document.querySelector('.signup-form');

if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = signupForm.querySelector('input[type="email"]');
    const btn = signupForm.querySelector('button');
    const email = input.value.trim();
    if (!email) return;

    btn.textContent = '...';
    btn.disabled = true;

    try {
      const res = await fetch(
        `https://a.klaviyo.com/client/subscriptions/?company_id=${KLAVIYO_PUBLIC_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'revision': '2023-12-15',
          },
          body: JSON.stringify({
            data: {
              type: 'subscription',
              attributes: {
                custom_source: 'Lazarus Website',
                profile: {
                  data: {
                    type: 'profile',
                    attributes: { email },
                  },
                },
                list_id: KLAVIYO_LIST_ID,
              },
            },
          }),
        }
      );

      if (res.ok || res.status === 202) {
        input.value = '';
        btn.textContent = '✓';
        setTimeout(() => {
          btn.textContent = '→';
          btn.disabled = false;
        }, 3000);
      } else {
        throw new Error(`Status ${res.status}`);
      }
    } catch (err) {
      console.warn('Klaviyo signup error:', err);
      btn.textContent = '→';
      btn.disabled = false;
    }
  });
}
