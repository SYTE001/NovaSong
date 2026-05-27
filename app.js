/* ============================
   LOCAL MUSIC PLAYER PWA
   All features offline & local
   ============================ */

const PRELOADED_SONGS = [
  {
    id: "dummy-1",
    title: "Starlight Synthwave",
    artist: "Synthwave Horizon",
    album: "Neon Dreams",
    cover: "synthwave_cover.png",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    lyrics: "[00:05.00]🎵 (Instrumental Synthwave Intro)\n[00:15.00]Cruising down the neon grid\n[00:22.00]Beneath the digital sunset sky\n[00:30.00]Retro future vibes in my head\n[00:38.00]Watching the pixels pass us by\n[00:46.00]🎵 (Starlight Synthwave Solo)\n[01:05.00]We're riding the waves of synth\n[01:12.00]Lost in the infinite highway\n[01:20.00]Endless loop of starlight\n[01:28.00]🎵 (Synthwave Outro)",
    addedAt: Date.now()
  },
  {
    id: "dummy-2",
    title: "Cozy Lofi Rain",
    artist: "Lofi Study Beats",
    album: "Chilled Afternoon",
    cover: "lofi_cover.png",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    lyrics: "[00:03.00]🌧️ (Soft Rain Sounds)\n[00:10.00]Raindrops tapping on the glass\n[00:18.00]A warm cup of tea by my side\n[00:26.00]Pages turning, time moves slow\n[00:34.00]No worries, no place to hide\n[00:42.00]🎵 (Chill Piano Riff)\n[01:02.00]Let the beat wash your stress away\n[01:10.00]Drifting into the cozy vibe\n[01:18.00]Rainy day, peaceful mind\n[01:26.00]🌧️ (Rain Outro)",
    addedAt: Date.now() - 86400000
  },
  {
    id: "dummy-3",
    title: "Holographic Ambient",
    artist: "Astral Nebula",
    album: "Deep Cosmos",
    cover: "ambient_cover.png",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    lyrics: "[00:05.00]🌌 (Ethereal Cosmic Intro)\n[00:20.00]Floating in the holographic space\n[00:35.00]Nebula colors swirling around\n[00:50.00]Weightless, absolute peace\n[01:05.00]No words, just cosmic sound\n[01:20.00]🎵 (Ambient Echoes)\n[02:00.00]Drifting through the astral gates\n[02:30.00]Endless galaxy of light",
    addedAt: Date.now() - 172800000
  }
];

// Gradient palettes for auto-generated covers / avatars
const COVER_GRADIENTS = [
  ['#667eea', '#764ba2'], ['#f093fb', '#f5576c'], ['#4facfe', '#00f2fe'],
  ['#43e97b', '#38f9d7'], ['#fa709a', '#fee140'], ['#a18cd1', '#fbc2eb'],
  ['#fccb90', '#d57eeb'], ['#e0c3fc', '#8ec5fc'], ['#f5576c', '#ff9a9e'],
  ['#667eea', '#6dd5ed'], ['#ff6a00', '#ee0979'], ['#21d4fd', '#b721ff'],
  ['#08aeea', '#2af598'], ['#fee140', '#fa709a'], ['#fbc2eb', '#a6c1ee']
];

// Inline SVG Icons — replaces entire Phosphor Icons library (~80-120MB runtime savings)
const IC = {
  musicNotes: '<svg class="ic" viewBox="0 0 24 24" fill="currentColor"><path d="M9 17a3 3 0 11-3-3h1V5.5L19 3v11a3 3 0 11-3-3h1V6.85L9 8.35V17z"/></svg>',
  play: '<svg class="ic" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4l14 8-14 8z"/></svg>',
  pause: '<svg class="ic" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>',
  playCircle: '<svg class="ic" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>',
  pauseCircle: '<svg class="ic" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h-2V8h2v8zm4 0h-2V8h2v8z"/></svg>',
  skipForward: '<svg class="ic" viewBox="0 0 24 24" fill="currentColor"><path d="M5 4l10 8-10 8V4zm12 0h2v16h-2V4z"/></svg>',
  skipBack: '<svg class="ic" viewBox="0 0 24 24" fill="currentColor"><path d="M19 20L9 12l10-8v16zM5 4h2v16H5V4z"/></svg>',
  repeat: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 2l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>',
  repeatOnce: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 2l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/><text x="12" y="14" text-anchor="middle" font-size="8" font-weight="700" fill="currentColor" stroke="none">1</text></svg>',
  heart: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"/></svg>',
  heartFill: '<svg class="ic" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"/></svg>',
};

class MusicPlayerApp {
  constructor() {
    this.audio = new Audio();
    this.db = null;
    this.songs = [];
    this.playlists = [];
    this.queue = [];
    this.currentIndex = 0;
    this.repeatMode = 'off';
    this.shuffle = false;
    this.currentObjectURL = null;
    this.lastSaveTime = 0;
    this.favorites = new Set(JSON.parse(localStorage.getItem('music-favorites') || '[]'));
    this.playHistory = JSON.parse(localStorage.getItem('music-history') || '[]');

    // Web Audio API nodes
    this.audioCtx = null;
    this.analyser = null;
    this.gainNode = null;
    this.sourceNode = null;
    this.visualizerRAF = null;
    this.crossfadeTimeout = null;

    // Advanced Visualizer State
    this.visualizerMode = 0;
    this.visualizerPeaks = [];
    this.visualizerParticles = [];
    this.visualizerSmoothed = [];
    this.visualizerPhase = 0;
    this.visualizerModeChangeTime = 0;
    this._cachedAccentRGB = '29, 185, 84';

    // Dominant color cache (limited to 15 entries)
    this.colorCache = {};
    this._colorCacheKeys = [];

    // Toast debounce
    this._toastTimeout = null;

    // Search debounce
    this._searchTimeout = null;

    this.init();
  }

  async init() {
    await this.initDB();
    await this.loadSongs();
    await this.loadPlaylists();
    this.bindUI();
    this.restoreState();
    this.renderLibrary();
    this.renderPlaylists();
    this.renderForYou();
  }

