    (function() {
        'use strict';

        //COOKIE MANAGEMENT
        const COOKIE_NAME = 'hajir_consent';
        const COOKIE_EXPIRY = 365;

        function getCookie(name) {
            const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
            return match ? match[2] : null;
        }

        function setCookie(name, value, days) {
            const expires = new Date(Date.now() + days * 864e5).toUTCString();
            document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/; SameSite=Lax';
        }

        function hasConsent() {
            return getCookie(COOKIE_NAME) === 'accepted';
        }

        window.acceptCookies = function() {
            setCookie(COOKIE_NAME, 'accepted', COOKIE_EXPIRY);
            document.getElementById('cookieBanner').classList.add('hidden');
            applyStoredPreferences();
        };

        window.declineCookies = function() {
            setCookie(COOKIE_NAME, 'declined', COOKIE_EXPIRY);
            document.getElementById('cookieBanner').classList.add('hidden');
            localStorage.removeItem('hajirTheme');
            localStorage.removeItem('hajirTutorialSeen');
            applyTheme('dark');
        };

        function applyStoredPreferences() {
            if (!hasConsent()) return;
            const theme = localStorage.getItem('hajirTheme') || 'dark';
            applyTheme(theme);
        }

        function checkCookieConsent() {
            const consent = getCookie(COOKIE_NAME);
            if (consent === 'accepted') {
                document.getElementById('cookieBanner').classList.add('hidden');
                applyStoredPreferences();
            } else if (consent === 'declined') {
                document.getElementById('cookieBanner').classList.add('hidden');
                applyTheme('dark');
            } else {
                document.getElementById('cookieBanner').classList.remove('hidden');
                applyTheme('dark');
            }
        }

        // DISABLE HORIZONTAL SWIVEL
        function preventHorizontalSwipe() {
            let startX = 0,
                startY = 0;
            document.addEventListener('touchstart', function(e) {
                const t = e.touches[0];
                startX = t.clientX;
                startY = t.clientY;
            }, { passive: true });

            document.addEventListener('touchmove', function(e) {
                if (e.touches.length !== 1) return;
                const t = e.touches[0];
                const dx = t.clientX - startX;
                const dy = t.clientY - startY;
                if (Math.abs(dx) > Math.abs(dy) * 1.2 && Math.abs(dx) > 15) {
                    const target = e.target;
                    const isScrollable = target.closest && target.closest(
                        '.overflow-y-auto, .overflow-x-auto, .preview-pane, #syncLinesList, #lyricsTextarea');
                    if (!isScrollable) e.preventDefault();
                }
            }, { passive: false });

            document.addEventListener('wheel', function(e) {
                if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 10) {
                    const target = e.target;
                    const isScrollable = target.closest && target.closest(
                        '.overflow-y-auto, .overflow-x-auto, .preview-pane, #syncLinesList, #lyricsTextarea');
                    if (!isScrollable) e.preventDefault();
                }
            }, { passive: false });
        }

        //MOBILE MENU
        let mobileMenuOpen = false;

        window.toggleMobileMenu = function() {
            mobileMenuOpen = !mobileMenuOpen;
            document.getElementById('mobileMenu').classList.toggle('open', mobileMenuOpen);
            document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
        };

        //TUTORIAL STEPS
        function renderTutorialSteps() {
            const steps = [
                { icon: '🎵', title: '1. Load Your Audio', desc: 'Drag & drop or click to upload MP3, WAV, OGG, or M4A files.' },
                { icon: '✍️', title: '2. Add Your Lyrics', desc: 'Type, paste, or load a .txt/.lrc file. Each line = one lyric line.' },
                { icon: '⏱️', title: '3. Sync in Real-Time', desc: 'Hit Play, then press <kbd class="kbd">Space</kbd> or the big blue button as each line plays.' },
                { icon: '💾', title: '4. Export Your .lrc', desc: 'Download the synced LRC file — ready for any media player.' }
            ];
            const container = document.getElementById('tutorialSteps');
            if (!container) return;
            container.innerHTML = steps.map(s =>
                `<div class="flex gap-3.5 items-start p-3.5 rounded-xl border" style="background:var(--input-bg);border-color:var(--glass-border)"><span class="text-2xl shrink-0">${s.icon}</span><div><p class="font-semibold body-small">${s.title}</p><p class="caption mt-0.5 leading-relaxed">${s.desc}</p></div></div>`
            ).join('');
        }

        function renderShortcuts() {
            const items = [
                { label: 'Add Timestamp', keys: ['Space'] },
                { label: 'Play / Pause', keys: ['Ctrl', 'P'] },
                { label: 'Undo', keys: ['Ctrl', 'Z'] },
                { label: 'Redo', keys: ['Ctrl', 'Y'] },
                { label: 'Seek Back 2s', keys: ['←'] },
                { label: 'Seek Forward 2s', keys: ['→'] },
                { label: 'Next Line (Sync)', keys: ['Enter'] },
                { label: 'Find & Replace', keys: ['Ctrl', 'H'] }
            ];
            const container = document.getElementById('shortcutsList');
            if (!container) return;
            container.innerHTML = items.map(item =>
                `<div class="flex justify-between items-center py-2.5 border-b last:border-0" style="border-color:var(--glass-border)"><span class="text-secondary body-small">${item.label}</span><span class="flex gap-1">${item.keys.map(k => `<kbd class="kbd">${k}</kbd>`).join('+')}</span></div>`
            ).join('');
        }

        //THEME
        function applyTheme(t) {
            document.body.classList.remove('dark', 'light');
            document.body.classList.add(t);
            const sun = document.getElementById('sunIcon');
            const moon = document.getElementById('moonIcon');
            if (sun && moon) {
                sun.classList.toggle('hidden', t === 'dark');
                moon.classList.toggle('hidden', t === 'light');
            }
            if (hasConsent()) localStorage.setItem('hajirTheme', t);
        }

        window.toggleTheme = function() {
            applyTheme(document.body.classList.contains('dark') ? 'light' : 'dark');
        };

        //MODALS
        window.openModal = function(id) {
            const el = document.getElementById(id);
            if (el) el.classList.remove('hidden');
        };

        window.closeModal = function(id) {
            const el = document.getElementById(id);
            if (el) el.classList.add('hidden');
        };

        //TOAST
        function showToast(msg, type, dur) {
            type = type || 'info';
            dur = dur || 3200;
            const icons = { success: '✓', error: '✕', info: 'ℹ' };
            const t = document.createElement('div');
            t.className = 'toast ' + type;
            t.innerHTML = `<span style="font-size:16px;font-weight:600;opacity:0.8">${icons[type]||'ℹ'}</span><span>${msg}</span>`;
            t.style.pointerEvents = 'auto';
            document.getElementById('toastContainer').appendChild(t);
            setTimeout(() => {
                t.classList.add('hiding');
                setTimeout(() => t.remove(), 400);
            }, dur);
        }

        //AuDIO
        let audioEl = document.getElementById('audioElement');
        let timestamps = [];
        let lyrics = [];
        let mode = 'line';
        let activeLine = -1;
        let isPlaying = false;
        let isLooping = false;
        let rafId = null;
        let undoStack = [];
        let redoStack = [];
        let wordTimestamps = [];
        let audioLoaded = false;
        let currentLyricsInput = '';

        window.loadAudioFile = function(e) {
            const f = e.target.files[0];
            if (f) setAudioFile(f);
        };

        function setAudioFile(f) {
            const url = URL.createObjectURL(f);
            audioEl.src = url;
            audioEl.load();
            audioLoaded = true;
            document.getElementById('audioDropContent').classList.add('hidden');
            const fn = document.getElementById('audioFileName');
            fn.textContent = '🎵 ' + f.name;
            fn.classList.remove('hidden');
            audioEl.onloadedmetadata = function() {
                document.getElementById('totalTime').textContent = formatTime(audioEl.duration);
                document.getElementById('seekBar').max = audioEl.duration;
            };
            audioEl.ontimeupdate = onTimeUpdate;
            audioEl.onended = function() {
                if (!isLooping) setPlayState(false);
            };
            showToast('Audio loaded: ' + f.name, 'success');
        }

        window.handleDragOver = function(e, id) {
            e.preventDefault();
            document.getElementById(id).classList.add('drag-over');
        };

        window.handleDragLeave = function(id) {
            document.getElementById(id).classList.remove('drag-over');
        };

        window.handleAudioDrop = function(e) {
            e.preventDefault();
            window.handleDragLeave('audioDropZone');
            const f = e.dataTransfer.files[0];
            if (f && f.type.startsWith('audio/')) setAudioFile(f);
            else showToast('Please drop an audio file', 'error');
        };

        window.togglePlay = function() {
            if (!audioLoaded) { showToast('Load an audio file first', 'error'); return; }
            if (audioEl.paused) { audioEl.play();
                setPlayState(true);
                startRAF(); } else { audioEl.pause();
                setPlayState(false);
                stopRAF(); }
        };

        function setPlayState(playing) {
            isPlaying = playing;
            document.getElementById('playIcon').classList.toggle('hidden', playing);
            document.getElementById('pauseIcon').classList.toggle('hidden', !playing);
        }

        window.seekRelative = function(s) {
            if (!audioLoaded) return;
            audioEl.currentTime = Math.max(0, Math.min(audioEl.duration || 0, audioEl.currentTime + s));
        };

        window.seekAudio = function(v) {
            if (!audioLoaded) return;
            audioEl.currentTime = parseFloat(v);
        };

        window.toggleLoop = function() {
            isLooping = !isLooping;
            audioEl.loop = isLooping;
            const btn = document.getElementById('loopBtn');
            if (isLooping) {
                btn.style.background = 'rgba(59,130,246,0.12)';
                btn.style.borderColor = '#3B82F6';
            } else {
                btn.style.background = '';
                btn.style.borderColor = '';
            }
        };

        window.changeSpeed = function() {
            audioEl.playbackRate = parseFloat(document.getElementById('speedSelect').value);
        };

        window.changeVolume = function(v) {
            audioEl.volume = parseFloat(v);
        };

        function onTimeUpdate() {
            const cur = audioEl.currentTime,
                dur = audioEl.duration || 0;
            document.getElementById('currentTime').textContent = formatTime(cur);
            document.getElementById('seekBar').value = cur;
            document.getElementById('seekFill').style.width = (dur ? (cur / dur * 100) : 0) + '%';
            highlightActiveLine(cur);
        }

        function startRAF() {
            stopRAF();
            const loop = function() {
                onTimeUpdate();
                rafId = requestAnimationFrame(loop);
            };
            rafId = requestAnimationFrame(loop);
        }

        function stopRAF() {
            if (rafId) { cancelAnimationFrame(rafId);
                rafId = null; }
        }

        function formatTime(s) {
            if (!isFinite(s)) return '0:00.00';
            const m = Math.floor(s / 60);
            const sec = (s % 60).toFixed(2).padStart(5, '0');
            return m + ':' + sec;
        }

        function formatLRCTime(s) {
            if (!isFinite(s) || s == null) return null;
            const m = Math.floor(s / 60);
            const sec = (s % 60).toFixed(2).padStart(5, '0');
            return String(m).padStart(2, '0') + ':' + sec;
        }

        //LYRICS EDITOR
        window.onLyricsInput = function() {
            const val = document.getElementById('lyricsTextarea').value;
            pushUndo(currentLyricsInput);
            currentLyricsInput = val;
            parseLyrics();
            updatePreview();
        };

        function parseLyrics() {
            const raw = document.getElementById('lyricsTextarea').value;
            lyrics = raw.split('\n');
            if (timestamps.length !== lyrics.length) {
                const old = [...timestamps];
                timestamps = lyrics.map(function(_, i) { return old[i] !== undefined ? old[i] : null; });
            }
            document.getElementById('lineCount').textContent = lyrics.filter(function(l) { return l.trim(); }).length +
                ' lines';
            renderSyncList();
            updateProgress();
        }

        function renderSyncList() {
            const container = document.getElementById('syncLinesList');
            if (!lyrics.length || lyrics.every(function(l) { return !l.trim(); })) {
                container.innerHTML = '<p class="caption text-center py-6">Lyrics will appear here for syncing</p>';
                return;
            }
            container.innerHTML = '';
            lyrics.forEach(function(line, i) {
                if (!line.trim()) return;
                const div = document.createElement('div');
                div.className = 'lyric-line ' + (timestamps[i] != null ? 'has-timestamp' : 'no-timestamp');
                div.id = 'syncLine_' + i;
                div.onclick = function() {
                    activeLine = i;
                    highlightSyncLine(i);
                    if (audioLoaded) audioEl.currentTime = timestamps[i] || audioEl.currentTime;
                };
                const badge = document.createElement('span');
                badge.className = 'timestamp-badge';
                badge.id = 'badge_' + i;
                badge.textContent = timestamps[i] != null ? formatLRCTime(timestamps[i]) : '--:--';
                const text = document.createElement('span');
                text.className = 'truncate body-small';
                text.textContent = line;
                div.appendChild(badge);
                div.appendChild(text);
                container.appendChild(div);
            });
            if (activeLine >= 0) highlightSyncLine(activeLine);
        }

        function highlightSyncLine(idx) {
            document.querySelectorAll('.lyric-line').forEach(function(el) { el.classList.remove('active'); });
            const el = document.getElementById('syncLine_' + idx);
            if (el) { el.classList.add('active');
                el.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
        }

        function highlightActiveLine(currentTime) {
            let found = -1;
            for (let i = lyrics.length - 1; i >= 0; i--) {
                if (timestamps[i] != null && currentTime >= timestamps[i]) { found = i; break; }
            }
            if (found !== activeLine) {
                activeLine = found;
                highlightSyncLine(found);
                highlightPreviewLine(found);
            }
        }

        function highlightPreviewLine(idx) {
            document.querySelectorAll('.preview-line').forEach(function(el) { el.classList.remove('active-preview'); });
            const el = document.getElementById('previewLine_' + idx);
            if (el) el.classList.add('active-preview');
        }

        //SYNC
        window.addTimestamp = function() {
            if (!audioLoaded) { showToast('Load audio first!', 'error'); return; }
            let target = -1;
            for (let i = Math.max(0, activeLine + 1); i < lyrics.length; i++) {
                if (lyrics[i].trim()) { target = i; break; }
            }
            if (target === -1) {
                for (let i = 0; i < lyrics.length; i++) {
                    if (lyrics[i].trim() && timestamps[i] == null) { target = i; break; }
                }
            }
            if (target === -1) { showToast('All lines synced!', 'success'); return; }
            timestamps[target] = audioEl.currentTime;
            activeLine = target;
            const badge = document.getElementById('badge_' + target);
            if (badge) badge.textContent = formatLRCTime(timestamps[target]);
            const lineEl = document.getElementById('syncLine_' + target);
            if (lineEl) { lineEl.classList.remove('no-timestamp');
                lineEl.classList.add('has-timestamp'); }
            highlightSyncLine(target);
            updatePreview();
            updateProgress();
            const btn = document.getElementById('stampBtn');
            btn.style.transform = 'scale(0.94)';
            setTimeout(function() { btn.style.transform = ''; }, 150);
        };

        window.adjustAll = function(delta) {
            timestamps = timestamps.map(function(t) { return t != null ? Math.max(0, t + delta) : null; });
            renderSyncList();
            updatePreview();
        };

        window.clearTimestamps = function() {
            if (!confirm('Clear all timestamps?')) return;
            timestamps = lyrics.map(function() { return null; });
            renderSyncList();
            updatePreview();
            updateProgress();
        };

        function updateProgress() {
            const total = lyrics.filter(function(l) { return l.trim(); }).length;
            const done = lyrics.filter(function(l, i) { return l.trim() && timestamps[i] != null; }).length;
            const pct = total ? Math.round(done / total * 100) : 0;
            document.getElementById('syncProgress').style.width = pct + '%';
            document.getElementById('syncPct').textContent = pct + '% synced';
        }

        //LRC PREVIEW
        function buildLRC() {
            const lines = [];
            const ti = document.getElementById('metaTitle').value.trim();
            const ar = document.getElementById('metaArtist').value.trim();
            const al = document.getElementById('metaAlbum').value.trim();
            const au = document.getElementById('metaAuthor').value.trim();
            const by = document.getElementById('metaBy').value.trim();
            if (ti) lines.push('[ti:' + ti + ']');
            if (ar) lines.push('[ar:' + ar + ']');
            if (al) lines.push('[al:' + al + ']');
            if (au) lines.push('[au:' + au + ']');
            if (by) lines.push('[by:' + by + ']');
            if (lines.length) lines.push('');
            lyrics.forEach(function(line, i) {
                var ts = timestamps[i];
                if (ts != null) lines.push('[' + formatLRCTime(ts) + ']' + line);
                else lines.push(line || '');
            });
            return lines.join('\n');
        }

        window.updatePreview = function() {
            const lrc = buildLRC();
            const preview = document.getElementById('lrcPreview');
            preview.innerHTML = '';
            if (!lrc.trim()) {
                preview.innerHTML = '<span class="text-secondary italic">LRC output will appear here…</span>';
                return;
            }
            lrc.split('\n').forEach(function(line, i) {
                const div = document.createElement('div');
                div.className = 'preview-line';
                div.id = 'previewLine_' + i;
                div.textContent = line;
                preview.appendChild(div);
            });
        };

        window.copyPreview = function() {
            navigator.clipboard.writeText(buildLRC()).then(function() { showToast('Copied!', 'success'); });
        };

        //EXPORT / IMPORT
        window.exportLRC = function() {
            const lrc = buildLRC();
            if (!lrc.trim()) { showToast('Nothing to export', 'error'); return; }
            const ti = document.getElementById('metaTitle').value.trim() || 'lyrics';
            const ar = document.getElementById('metaArtist').value.trim() || 'artist';
            downloadFile(ti + ' - ' + ar + '.lrc', lrc);
            showToast('Exported!', 'success');
        };

        window.exportTXT = function() {
            downloadFile('lyrics.txt', lyrics.join('\n'));
            showToast('TXT exported', 'success');
        };

        function downloadFile(name, content) {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(new Blob([content], { type: 'text/plain' }));
            a.download = name;
            a.click();
        }

        window.importLRC = function() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.lrc,.txt';
            input.onchange = function(e) {
                const f = e.target.files[0];
                if (f) {
                    const r = new FileReader();
                    r.onload = function(ev) { parseLRCFile(ev.target.result); };
                    r.readAsText(f);
                }
            };
            input.click();
        };

        function parseLRCFile(content) {
            const lines = content.split('\n');
            const meta = {};
            const ts = [];
            const txt = [];
            const tsMap = {};
            lines.forEach(function(line) {
                const m = line.match(/^\[(ti|ar|al|au|by):([^\]]*)\]/);
                if (m) { meta[m[1]] = m[2].trim(); return; }
                const tsMatch = line.match(/^\[(\d{2}):(\d{2}\.\d{2})\](.*)/);
                if (tsMatch) {
                    const sec = parseInt(tsMatch[1]) * 60 + parseFloat(tsMatch[2]);
                    const text = tsMatch[3].trim();
                    const idx = txt.length;
                    tsMap[idx] = sec;
                    txt.push(text);
                } else if (line.trim()) {
                    txt.push(line.trim());
                }
            });
            if (meta.ti) document.getElementById('metaTitle').value = meta.ti;
            if (meta.ar) document.getElementById('metaArtist').value = meta.ar;
            if (meta.al) document.getElementById('metaAlbum').value = meta.al;
            if (meta.au) document.getElementById('metaAuthor').value = meta.au;
            if (meta.by) document.getElementById('metaBy').value = meta.by;
            const sorted = Object.keys(tsMap).sort(function(a, b) { return a - b; });
            var finalTxt = [];
            var finalTs = [];
            for (var i = 0; i < txt.length; i++) {
                finalTxt.push(txt[i] || '');
                finalTs.push(tsMap[i] !== undefined ? tsMap[i] : null);
            }
            lyrics = finalTxt;
            timestamps = finalTs;
            document.getElementById('lyricsTextarea').value = lyrics.join('\n');
            currentLyricsInput = lyrics.join('\n');
            renderSyncList();
            updatePreview();
            updateProgress();
            showToast('LRC imported!', 'success');
        }

        //Utility
        window.toggleCase = function() {
            const ta = document.getElementById('lyricsTextarea');
            const val = ta.value;
            const toggled = val.split('\n').map(function(l) {
                return l === l.toUpperCase() ? l.toLowerCase() : l.toUpperCase();
            }).join('\n');
            ta.value = toggled;
            window.onLyricsInput();
        };

        window.splitLines = function() {
            const ta = document.getElementById('lyricsTextarea');
            const val = ta.value;
            const split = val.split('\n').map(function(l) {
                if (l.length > 60) {
                    const words = l.split(' ');
                    var lines = [];
                    var cur = '';
                    words.forEach(function(w) {
                        if ((cur + ' ' + w).length > 60) { lines.push(cur);
                            cur = w; } else { cur = cur ? cur + ' ' + w : w; }
                    });
                    if (cur) lines.push(cur);
                    return lines.join('\n');
                }
                return l;
            }).join('\n');
            ta.value = split;
            window.onLyricsInput();
        };

        function pushUndo(state) {
            if (state !== undefined) undoStack.push(state);
            redoStack = [];
        }

        window.undoAction = function() {
            if (!undoStack.length) { showToast('Nothing to undo', 'info'); return; }
            const state = undoStack.pop();
            redoStack.push(currentLyricsInput);
            document.getElementById('lyricsTextarea').value = state;
            currentLyricsInput = state;
            parseLyrics();
            updatePreview();
        };

        window.redoAction = function() {
            if (!redoStack.length) { showToast('Nothing to redo', 'info'); return; }
            const state = redoStack.pop();
            undoStack.push(currentLyricsInput);
            document.getElementById('lyricsTextarea').value = state;
            currentLyricsInput = state;
            parseLyrics();
            updatePreview();
        };

        window.findNext = function() {
            const find = document.getElementById('findInput').value;
            const ta = document.getElementById('lyricsTextarea');
            const val = ta.value;
            const idx = val.indexOf(find, ta.selectionStart + 1);
            if (idx >= 0) {
                ta.selectionStart = idx;
                ta.selectionEnd = idx + find.length;
                ta.focus();
                document.getElementById('findResult').textContent = 'Found at ' + idx;
            } else {
                document.getElementById('findResult').textContent = 'No more matches';
            }
        };

        window.replaceAll = function() {
            const find = document.getElementById('findInput').value;
            const replace = document.getElementById('replaceInput').value;
            if (!find) { showToast('Enter text to find', 'error'); return; }
            const ta = document.getElementById('lyricsTextarea');
            const newVal = ta.value.split(find).join(replace);
            if (newVal === ta.value) { showToast('No matches found', 'info'); return; }
            ta.value = newVal;
            window.onLyricsInput();
            document.getElementById('findResult').textContent = 'Replaced all occurrences';
            showToast('Replaced all!', 'success');
        };

        window.setMode = function(m) {
            mode = m;
            document.getElementById('modeLineBtn').className =
                'px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ' + (m === 'line' ? 'btn-primary' :
                    'btn-ghost-glass');
            document.getElementById('modeWordBtn').className =
                'px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ' + (m === 'word' ? 'btn-primary' :
                    'btn-ghost-glass');
            document.getElementById('wordModePanel').classList.toggle('hidden', m !== 'word');
            if (m === 'word') buildWordChips();
        };

        function buildWordChips() {
            const container = document.getElementById('wordChipsContainer');
            container.innerHTML = '';
            const words = lyrics.join(' ').split(/\s+/).filter(function(w) { return w; });
            words.forEach(function(w, i) {
                const chip = document.createElement('span');
                chip.className = 'word-chip';
                chip.textContent = w;
                chip.dataset.idx = i;
                chip.onclick = function() {
                    if (!audioLoaded) { showToast('Load audio first', 'error'); return; }
                    chip.classList.add('stamped');
                    const time = audioEl.currentTime;
                    const t = document.createElement('span');
                    t.className = 'chip-time';
                    t.textContent = formatLRCTime(time);
                    chip.appendChild(t);
                    wordTimestamps[i] = time;
                    showToast('Word stamped at ' + formatLRCTime(time), 'success');
                };
                container.appendChild(chip);
            });
        }

        window.newProject = function() {
            if (confirm('Start a new project? Current work will be lost.')) window.resetProject();
        };

        window.resetProject = function() {
            document.getElementById('lyricsTextarea').value = '';
            document.getElementById('metaTitle').value = '';
            document.getElementById('metaArtist').value = '';
            document.getElementById('metaAlbum').value = '';
            document.getElementById('metaAuthor').value = '';
            document.getElementById('metaBy').value = '';
            document.getElementById('seekBar').value = 0;
            document.getElementById('seekFill').style.width = '0%';
            document.getElementById('currentTime').textContent = '0:00.00';
            document.getElementById('totalTime').textContent = '0:00.00';
            document.getElementById('audioFileName').classList.add('hidden');
            document.getElementById('audioDropContent').classList.remove('hidden');
            audioLoaded = false;
            audioEl.pause();
            audioEl.src = '';
            audioEl.load();
            setPlayState(false);
            stopRAF();
            lyrics = [];
            timestamps = [];
            activeLine = -1;
            undoStack = [];
            redoStack = [];
            currentLyricsInput = '';
            wordTimestamps = [];
            renderSyncList();
            updatePreview();
            updateProgress();
            showToast('Project reset', 'info');
        };

        window.loadLyricsFile = function() {
            document.getElementById('lyricsFileInput').click();
        };

        window.loadLyricsFileEvent = function(e) {
            const f = e.target.files[0];
            if (!f) return;
            const r = new FileReader();
            r.onload = function(ev) {
                const content = ev.target.result;
                const lines = content.split('\n');
                const hasTS = lines.some(function(l) { return /^\[\d{2}:\d{2}\.\d{2}\]/.test(l); });
                if (hasTS) {
                    parseLRCFile(content);
                } else {
                    document.getElementById('lyricsTextarea').value = content;
                    currentLyricsInput = content;
                    parseLyrics();
                    updatePreview();
                    showToast('Lyrics loaded!', 'success');
                }
            };
            r.readAsText(f);
            e.target.value = '';
        };

        //KeyBOARD
        document.addEventListener('keydown', function(e) {
            const tag = document.activeElement.tagName;
            if (e.ctrlKey && e.key === 'z') { e.preventDefault();
                window.undoAction(); return; }
            if (e.ctrlKey && e.key === 'y') { e.preventDefault();
                window.redoAction(); return; }
            if (e.ctrlKey && e.key === 'p') { e.preventDefault();
                window.togglePlay(); return; }
            if (e.ctrlKey && e.key === 'h') { e.preventDefault();
                window.openModal('findReplaceModal'); return; }
            if (tag === 'INPUT' || tag === 'SELECT') return;
            if (e.key === ' ' && tag !== 'TEXTAREA') { e.preventDefault();
                window.addTimestamp(); return; }
            if (e.key === 'ArrowLeft') { e.preventDefault();
                window.seekRelative(-2); return; }
            if (e.key === 'ArrowRight') { e.preventDefault();
                window.seekRelative(2); return; }
            if (e.key === 'Enter' && tag !== 'TEXTAREA') { e.preventDefault();
                window.addTimestamp(); return; }
        });

        window.handleLyricsKeydown = function(e) {
            if (e.ctrlKey && e.key === 'z') { e.preventDefault();
                window.undoAction(); return; }
            if (e.ctrlKey && e.key === 'y') { e.preventDefault();
                window.redoAction(); return; }
        };

        //─ HEADER SCROLL EFFECT───
        const header = document.getElementById('appHeader');
        document.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            if (currentScroll > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, { passive: true });

        //INIT
        document.addEventListener('DOMContentLoaded', function() {
            checkCookieConsent();
            preventHorizontalSwipe();

            const theme = localStorage.getItem('hajirTheme') || 'dark';
            applyTheme(theme);

            renderTutorialSteps();
            renderShortcuts();

            if (hasConsent() && !localStorage.getItem('hajirTutorialSeen')) {
                window.openModal('tutorialModal');
                localStorage.setItem('hajirTutorialSeen', '1');
            } else if (!hasConsent()) {
                if (!getCookie('hajir_tutorial_shown')) {
                    window.openModal('tutorialModal');
                    setCookie('hajir_tutorial_shown', '1', 30);
                }
            }
            updatePreview();

            // Audio drop zone events
            const dropZone = document.getElementById('audioDropZone');
            dropZone.addEventListener('dragover', function(e) { window.handleDragOver(e, 'audioDropZone'); });
            dropZone.addEventListener('dragleave', function(e) { window.handleDragLeave('audioDropZone'); });
            dropZone.addEventListener('drop', window.handleAudioDrop);
            dropZone.addEventListener('click', function() { document.getElementById('audioFileInput').click(); });
            document.getElementById('audioFileInput').addEventListener('change', window.loadAudioFile);

            // Seek bar
            document.getElementById('seekBar').addEventListener('input', function(e) {
                window.seekAudio(e.target.value);
            });
        });

        //EXPOSE GLOBALS
        window.exportLRC = exportLRC;
        window.exportTXT = exportTXT;
        window.importLRC = importLRC;
        window.copyPreview = copyPreview;
        window.newProject = newProject;
        window.resetProject = resetProject;
        window.loadLyricsFile = loadLyricsFile;
        window.loadLyricsFileEvent = loadLyricsFileEvent;
        window.toggleCase = toggleCase;
        window.splitLines = splitLines;
        window.undoAction = undoAction;
        window.redoAction = redoAction;
        window.findNext = findNext;
        window.replaceAll = replaceAll;
        window.setMode = setMode;
        window.addTimestamp = addTimestamp;
        window.adjustAll = adjustAll;
        window.clearTimestamps = clearTimestamps;
        window.onLyricsInput = onLyricsInput;
        window.updatePreview = updatePreview;
        window.seekRelative = seekRelative;
        window.seekAudio = seekAudio;
        window.togglePlay = togglePlay;
        window.toggleLoop = toggleLoop;
        window.changeSpeed = changeSpeed;
        window.changeVolume = changeVolume;

    })();