  // =====================
  // UI BINDING
  // =====================
  bindUI() {
    // Navigation inside Sidebar
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll('.sidebar-nav .nav-item').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        const viewId = btn.dataset.view;
        document.getElementById(viewId).classList.add('active');

        // Refresh For You when selected
        if (viewId === 'foryou') this.renderForYou();

        // Close sidebar on mobile after clicking
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        if (sidebar && overlay) {
          sidebar.classList.remove('open');
          overlay.classList.remove('active');
        }
      };
    });

    // Library Sub-Tabs
    document.querySelectorAll('.lib-tab').forEach(tab => {
      tab.onclick = () => {
        document.querySelectorAll('.lib-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.querySelectorAll('.lib-tab-content').forEach(c => c.classList.remove('active'));
        const tabId = tab.dataset.tab;
        document.getElementById(tabId).classList.add('active');

        // Render the content for the selected tab
        if (tabId === 'albums') this.renderAlbums();
        else if (tabId === 'artists') this.renderArtists();
        else if (tabId === 'recentlyAdded') this.renderRecentlyAdded();
        else if (tabId === 'favorites') this.renderFavorites();
      };
    });

    // Sidebar Toggles
    const sidebarToggle = document.getElementById('sidebarToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebar = document.getElementById('sidebar');

    if (sidebarToggle && sidebar) {
      sidebarToggle.onclick = (e) => {
        e.stopPropagation();
        if (window.innerWidth >= 768) {
          sidebar.classList.toggle('collapsed');
        } else {
          sidebar.classList.add('open');
          if (sidebarOverlay) sidebarOverlay.classList.add('active');
        }
      };
    }

    if (closeSidebar && sidebar) {
      closeSidebar.onclick = () => {
        sidebar.classList.remove('open');
        if (sidebarOverlay) sidebarOverlay.classList.remove('active');
      };
    }

    if (sidebarOverlay && sidebar) {
      sidebarOverlay.onclick = () => {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
      };
    }

    // Import Logic
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const importBtn = document.getElementById('importFolder');
    if (isMobile && importBtn) {
      importBtn.innerHTML = '<span>' + IC.musicNotes + '</span> Import Music Files';
    }

    if (importBtn) {
      importBtn.onclick = () => this.importMusic();
    }

    // Fallback file input handler
    const fallbackInput = document.getElementById('fallbackInput');
    if (fallbackInput) {
      fallbackInput.onchange = async (e) => {
        const files = Array.from(e.target.files);
        await this.importFromFileList(files);
      };
    }

    // Mobile-friendly standard file input handler
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.onchange = async (e) => {
        const files = Array.from(e.target.files);
        await this.importFromFileList(files);
      };
    }

    // Search (debounced 300ms)
    document.getElementById('searchInput').oninput = e => {
      clearTimeout(this._searchTimeout);
      this._searchTimeout = setTimeout(() => {
        const q = e.target.value.toLowerCase();
        const result = this.songs.filter(s =>
          s.title.toLowerCase().includes(q) ||
          s.artist.toLowerCase().includes(q) ||
          s.album.toLowerCase().includes(q)
        );
        this.renderSongs(result, document.getElementById('searchResults'));
      }, 300);
    };

    // Mini player opens Now Playing
    document.getElementById('miniPlayer').onclick = () => {
      document.getElementById('nowPlaying').classList.add('show');
      this.startVisualizer();
    };

    document.getElementById('closeNow').onclick = (e) => {
      e.stopPropagation();
      document.getElementById('nowPlaying').classList.remove('show');
      this.stopVisualizer();
    };

    // Transport controls
    document.getElementById('playBtn').onclick = () => this.togglePlay();
    document.getElementById('miniPlay').onclick = (e) => {
      e.stopPropagation();
      this.togglePlay();
    };
    document.getElementById('nextBtn').onclick = () => this.next();
    document.getElementById('miniNext').onclick = (e) => {
      e.stopPropagation();
      this.next();
    };
    document.getElementById('prevBtn').onclick = () => this.prev();

    document.getElementById('shuffleBtn').onclick = () => {
      this.shuffle = !this.shuffle;
      document.getElementById('shuffleBtn').classList.toggle('active', this.shuffle);
      this.toast(this.shuffle ? 'Shuffle ON' : 'Shuffle OFF');
    };

    document.getElementById('repeatBtn').onclick = () => {
      const order = ['off', 'all', 'one'];
      this.repeatMode = order[(order.indexOf(this.repeatMode) + 1) % 3];
      const repeatBtn = document.getElementById('repeatBtn');
      if (this.repeatMode === 'off') {
        repeatBtn.classList.remove('active');
        repeatBtn.innerHTML = IC.repeat;
      } else if (this.repeatMode === 'all') {
        repeatBtn.classList.add('active');
        repeatBtn.innerHTML = IC.repeat;
      } else if (this.repeatMode === 'one') {
        repeatBtn.classList.add('active');
        repeatBtn.innerHTML = IC.repeatOnce;
      }
      this.toast('Repeat: ' + this.repeatMode.toUpperCase());
    };

    // Volume slider
    const volumeSlider = document.getElementById('volumeSlider');
    if (volumeSlider) {
      volumeSlider.oninput = (e) => {
        this.audio.volume = e.target.value / 100;
      };
    }

    // Time update
    this.audio.ontimeupdate = () => {
      const p = (this.audio.currentTime / this.audio.duration) * 100 || 0;
      document.getElementById('seekBar').value = p;
      document.getElementById('miniProgress').style.width = p + '%';
      document.getElementById('currentTime').textContent = this.format(this.audio.currentTime);
      document.getElementById('duration').textContent = this.format(this.audio.duration);
      this.updateLyrics();

      // Throttle localStorage saving
      const now = Date.now();
      if (now - this.lastSaveTime > 1500) {
        localStorage.setItem('music-state', JSON.stringify({
          songId: this.queue[this.currentIndex]?.id,
          time: this.audio.currentTime
        }));
        this.lastSaveTime = now;
      }
    };

    document.getElementById('seekBar').oninput = e => {
      this.audio.currentTime = (e.target.value / 100) * this.audio.duration;
    };

    this.audio.onended = () => this.next();

    // Playlist creation
    document.getElementById('newPlaylist').onclick = () => {
      const name = prompt('Nama playlist:');
      if (!name) return;
      this.playlists.push({ id: Date.now(), name, songs: [] });
      this.savePlaylists();
      this.renderPlaylists();
    };
  }

  // =====================
  // IndexedDB
  // =====================
  async initDB() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open('music-player-db', 2);
      req.onupgradeneeded = e => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('songs')) {
          db.createObjectStore('songs', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('playlists')) {
          db.createObjectStore('playlists', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('covers')) {
          db.createObjectStore('covers', { keyPath: 'id' });
        }
      };
      req.onsuccess = () => {
        this.db = req.result;
        resolve();
      };
      req.onerror = reject;
    });
  }

  async saveSong(song) {
    return new Promise(resolve => {
      const tx = this.db.transaction('songs', 'readwrite');
      tx.objectStore('songs').put(song);
      tx.oncomplete = resolve;
    });
  }

  async loadSongs() {
    return new Promise(resolve => {
      const tx = this.db.transaction('songs', 'readonly');
      const req = tx.objectStore('songs').getAll();
      req.onsuccess = async () => {
        this.songs = req.result || [];
        if (this.songs.length === 0) {
          for (const s of PRELOADED_SONGS) {
            await this.saveSong(s);
            this.songs.push(s);
          }
        }
        resolve();
      };
    });
  }

  async savePlaylists() {
    const tx = this.db.transaction('playlists', 'readwrite');
    const store = tx.objectStore('playlists');
    this.playlists.forEach(p => store.put(p));
  }

  async loadPlaylists() {
    return new Promise(resolve => {
      const tx = this.db.transaction('playlists', 'readonly');
      const req = tx.objectStore('playlists').getAll();
      req.onsuccess = () => {
        this.playlists = req.result || [];
        resolve();
      };
    });
  }

  async saveCover(id, base64) {
    try {
      const tx = this.db.transaction('covers', 'readwrite');
      tx.objectStore('covers').put({ id, data: base64 });
    } catch (e) { /* ignore */ }
  }

  async loadCover(id) {
    return new Promise(resolve => {
      try {
        const tx = this.db.transaction('covers', 'readonly');
        const req = tx.objectStore('covers').get(id);
        req.onsuccess = () => resolve(req.result?.data || null);
        req.onerror = () => resolve(null);
      } catch (e) { resolve(null); }
    });
  }

  // =====================
  // IMPORT MUSIC
  // =====================
  async importMusic() {
    try {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile) {
        const fileInput = document.getElementById('fileInput');
        if (fileInput) fileInput.click();
        return;
      }

      let files = [];
      if (window.showDirectoryPicker) {
        const dir = await window.showDirectoryPicker();
        files = await this.walkWithMeta(dir, '');
      } else {
        const fallbackInput = document.getElementById('fallbackInput');
        if (fallbackInput) fallbackInput.click();
        return;
      }

      // Group files by directory
      const grouped = this.groupFilesByDir(files);

      for (const [dirPath, dirFiles] of Object.entries(grouped)) {
        const audioFiles = dirFiles.filter(f => /\.(mp3|wav|ogg|flac|aac)$/i.test(f.name));
        const imageFiles = dirFiles.filter(f => /\.(jpg|jpeg|png)$/i.test(f.name));
        const textFiles = dirFiles.filter(f => /\.(lrc|txt)$/i.test(f.name));

        for (const audioFile of audioFiles) {
          await this.processFile(audioFile, imageFiles, textFiles);
        }
      }

      this.renderLibrary();
      this.toast('Import selesai! ' + this.songs.length + ' lagu');
    } catch (e) {
      console.error(e);
      this.toast('Import gagal');
    }
  }

  async importFromFileList(files) {
    try {
      if (files.length > 0) {
        this.toast('Memproses ' + files.length + ' berkas...');
      }
      // Group by webkitRelativePath directory
      const grouped = {};
      for (const file of files) {
        const parts = file.webkitRelativePath ? file.webkitRelativePath.split('/') : [];
        const dir = parts.slice(0, -1).join('/') || '.';
        if (!grouped[dir]) grouped[dir] = [];
        grouped[dir].push(file);
      }

      for (const [dirPath, dirFiles] of Object.entries(grouped)) {
        const audioFiles = dirFiles.filter(f => /\.(mp3|wav|ogg|flac|aac)$/i.test(f.name));
        const imageFiles = dirFiles.filter(f => /\.(jpg|jpeg|png)$/i.test(f.name));
        const textFiles = dirFiles.filter(f => /\.(lrc|txt)$/i.test(f.name));

        for (const audioFile of audioFiles) {
          await this.processFileFromInput(audioFile, imageFiles, textFiles);
        }
      }

      this.renderLibrary();
      this.toast('Import selesai! ' + this.songs.length + ' lagu');
    } catch (e) {
      console.error(e);
      this.toast('Import gagal');
    }
  }

  async walkWithMeta(dir, basePath) {
    const out = [];
    for await (const entry of dir.values()) {
      const path = basePath ? `${basePath}/${entry.name}` : entry.name;
      if (entry.kind === 'file') {
        out.push({ handle: entry, name: entry.name, dir: basePath, path });
      } else if (entry.kind === 'directory') {
        const nested = await this.walkWithMeta(entry, path);
        out.push(...nested);
      }
    }
    return out;
  }

  groupFilesByDir(files) {
    const grouped = {};
    for (const f of files) {
      const dir = f.dir || '.';
      if (!grouped[dir]) grouped[dir] = [];
      grouped[dir].push(f);
    }
    return grouped;
  }

  async processFile(fileInfo, imageFiles, textFiles) {
    try {
      const file = await fileInfo.handle.getFile();
      const meta = await this.readTags(file);

      let picture = meta.picture || '';

      // Fallback 1: Look for cover image in same directory
      if (!picture && imageFiles.length > 0) {
        const coverNames = ['cover.jpg', 'folder.jpg', 'albumart.jpg', 'front.png', 'cover.png', 'folder.png'];
        for (const cn of coverNames) {
          const match = imageFiles.find(f => f.name.toLowerCase() === cn);
          if (match) {
            try {
              const imgFile = await match.handle.getFile();
              const reader = new FileReader();
              picture = await new Promise(resolve => {
                reader.onload = () => resolve(reader.result);
                reader.onerror = () => resolve('');
                reader.readAsDataURL(imgFile);
              });
            } catch (e) { /* skip */ }
            break;
          }
        }
      }

      // Find lyrics file
      let lyrics = '';
      const baseName = file.name.replace(/\.[^.]+$/, '');
      const lyricsSearchNames = [
        `${baseName}.lrc`, `${baseName}.txt`,
        `lyrics/${baseName}.lrc`, `lyrics/${baseName}.txt`
      ];
      for (const ln of lyricsSearchNames) {
        const match = textFiles.find(f =>
          f.name.toLowerCase() === ln.split('/').pop().toLowerCase()
        );
        if (match) {
          try {
            const txtFile = await match.handle.getFile();
            lyrics = await txtFile.text();
          } catch (e) { /* skip */ }
          break;
        }
      }

      const song = {
        id: crypto.randomUUID(),
        title: meta.title || file.name.replace(/\.[^.]+$/, ''),
        artist: meta.artist || 'Unknown Artist',
        album: meta.album || 'Unknown Album',
        cover: picture ? await this.resizeCover(picture) : '',
        handle: fileInfo.handle,
        lyrics,
        addedAt: Date.now()
      };

      // Fallback 2: Generate cover via Canvas if still empty
      if (!song.cover) {
        song.cover = this.generateCoverArt(song.artist, song.album);
      }

      await this.saveSong(song);
      this.songs.push(song);
    } catch (e) {
      console.error(e);
    }
  }

  async processFileFromInput(file, imageFiles, textFiles) {
    try {
      const meta = await this.readTags(file);
      let picture = meta.picture || '';

      // Fallback 1: Cover image from same folder
      if (!picture && imageFiles.length > 0) {
        const coverNames = ['cover.jpg', 'folder.jpg', 'albumart.jpg', 'front.png', 'cover.png'];
        for (const cn of coverNames) {
          const match = imageFiles.find(f => f.name.toLowerCase() === cn);
          if (match) {
            const reader = new FileReader();
            picture = await new Promise(resolve => {
              reader.onload = () => resolve(reader.result);
              reader.onerror = () => resolve('');
              reader.readAsDataURL(match);
            });
            break;
          }
        }
      }

      // Find lyrics file
      let lyrics = '';
      const baseName = file.name.replace(/\.[^.]+$/, '');
      for (const tf of textFiles) {
        const tfBase = tf.name.replace(/\.[^.]+$/, '');
        if (tfBase.toLowerCase() === baseName.toLowerCase()) {
          lyrics = await tf.text();
          break;
        }
      }

      const song = {
        id: crypto.randomUUID(),
        title: meta.title || file.name.replace(/\.[^.]+$/, ''),
        artist: meta.artist || 'Unknown Artist',
        album: meta.album || 'Unknown Album',
        cover: picture ? await this.resizeCover(picture) : '',
        lyrics,
        addedAt: Date.now()
      };

      // Store blob reference but DON'T keep the whole File — store as objectURL
      song._blobUrl = URL.createObjectURL(file);

      // Fallback 2: Generate cover
      if (!song.cover) {
        song.cover = this.generateCoverArt(song.artist, song.album);
      }

      await this.saveSong(song);
      this.songs.push(song);
    } catch (e) {
      console.error(e);
    }
  }

  async readTags(file) {
    return new Promise(resolve => {
      jsmediatags.read(file, {
        onSuccess: async tag => {
          const t = tag.tags;
          let picture = '';
          if (t.picture) {
            try {
              const data = t.picture.data;
              const format = t.picture.format;
              const blob = new Blob([new Uint8Array(data)], { type: format });
              picture = await new Promise(res => {
                const reader = new FileReader();
                reader.onload = () => res(reader.result);
                reader.onerror = () => res('');
                reader.readAsDataURL(blob);
              });
            } catch (e) {
              console.error("Gagal mengonversi cover art:", e);
            }
          }
          resolve({
            title: t.title,
            artist: t.artist,
            album: t.album,
            picture
          });
        },
        onError: () => resolve({})
      });
    });
  }

  // =====================
  // ALBUM COVER FALLBACK (Canvas API)
  // =====================
  generateCoverArt(artist, album) {
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');

    // Pick a gradient based on hash
    const hash = this.simpleHash(artist + album);
    const colors = COVER_GRADIENTS[hash % COVER_GRADIENTS.length];

    // Draw gradient background
    const grad = ctx.createLinearGradient(0, 0, 100, 100);
    grad.addColorStop(0, colors[0]);
    grad.addColorStop(1, colors[1]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 100, 100);

    // Decorative circles
    ctx.globalAlpha = 0.12;
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(73, 27, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(20, 83, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    // Initials
    const initials = this.getInitials(artist || album || '?');
    ctx.fillStyle = 'rgba(255,255,255,0.92)';
    ctx.font = 'bold 32px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(initials, 50, 43);

    // Album name at bottom
    ctx.font = '500 9px Outfit, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    const displayAlbum = (album && album !== 'Unknown Album') ? album : artist;
    const truncAlbum = displayAlbum.length > 14 ? displayAlbum.substring(0, 12) + '...' : displayAlbum;
    ctx.fillText(truncAlbum, 50, 78);

    // Music note icon
    ctx.font = '400 14px serif';
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.fillText('\u266A', 50, 90);

    return canvas.toDataURL('image/jpeg', 0.7);
  }

  // Resize cover art to save memory (max 100x100)
  async resizeCover(base64, maxDim = 100) {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = maxDim;
        canvas.height = maxDim;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, maxDim, maxDim);
        resolve(canvas.toDataURL('image/jpeg', 0.6));
      };
      img.onerror = () => resolve(base64);
      img.src = base64;
    });
  }

  getInitials(str) {
    const words = str.trim().split(/\s+/);
    if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
    return str.substring(0, 2).toUpperCase();
  }

  simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  // =====================
  // ARTIST AVATAR GENERATOR (SVG)
  // =====================
  generateArtistAvatar(artistName) {
    const hash = this.simpleHash(artistName);
    const colors = COVER_GRADIENTS[hash % COVER_GRADIENTS.length];
    const initials = this.getInitials(artistName);
    return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g${hash}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${colors[0]}"/>
          <stop offset="100%" stop-color="${colors[1]}"/>
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#g${hash})"/>
      <circle cx="85" cy="30" r="25" fill="rgba(255,255,255,0.08)"/>
      <text x="60" y="66" text-anchor="middle" font-size="38" font-weight="700"
        font-family="Outfit,sans-serif" fill="rgba(255,255,255,0.9)">${initials}</text>
    </svg>`;
  }

  // =====================
  // DOMINANT COLOR EXTRACTION
  // =====================
  extractDominantColor(imgSrc) {
    return new Promise((resolve) => {
      if (this.colorCache[imgSrc]) {
        resolve(this.colorCache[imgSrc]);
        return;
      }
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = 8;
          canvas.height = 8;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, 8, 8);
          const data = ctx.getImageData(0, 0, 8, 8).data;

          let r = 0, g = 0, b = 0, count = 0;
          for (let i = 0; i < data.length; i += 4) {
            // Skip very dark / very light pixels for better accent
            const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
            if (brightness > 30 && brightness < 230) {
              r += data[i];
              g += data[i + 1];
              b += data[i + 2];
              count++;
            }
          }

          if (count === 0) count = 1;
          const color = {
            r: Math.round(r / count),
            g: Math.round(g / count),
            b: Math.round(b / count)
          };

          // Ensure minimum saturation for vibrant accent
          const max = Math.max(color.r, color.g, color.b);
          const min = Math.min(color.r, color.g, color.b);
          if (max - min < 30) {
            // Too grey — boost the dominant channel
            if (color.r >= color.g && color.r >= color.b) color.r = Math.min(255, color.r + 50);
            else if (color.g >= color.r && color.g >= color.b) color.g = Math.min(255, color.g + 50);
            else color.b = Math.min(255, color.b + 50);
          }

          // LRU: limit cache to 15 entries
          this._colorCacheKeys.push(imgSrc);
          if (this._colorCacheKeys.length > 15) {
            const oldest = this._colorCacheKeys.shift();
            delete this.colorCache[oldest];
          }
          this.colorCache[imgSrc] = color;
          resolve(color);
        } catch (e) {
          resolve({ r: 29, g: 185, b: 84 }); // Default green
        }
      };
      img.onerror = () => resolve({ r: 29, g: 185, b: 84 });
      img.src = imgSrc;
    });
  }

  applyDynamicColor(color) {
    const root = document.documentElement;
    const rgb = `${color.r}, ${color.g}, ${color.b}`;
    root.style.setProperty('--dynamic-accent', `rgb(${rgb})`);
    root.style.setProperty('--dynamic-accent-rgb', rgb);
    this._cachedAccentRGB = rgb;
  }

  resetDynamicColor() {
    const root = document.documentElement;
    root.style.setProperty('--dynamic-accent', '#1db954');
    root.style.setProperty('--dynamic-accent-rgb', '29, 185, 84');
    this._cachedAccentRGB = '29, 185, 84';
  }

  // =====================
  // WEB AUDIO API SETUP
  // =====================
  initAudioContext() {
    if (this.audioCtx) return;
    try {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 512;
      this.analyser.smoothingTimeConstant = 0.65;
      this.gainNode = this.audioCtx.createGain();
      this.gainNode.gain.value = 1;

      this.sourceNode = this.audioCtx.createMediaElementSource(this.audio);
      this.sourceNode.connect(this.analyser);
      this.analyser.connect(this.gainNode);
      this.gainNode.connect(this.audioCtx.destination);
    } catch (e) {
      console.warn('Web Audio API not available:', e);
    }
  }

  // =====================
  // VISUALIZER
  // =====================
  startVisualizer() {
    this.initAudioContext();
    if (!this.analyser) return;

    const canvas = document.getElementById('visualizerCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Bind click to change mode once
    if (!canvas.dataset.listenerAdded) {
      canvas.onclick = (e) => {
        e.stopPropagation();
        this.visualizerMode = (this.visualizerMode + 1) % 3;
        this.visualizerModeChangeTime = Date.now();
        this.toast(`Visualizer Mode: ${["Symmetrical Pillars", "Siri Fluid Wave", "Glow Waveform"][this.visualizerMode]}`);
      };
      canvas.dataset.listenerAdded = 'true';
    }

    // Set canvas resolution with High DPI (Retina) support
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      this.visualizerRAF = requestAnimationFrame(draw);
      this.analyser.getByteFrequencyData(dataArray);

      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      // Define standard settings
      const barCount = 40;
      const gap = 3;
      const barWidth = w / barCount;

      // Initialize state arrays if not set
      if (this.visualizerSmoothed.length !== barCount) {
        this.visualizerSmoothed = new Array(barCount).fill(0);
      }
      if (this.visualizerPeaks.length !== barCount) {
        this.visualizerPeaks = new Array(barCount).fill(0);
      }

      // Smooth the frequency values using custom bouncy attack/decay filter
      let averageAmplitude = 0;
      for (let i = 0; i < barCount; i++) {
        // Logarithmic frequency mapping: expands the bass/mid frequencies across the bars
        // This makes the visualizer incredibly responsive to modern music
        const dataIndex = Math.floor(Math.pow(i / (barCount - 1), 1.4) * (bufferLength * 0.65));
        let rawVal = dataArray[dataIndex] / 255;
        
        // Boost higher bins to compensate for natural roll-off in music
        rawVal = rawVal * (1 + (i / barCount) * 1.5);
        if (rawVal > 1) rawVal = 1;

        averageAmplitude += rawVal;

        if (rawVal > this.visualizerSmoothed[i]) {
          // Rapid attack for punchiness
          this.visualizerSmoothed[i] += (rawVal - this.visualizerSmoothed[i]) * 0.55;
        } else {
          // Smooth, elegant decay
          this.visualizerSmoothed[i] += (rawVal - this.visualizerSmoothed[i]) * 0.15;
        }

        // Handle peaks
        if (this.visualizerSmoothed[i] > this.visualizerPeaks[i]) {
          this.visualizerPeaks[i] = this.visualizerSmoothed[i];
        } else {
          this.visualizerPeaks[i] -= 0.015; // slowly drift down
          if (this.visualizerPeaks[i] < 0) this.visualizerPeaks[i] = 0;
        }
      }
      averageAmplitude /= barCount;

      // Use cached accent color (updated on song change, not every frame)
      const accentRGB = this._cachedAccentRGB || '29, 185, 84';

      // ==========================================
      // MODE 0: Modern Spectrum Bars (Bottom-up with Glow & Peaks)
      // ==========================================
      if (this.visualizerMode === 0) {
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${accentRGB}, 0.5)`;

        for (let i = 0; i < barCount; i++) {
          const val = this.visualizerSmoothed[i];
          const barH = Math.max(2, val * h * 0.85);

          const x = i * barWidth + gap / 2;
          const y = h - barH;
          const width = barWidth - gap;

          // Vibrant Gradient bar
          const gradient = ctx.createLinearGradient(0, h, 0, h - barH);
          gradient.addColorStop(0, `rgba(${accentRGB}, 0.15)`);
          gradient.addColorStop(1, `rgba(${accentRGB}, 0.95)`);
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.roundRect(x, y, width, barH, [width/2, width/2, 0, 0]);
          ctx.fill();

          // Draw Floating Peak Cap
          const peakVal = this.visualizerPeaks[i];
          const peakH = Math.max(2, peakVal * h * 0.85);
          ctx.fillStyle = '#fff';
          ctx.beginPath();
          ctx.roundRect(x, h - peakH - 4, width, Math.max(2, width/2), 2);
          ctx.fill();
        }
        ctx.shadowBlur = 0; // reset glow
      }

      // ==========================================
      // MODE 1: Siri Fluid Wave (3-layered floating bezier curves)
      // ==========================================
      else if (this.visualizerMode === 1) {
        // Fast horizontal movement powered by sound energy
        this.visualizerPhase += 0.02 + averageAmplitude * 0.1;

        const drawSiriWave = (phaseShift, scale, alpha, strokeWidth) => {
          ctx.strokeStyle = `rgba(${accentRGB}, ${alpha})`;
          ctx.lineWidth = strokeWidth;
          ctx.shadowBlur = strokeWidth > 1.5 ? 12 : 0;
          ctx.shadowColor = `rgba(${accentRGB}, 0.6)`;
          ctx.beginPath();
          ctx.moveTo(0, h / 2);

          for (let i = 0; i <= barCount; i++) {
            const x = (i / barCount) * w;
            const smoothIndex = Math.min(i, barCount - 1);
            const amplitude = this.visualizerSmoothed[smoothIndex] * h * 0.55 * scale;
            
            // Generate a natural flowing wave using sine combined with frequency levels
            const angle = (i * 0.15) + this.visualizerPhase + phaseShift;
            const y = h / 2 + Math.sin(angle) * amplitude;

            if (i === 0) ctx.moveTo(x, y);
            else {
              const prevX = ((i - 1) / barCount) * w;
              const prevAngle = ((i - 1) * 0.15) + this.visualizerPhase + phaseShift;
              const prevSmoothIndex = Math.max(0, i - 1);
              const prevAmp = this.visualizerSmoothed[prevSmoothIndex] * h * 0.55 * scale;
              const prevY = h / 2 + Math.sin(prevAngle) * prevAmp;

              ctx.quadraticCurveTo(prevX + (x - prevX) / 2, prevY, x, y);
            }
          }
          ctx.stroke();
        };

        // Draw 3 layers for organic 3D fluid feeling
        drawSiriWave(0, 1.0, 0.95, 2.5);         // Main forefront wave
        drawSiriWave(Math.PI / 2, 0.65, 0.5, 1.5); // Secondary wave
        drawSiriWave(Math.PI, 0.35, 0.25, 1.0);      // Background subtle wave
        ctx.shadowBlur = 0; // reset
      }

      // ==========================================
      // MODE 2: Mirrored Spectrum Bars (Soundcloud Style)
      // ==========================================
      else if (this.visualizerMode === 2) {
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${accentRGB}, 0.35)`;

        for (let i = 0; i < barCount; i++) {
          const val = this.visualizerSmoothed[i];
          const barH = Math.max(2, val * h * 0.42); // max just under half height

          const x = i * barWidth + gap / 2;
          const yTop = h / 2 - barH;
          const yBot = h / 2;
          const width = barWidth - gap;

          // Top half (bright and punchy)
          ctx.fillStyle = `rgba(${accentRGB}, 0.95)`;
          ctx.beginPath();
          ctx.roundRect(x, yTop, width, barH, [width/2, width/2, 0, 0]);
          ctx.fill();
          
          // Bottom half (faded reflection)
          ctx.fillStyle = `rgba(${accentRGB}, 0.35)`;
          ctx.beginPath();
          ctx.roundRect(x, yBot + 1, width, barH * 0.75, [0, 0, width/2, width/2]);
          ctx.fill();
        }
        ctx.shadowBlur = 0; // reset
      }

      // ==========================================
      // Draw Mode Name overlay that fades out
      // ==========================================
      const modeTimeElapsed = Date.now() - this.visualizerModeChangeTime;
      if (modeTimeElapsed < 1500) {
        const textAlpha = Math.min(1.0, (1500 - modeTimeElapsed) / 400);
        ctx.fillStyle = `rgba(255, 255, 255, ${textAlpha * 0.4})`;
        ctx.font = '700 8.5px Outfit, sans-serif';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'top';
        const modeLabel = ["Modern Spectrum", "Siri Fluid Wave", "Mirrored Spectrum"][this.visualizerMode];
        ctx.fillText(modeLabel.toUpperCase(), w - 8, 6);
      }
    };

    draw();
  }

  stopVisualizer() {
    if (this.visualizerRAF) {
      cancelAnimationFrame(this.visualizerRAF);
      this.visualizerRAF = null;
    }
  }

  // =====================
  // VOLUME NORMALIZATION (RMS)
  // =====================
  async normalizeVolume() {
    if (!this.audioCtx || !this.analyser) return;

    // Wait a moment for audio to buffer
    await new Promise(r => setTimeout(r, 500));

    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);

    // Calculate RMS
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      const normalized = dataArray[i] / 255;
      sum += normalized * normalized;
    }
    const rms = Math.sqrt(sum / dataArray.length);

    // Target RMS ~ 0.25 for balanced volume
    const targetRMS = 0.25;
    if (rms > 0.01 && this.gainNode) {
      let gain = targetRMS / rms;
      gain = Math.max(0.5, Math.min(2.0, gain)); // Clamp between 0.5x and 2x
      this.gainNode.gain.setTargetAtTime(gain, this.audioCtx.currentTime, 0.5);
    }
  }

  // =====================
  // CROSSFADE AUDIO
  // =====================
  async crossfadeTo(newSrc) {
    this.initAudioContext();

    if (!this.gainNode || !this.audioCtx) {
      // No Web Audio — just switch directly
      this.audio.src = newSrc;
      await this.audio.play();
      return;
    }

    const duration = 0.8;
    const now = this.audioCtx.currentTime;

    // Fade out current
    this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now);
    this.gainNode.gain.linearRampToValueAtTime(0, now + duration);

    // Wait for fade out
    await new Promise(r => setTimeout(r, duration * 1000));

    // Switch source
    this.audio.src = newSrc;
    await this.audio.play();

    // Fade in
    const nowAfter = this.audioCtx.currentTime;
    this.gainNode.gain.setValueAtTime(0, nowAfter);
    this.gainNode.gain.linearRampToValueAtTime(1, nowAfter + duration);

    // Normalize after fade in
    setTimeout(() => this.normalizeVolume(), 1200);
  }

  // =====================
  // RENDERING
  // =====================
  renderLibrary() {
    this.renderSongs(this.songs, document.getElementById('libraryList'));
  }

  renderSongs(arr, el) {
    el.innerHTML = '';
    arr.forEach(song => {
      const div = document.createElement('div');
      div.className = 'song';
      if (this.queue[this.currentIndex]?.id === song.id) {
        div.classList.add('playing');
      }

      const coverSrc = this.getSongCover(song);
      const isFav = this.favorites.has(song.id);

      div.innerHTML = `
        <img src="${coverSrc}" loading="lazy" onerror="this.src='${this.generateCoverArt(song.artist, song.album)}'">
        <div class="meta">
          <div class="title">${song.title}</div>
          <div class="artist">${song.artist}</div>
        </div>
        <button class="fav-btn ${isFav ? 'active' : ''}" data-id="${song.id}" title="Favorite">
          ${isFav ? '<span style="color:#ff4b4b">' + IC.heartFill + '</span>' : IC.heart}
        </button>
      `;

      // Favorite toggle
      const favBtn = div.querySelector('.fav-btn');
      favBtn.onclick = (e) => {
        e.stopPropagation();
        this.toggleFavorite(song.id);
        favBtn.classList.toggle('active');
        favBtn.innerHTML = this.favorites.has(song.id) ? '<span style="color:#ff4b4b">' + IC.heartFill + '</span>' : IC.heart;
      };

      div.onclick = () => {
        this.queue = arr;
        this.currentIndex = arr.findIndex(s => s.id === song.id);
        this.play(song);
      };

      el.appendChild(div);
    });
  }

  getSongCover(song) {
    if (song.cover && song.cover.length > 0) return song.cover;
    return this.generateCoverArt(song.artist, song.album);
  }

  // ===== Albums Tab =====
  renderAlbums() {
    const grid = document.getElementById('albumsGrid');
    grid.innerHTML = '';

    const albumMap = {};
    this.songs.forEach(s => {
      const key = s.album || 'Unknown Album';
      if (!albumMap[key]) albumMap[key] = { name: key, songs: [], cover: null, artist: s.artist };
      albumMap[key].songs.push(s);
      if (!albumMap[key].cover && s.cover) albumMap[key].cover = s.cover;
    });

    Object.values(albumMap).forEach(album => {
      const card = document.createElement('div');
      card.className = 'album-card';
      const coverSrc = album.cover || this.generateCoverArt(album.artist, album.name);
      card.innerHTML = `
        <img src="${coverSrc}" onerror="this.src='${this.generateCoverArt(album.artist, album.name)}'">
        <div class="card-title">${album.name}</div>
        <div class="card-sub">${album.songs.length} lagu · ${album.artist}</div>
      `;
      card.onclick = () => {
        this.queue = album.songs;
        this.currentIndex = 0;
        this.play(album.songs[0]);
        this.toast(`Playing: ${album.name}`);
      };
      grid.appendChild(card);
    });
  }

  // ===== Artists Tab =====
  renderArtists() {
    const grid = document.getElementById('artistsGrid');
    grid.innerHTML = '';

    const artistMap = {};
    this.songs.forEach(s => {
      const key = s.artist || 'Unknown Artist';
      if (!artistMap[key]) artistMap[key] = { name: key, songs: [], cover: null };
      artistMap[key].songs.push(s);
      if (!artistMap[key].cover && s.cover) artistMap[key].cover = s.cover;
    });

    Object.values(artistMap).forEach(artist => {
      const card = document.createElement('div');
      card.className = 'artist-card';

      if (artist.cover) {
        card.innerHTML = `
          <img src="${artist.cover}">
          <div class="card-title">${artist.name}</div>
          <div class="card-sub">${artist.songs.length} lagu</div>
        `;
      } else {
        card.innerHTML = `
          ${this.generateArtistAvatar(artist.name)}
          <div class="card-title">${artist.name}</div>
          <div class="card-sub">${artist.songs.length} lagu</div>
        `;
      }

      card.onclick = () => {
        this.queue = artist.songs;
        this.currentIndex = 0;
        this.play(artist.songs[0]);
        this.toast(`Playing: ${artist.name}`);
      };
      grid.appendChild(card);
    });
  }

  // ===== Recently Added Tab =====
  renderRecentlyAdded() {
    const sorted = [...this.songs].sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0)).slice(0, 50);
    this.renderSongs(sorted, document.getElementById('recentList'));
  }

  // ===== Favorites Tab =====
  renderFavorites() {
    const favSongs = this.songs.filter(s => this.favorites.has(s.id));
    const el = document.getElementById('favoritesList');
    if (favSongs.length === 0) {
      el.innerHTML = '<p style="color:var(--muted);text-align:center;padding:40px;">Belum ada favorit. Tap ❤️ untuk menambah.</p>';
      return;
    }
    this.renderSongs(favSongs, el);
  }

  toggleFavorite(songId) {
    if (this.favorites.has(songId)) {
      this.favorites.delete(songId);
    } else {
      this.favorites.add(songId);
    }
    localStorage.setItem('music-favorites', JSON.stringify([...this.favorites]));
  }

  // ===== For You / Smart Recommendation =====
  renderForYou() {
    const container = document.getElementById('foryouContent');
    container.innerHTML = '';

    // Recently Played Section
    if (this.playHistory.length > 0) {
      const recentIds = [...new Set(this.playHistory)].slice(0, 15);
      const recentSongs = recentIds.map(id => this.songs.find(s => s.id === id)).filter(Boolean);
      if (recentSongs.length > 0) {
        container.appendChild(this.createForYouSection('🕐 Recently Played', recentSongs));
      }
    }

    // Favorite Songs
    const favSongs = this.songs.filter(s => this.favorites.has(s.id));
    if (favSongs.length > 0) {
      container.appendChild(this.createForYouSection('❤️ Your Favorites', favSongs));
    }

    // Same Artist recommendations
    const currentSong = this.queue[this.currentIndex];
    if (currentSong) {
      const sameArtist = this.songs.filter(s =>
        s.artist === currentSong.artist && s.id !== currentSong.id
      );
      if (sameArtist.length > 0) {
        container.appendChild(this.createForYouSection(`🎤 More from ${currentSong.artist}`, sameArtist));
      }

      // Same Album
      const sameAlbum = this.songs.filter(s =>
        s.album === currentSong.album && s.id !== currentSong.id && s.album !== 'Unknown Album'
      );
      if (sameAlbum.length > 0) {
        container.appendChild(this.createForYouSection(`💿 From "${currentSong.album}"`, sameAlbum));
      }
    }

    // Quick Mix (shuffled selection)
    if (this.songs.length > 3) {
      const shuffled = [...this.songs].sort(() => Math.random() - 0.5).slice(0, 10);
      container.appendChild(this.createForYouSection('🎲 Quick Mix', shuffled));
    }

    if (container.children.length === 0) {
      container.innerHTML = '<p style="color:var(--muted);text-align:center;padding:40px;">Import lagu untuk mendapatkan rekomendasi personal.</p>';
    }
  }

  createForYouSection(title, songs) {
    const section = document.createElement('div');
    section.className = 'foryou-section';

    const header = document.createElement('div');
    header.className = 'section-title';
    header.textContent = title;
    section.appendChild(header);

    const scroll = document.createElement('div');
    scroll.className = 'foryou-scroll';

    songs.forEach(song => {
      const card = document.createElement('div');
      card.className = 'foryou-card';
      const coverSrc = this.getSongCover(song);
      card.innerHTML = `
        <img src="${coverSrc}" onerror="this.src='${this.generateCoverArt(song.artist, song.album)}'">
        <div class="card-title">${song.title}</div>
        <div class="card-sub">${song.artist}</div>
      `;
      card.onclick = () => {
        this.queue = songs;
        this.currentIndex = songs.findIndex(s => s.id === song.id);
        this.play(song);
      };
      scroll.appendChild(card);
    });

    section.appendChild(scroll);
    return section;
  }

  renderPlaylists() {
    const root = document.getElementById('playlistList');
    root.innerHTML = '';
    this.playlists.forEach(p => {
      const div = document.createElement('div');
      div.className = 'playlist-card';
      div.innerHTML = `
        <h3>${p.name}</h3>
        <p>${p.songs.length} lagu</p>
      `;
      root.appendChild(div);
    });
  }

  // =====================
  // PLAY / PAUSE / NEXT / PREV
  // =====================
  async play(song) {
    try {
      if (this.currentObjectURL) {
        URL.revokeObjectURL(this.currentObjectURL);
        this.currentObjectURL = null;
      }

      let src;
      if (song.handle?.getFile) {
        const file = await song.handle.getFile();
        this.currentObjectURL = URL.createObjectURL(file);
        src = this.currentObjectURL;
      } else if (song._blobUrl) {
        src = song._blobUrl;
      } else if (song.url) {
        src = song.url;
      } else {
        throw new Error('Missing file handle/URL source');
      }

      // Use crossfade if already playing
      if (!this.audio.paused && this.audio.src) {
        await this.crossfadeTo(src);
      } else {
        this.initAudioContext();
        this.audio.src = src;
        await this.audio.play();
        // Resume AudioContext if suspended
        if (this.audioCtx && this.audioCtx.state === 'suspended') {
          await this.audioCtx.resume();
        }
        setTimeout(() => this.normalizeVolume(), 800);
      }

      document.getElementById('playBtn').innerHTML = IC.pause;
      document.getElementById('miniPlay').innerHTML = IC.pauseCircle;

      const coverSrc = this.getSongCover(song);
      document.getElementById('miniTitle').textContent = song.title;
      document.getElementById('miniArtist').textContent = song.artist;
      document.getElementById('miniCover').src = coverSrc;

      document.getElementById('coverLarge').src = coverSrc;
      document.getElementById('blurBg').style.backgroundImage = `url(${coverSrc})`;

      document.getElementById('npTitle').textContent = song.title;
      document.getElementById('npArtist').textContent = song.artist;

      this.renderLyrics(song.lyrics);

      // Extract dominant color and apply adaptive UI
      this.extractDominantColor(coverSrc).then(color => {
        this.applyDynamicColor(color);
      });

      // Restart visualizer if Now Playing is open
      if (document.getElementById('nowPlaying').classList.contains('show')) {
        this.startVisualizer();
      }

      // Record play history
      this.playHistory = this.playHistory.filter(id => id !== song.id);
      this.playHistory.unshift(song.id);
      if (this.playHistory.length > 50) this.playHistory = this.playHistory.slice(0, 50);
      localStorage.setItem('music-history', JSON.stringify(this.playHistory));

      // Mark current song in library
      document.querySelectorAll('.song').forEach(el => el.classList.remove('playing'));

    } catch (e) {
      console.error(e);
      this.toast('Tidak bisa memutar lagu');
    }
  }

  togglePlay() {
    if (this.audio.paused) {
      this.initAudioContext();
      this.audio.play();
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      document.getElementById('playBtn').innerHTML = IC.pause;
      document.getElementById('miniPlay').innerHTML = IC.pauseCircle;
    } else {
      this.audio.pause();
      document.getElementById('playBtn').innerHTML = IC.play;
      document.getElementById('miniPlay').innerHTML = IC.playCircle;
    }
  }

  next() {
    if (this.queue.length === 0) return;
    if (this.repeatMode === 'one') {
      this.audio.currentTime = 0;
      this.audio.play();
      return;
    }
    if (this.shuffle) {
      this.currentIndex = Math.floor(Math.random() * this.queue.length);
    } else {
      this.currentIndex++;
    }
    if (this.currentIndex >= this.queue.length) {
      if (this.repeatMode === 'all') {
        this.currentIndex = 0;
      } else {
        this.audio.pause();
        document.getElementById('playBtn').innerHTML = IC.play;
        document.getElementById('miniPlay').innerHTML = IC.playCircle;
        return;
      }
    }
    this.play(this.queue[this.currentIndex]);
  }

  prev() {
    if (this.queue.length === 0) return;
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.repeatMode === 'all' ? this.queue.length - 1 : 0;
    }
    this.play(this.queue[this.currentIndex]);
  }

  // =====================
  // SMART LYRICS (LRC + TXT)
  // =====================
  renderLyrics(text) {
    const root = document.getElementById('lyrics');
    root.innerHTML = '';
    root.classList.remove('static-mode');

    if (!text) {
      root.innerHTML = '<div class="line active">🎵 Instrumental / No lyrics</div>';
      this.lyricsParsed = null;
      return;
    }

    // Check if it has LRC timestamps
    const hasTimestamps = /\[\d+:\d+\.\d+\]/.test(text);

    if (hasTimestamps) {
      // Synced lyrics mode
      this.lyricsParsed = text.split('\n').map(line => {
        const m = line.match(/\[(\d+):(\d+\.?\d*)\](.*)/);
        if (!m) return null;
        return {
          time: parseInt(m[1]) * 60 + parseFloat(m[2]),
          text: m[3]
        };
      }).filter(Boolean);

      this.lyricsParsed.forEach((l, i) => {
        const div = document.createElement('div');
        div.className = 'line';
        div.id = 'lyric-' + i;
        div.textContent = l.text;
        root.appendChild(div);
      });
    } else {
      // Static lyrics mode (.txt without timestamps)
      root.classList.add('static-mode');
      root.textContent = text;
      this.lyricsParsed = null;
    }
  }

  updateLyrics() {
    if (!this.lyricsParsed) return;
    const t = this.audio.currentTime;
    this.lyricsParsed.forEach((l, i) => {
      const next = this.lyricsParsed[i + 1];
      if (t >= l.time && (!next || t < next.time)) {
        const active = document.getElementById('lyric-' + i);
        if (active && !active.classList.contains('active')) {
          document.querySelectorAll('.line').forEach(el => el.classList.remove('active'));
          active.classList.add('active');
          active.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
      }
    });
  }

  // =====================
  // STATE PERSISTENCE
  // =====================
  restoreState() {
    const raw = localStorage.getItem('music-state');
    if (!raw) return;
    const state = JSON.parse(raw);
    const song = this.songs.find(s => s.id === state.songId);
    if (song) {
      this.queue = this.songs;
      this.currentIndex = this.songs.findIndex(s => s.id === song.id);
      this.play(song).then(() => {
        this.audio.currentTime = state.time || 0;
        this.audio.pause();
        document.getElementById('playBtn').innerHTML = IC.play;
        document.getElementById('miniPlay').innerHTML = IC.playCircle;
      });
    }
  }

  format(sec) {
    if (!sec || isNaN(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  toast(msg) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(this._toastTimeout);
    this._toastTimeout = setTimeout(() => el.classList.remove('show'), 2000);
  }
}

// Service Worker registration
if ('serviceWorker' in navigator) {
  const sw = `
    self.addEventListener('install', e => {
      e.waitUntil(
        caches.open('music-pwa-v3').then(cache => cache.addAll(['./']))
      );
    });
    self.addEventListener('fetch', e => {
      e.respondWith(
        caches.match(e.request).then(r => r || fetch(e.request))
      );
    });
  `;
  const blob = new Blob([sw], { type: 'text/javascript' });
  const swUrl = URL.createObjectURL(blob);
  navigator.serviceWorker.register(swUrl).then(() => {
    URL.revokeObjectURL(swUrl);
  });
}

new MusicPlayerApp();
