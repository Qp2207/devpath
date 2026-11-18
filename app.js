'use strict';

const byId = (id) => document.getElementById(id);
const icon = (name) => `<span class="icon" aria-hidden="true">${name}</span>`;
const htmlEntities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const escapeHtml = (value) => value.replace(/[&<>"']/g, (character) => htmlEntities[character]);
const formatLessonText = (text) => escapeHtml(text).replace(/&lt;.*?&gt;/g, (match) => `<code>${match}</code>`);
const lessonHref = (course, lesson) => `#khoa-hoc/${course.id}/${lesson.id}`;
const lessonEntries = courses.flatMap((course) => course.lessons.map((lesson) => ({ course, lesson, href: lessonHref(course, lesson) })));
const labels = { 'tong-quan': 'Tổng quan', 'lo-trinh': 'Lộ trình học', 'thuc-hanh': 'Thực hành', 'tai-lieu': 'Tài liệu', 'tien-do': 'Tiến độ học tập' };

function readLocal(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function writeLocal(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // A blocked or full browser store still allows working in the current page.
  }
}

const savedCompleted = readLocal('devpath-completed', []);
const completed = new Set(Array.isArray(savedCompleted) ? savedCompleted.filter((href) => lessonEntries.some((entry) => entry.href === href)) : []);
const savedVisited = readLocal('devpath-visited', []);
const visited = new Set(Array.isArray(savedVisited) ? savedVisited : []);
const demo = {
  html: '<main>\n  <h1>Xin chào, DevPath!</h1>\n  <p id="message">Sẵn sàng viết mã?</p>\n  <button id="start">Bắt đầu</button>\n</main>',
  css: 'main {\n  padding: 24px;\n  background: #eee8ff;\n  border-radius: 14px;\n}\nbutton {\n  border: 0;\n  border-radius: 8px;\n  padding: 8px 14px;\n  background: #5838bc;\n  color: white;\n  cursor: pointer;\n}',
  js: "const message = document.querySelector('#message');\ndocument.querySelector('#start').addEventListener('click', () => {\n  message.textContent = 'Bạn vừa chạy JavaScript!';\n});",
};

let filter = 'all';
const doneCount = (course) => course.lessons.filter((lesson) => completed.has(lessonHref(course, lesson))).length;
const wasStarted = (course) => course.lessons.some((lesson) => visited.has(lessonHref(course, lesson))) || doneCount(course) > 0;
const courseMark = (course) => `<span class="course-mark">${course.mark}</span>`;

function updateProgress() {
  byId('sidebar-meter').max = lessonEntries.length;
  byId('sidebar-meter').value = completed.size;
  byId('sidebar-caption').textContent = `${completed.size}/${lessonEntries.length} bài đã hoàn thành`;
  const started = courses.some(wasStarted);
  const recent = lessonEntries.find((entry) => entry.href === readLocal('devpath-last-lesson', ''));
  const next = (recent && !completed.has(recent.href) ? recent : null) ?? lessonEntries.find((entry) => !completed.has(entry.href));
  const start = byId('hero-start');
  start.href = started ? (next?.href ?? '#tien-do') : '#khoa-hoc/html';
  const startLabel = started ? (next ? 'Tiếp tục học' : 'Xem tiến độ') : 'Bắt đầu học';
  start.innerHTML = `${startLabel} ${icon('arrow_forward')}`;
}

function renderCourseCards() {
  const shown = courses.filter((course) => {
    const done = doneCount(course) === course.lessons.length;
    if (filter === 'done') return done;
    if (filter === 'learning') return wasStarted(course) && !done;
    return true;
  });
  const empty = filter === 'done' ? 'Chưa có khóa học nào hoàn thành.' : 'Mở một bài học để bắt đầu theo dõi khóa học tại đây.';
  byId('course-grid').innerHTML = shown.map((course) => {
    const count = doneCount(course);
    const minutes = course.lessons.reduce((total, lesson) => total + lesson.minutes, 0);
    const action = count === course.lessons.length ? 'Ôn lại' : wasStarted(course) ? 'Tiếp tục học' : 'Bắt đầu học';
    return `<a class="course-card course-${course.id}" href="#khoa-hoc/${course.id}">
      <div class="course-card-top">${courseMark(course)}<span class="level">${course.level}</span></div>
      <div><h3>${course.title}</h3><p>${course.description}</p></div>
      <div class="course-meta"><span>${icon('book_2')} ${course.lessons.length} bài học</span><span>${icon('timer')} ${minutes} phút</span></div>
      <div class="card-link">${action}${count ? `<span class="card-completion">${count}/${course.lessons.length} bài</span>` : ''}${icon('arrow_forward')}</div>
    </a>`;
  }).join('') || `<div class="empty-state">${empty}</div>`;
}

function pageIntro(title, description, backHref, backLabel) {
  return `<div class="page-intro">
    ${backHref ? `<a href="${backHref}">${icon('arrow_back')} ${backLabel}</a>` : ''}
    <h1>${title}</h1><p>${description}</p>
  </div>`;
}

function renderPath(withProgress) {
  const title = withProgress ? labels['tien-do'] : labels['lo-trinh'];
  const description = withProgress
    ? `Bạn đã hoàn thành ${completed.size}/${lessonEntries.length} bài. Tiến độ được lưu trong trình duyệt này.`
    : 'Bắt đầu với cấu trúc trang, tiếp đến là bố cục và cuối cùng là tương tác.';
  return pageIntro(title, description) + `<ol class="path-list">${courses.map((course) => {
    const count = doneCount(course);
    return `<li><a class="path-item course-${course.id}" href="#khoa-hoc/${course.id}">
      ${courseMark(course)}
      <span class="path-copy"><strong>${course.title}</strong><small>${withProgress ? `${count}/${course.lessons.length} bài đã hoàn thành` : course.description}</small>
        ${withProgress ? `<progress value="${count}" max="${course.lessons.length}" aria-label="Tiến độ ${course.title}"></progress>` : ''}
      </span>${icon('chevron_right')}
    </a></li>`;
  }).join('')}</ol>`;
}

function renderCourse(course) {
  return pageIntro(course.title, course.description, '#lo-trinh', 'Lộ trình học') + `
    <ol class="lesson-list">${course.lessons.map((lesson, index) => {
      const href = lessonHref(course, lesson);
      const done = completed.has(href);
      return `<li><a class="lesson-link" href="${href}">
        <span class="lesson-number${done ? ' complete' : ''}">${done ? icon('check') + '<span class="sr-only">Đã hoàn thành</span>' : index + 1}</span>
        <span class="lesson-copy"><strong>${lesson.title}</strong><small>${lesson.summary} · ${lesson.minutes} phút</small></span>${icon('chevron_right')}
      </a></li>`;
    }).join('')}</ol>`;
}

function editorMarkup() {
  return `<section class="editor" aria-label="Trình soạn thảo mã">
    <div class="editor-toolbar">
      <div class="editor-tabs" aria-label="Chọn ngôn ngữ">
        <button type="button" data-language="html" aria-pressed="true">HTML</button>
        <button type="button" data-language="css" aria-pressed="false">CSS</button>
        <button type="button" data-language="js" aria-pressed="false">JS</button>
      </div>
      <div class="editor-actions">
        <button type="button" class="button secondary" id="reset-editor">${icon('restart_alt')} Nạp lại mẫu</button>
        <button type="button" class="button primary" id="run-editor">${icon('play_arrow')} Chạy mã</button>
      </div>
    </div>
    <div class="editor-grid">
      <textarea id="code-input" aria-label="Mã HTML" spellcheck="false" autocapitalize="off" autocomplete="off" wrap="off"></textarea>
      <div class="preview-pane">
        <span class="preview-label">Kết quả</span>
        <iframe id="code-output" sandbox="allow-scripts allow-forms" title="Kết quả chạy mã"></iframe>
      </div>
    </div>
  </section>`;
}

function previewDocument({ html, css, js }) {
  // Keep the editor CSS and JS intact even when a string contains an HTML end tag.
  const asScriptString = (value) => JSON.stringify(value).replace(/</g, '\\u003c');
  return `<!doctype html><html lang="vi"><head>
    <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: blob:; font-src data:; base-uri about:; form-action 'none'">
    <base href="about:srcdoc">
    <style>body { margin: 16px; font: 16px/1.5 system-ui, sans-serif; color: #20243a; } button, input { font: inherit; }</style>
    <script>
      {
        const styles = document.createElement('style');
        styles.textContent = ${asScriptString(css)};
        document.head.append(styles);
      }
      window.addEventListener('error', (event) => {
        const error = document.createElement('p');
        error.setAttribute('role', 'alert');
        error.style.color = '#a31a31';
        error.textContent = 'Lỗi JavaScript: ' + event.message;
        document.body.append(error);
      });
    </script>
    </head><body>${html}
    <script>
      {
        const program = document.createElement('script');
        program.textContent = ${asScriptString(js)};
        document.body.append(program);
      }
    </script></body></html>`;
}

const editorDrafts = new Map();

function mountEditor(template, initialLanguage, key) {
  const input = byId('code-input');
  const output = byId('code-output');
  const tabs = document.querySelectorAll('[data-language]');
  const storageKey = `devpath-draft-${key}`;
  const original = { html: template.html, css: template.css ?? '', js: template.js ?? '' };
  const saved = editorDrafts.get(key) ?? readLocal(storageKey, {});
  const current = Object.fromEntries(Object.entries(original).map(([language, code]) => [
    language, typeof saved[language] === 'string' ? saved[language] : code,
  ]));
  let active = initialLanguage;

  function choose(language) {
    active = language;
    input.value = current[language];
    input.setAttribute('aria-label', `Mã ${language.toUpperCase()}`);
    tabs.forEach((tab) => tab.setAttribute('aria-pressed', String(tab.dataset.language === language)));
  }

  function saveDraft() {
    editorDrafts.set(key, current);
    writeLocal(storageKey, current);
  }

  function run() {
    output.srcdoc = previewDocument(current);
    byId('status').textContent = 'Đã cập nhật kết quả chạy mã.';
  }

  tabs.forEach((tab) => tab.addEventListener('click', () => choose(tab.dataset.language)));
  input.addEventListener('input', () => {
    current[active] = input.value;
    saveDraft();
  });
  input.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      run();
    }
  });
  byId('run-editor').addEventListener('click', run);
  byId('reset-editor').addEventListener('click', () => {
    Object.assign(current, original);
    saveDraft();
    choose(active);
    run();
  });
  choose(initialLanguage);
  output.srcdoc = previewDocument(current);
}

function mountLesson(course, lesson) {
  const href = lessonHref(course, lesson);
  const index = lessonEntries.findIndex((entry) => entry.href === href);
  const previous = lessonEntries[index - 1];
  const next = lessonEntries[index + 1];
  visited.add(href);
  writeLocal('devpath-visited', [...visited]);
  writeLocal('devpath-last-lesson', href);
  byId('detail').innerHTML = `<div class="lesson-header">
      ${pageIntro(lesson.title, escapeHtml(lesson.summary), `#khoa-hoc/${course.id}`, course.title)}
      <button type="button" class="button secondary" id="complete-lesson"></button>
    </div>
    <article class="page-panel"><h2>Kiến thức chính</h2><ul>${lesson.points.map((point) => `<li>${formatLessonText(point)}</li>`).join('')}</ul></article>
    <div class="challenge"><strong>Bài tập thực hành</strong><p>${escapeHtml(lesson.challenge)}</p></div>
    ${editorMarkup()}
    <nav class="lesson-pagination" aria-label="Chuyển bài học">
      ${previous ? `<a class="button secondary" href="${previous.href}">${icon('chevron_left')} Bài trước</a>` : '<span></span>'}
      ${next ? `<a class="button primary" href="${next.href}">Bài tiếp theo ${icon('chevron_right')}</a>` : `<a class="button primary" href="#tien-do">Xem tiến độ ${icon('arrow_forward')}</a>`}
    </nav>`;
  const toggle = byId('complete-lesson');
  function updateToggle() {
    const done = completed.has(href);
    toggle.setAttribute('aria-pressed', String(done));
    toggle.innerHTML = done ? `${icon('check')} Đã hoàn thành` : 'Đánh dấu hoàn thành';
  }
  toggle.addEventListener('click', () => {
    if (completed.has(href)) completed.delete(href);
    else completed.add(href);
    writeLocal('devpath-completed', [...completed]);
    updateToggle();
    updateProgress();
  });
  updateToggle();
  mountEditor(lesson, course.id, lesson.id);
}

function renderReferences() {
  return pageIntro(labels['tai-lieu'], 'Tra cứu nhanh cú pháp và mở bài học để xem ví dụ.') + `
    <div class="reference-grid">${references.map((reference) => {
      const course = courses.find((item) => item.id === reference.course);
      return `<article class="page-panel"><h2>${course.title}</h2>
        <ul>${reference.terms.map(([term, meaning]) => `<li><code>${escapeHtml(term)}</code> — ${meaning}</li>`).join('')}</ul>
        <a href="#khoa-hoc/${course.id}/${reference.lesson}">Xem bài học ${icon('arrow_forward')}</a></article>`;
    }).join('')}</div>`;
}

const mobile = matchMedia('(max-width: 760px)');
const menu = byId('menu-button');
const sidebar = byId('sidebar');
const backdrop = byId('mobile-backdrop');

function setMenu(open, refocus = false) {
  sidebar.classList.toggle('open', open);
  backdrop.hidden = !open;
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
  if (open) sidebar.querySelector('.nav-link.active, .nav-link').focus();
  if (refocus) menu.focus();
}

function route(initial = false) {
  const parts = (location.hash.slice(1) || 'tong-quan').split('/');
  const [page, courseId, lessonId] = parts;
  const course = page === 'khoa-hoc' && courses.find((item) => item.id === courseId);
  const lesson = course && course.lessons.find((item) => item.id === lessonId);
  const valid = course ? parts.length === 2 || (parts.length === 3 && lesson) : parts.length === 1 && Object.hasOwn(labels, page);
  const overview = valid && page === 'tong-quan';
  const title = !valid ? 'Không tìm thấy trang' : lesson?.title ?? (course ? course.title : labels[page]);
  byId('overview').hidden = !overview;
  const detail = byId('detail');
  detail.hidden = overview;
  detail.replaceChildren();
  document.title = overview ? 'DevPath — Học lập trình web' : `${title} · DevPath`;
  byId('page-label').textContent = title;
  setMenu(false);

  document.querySelectorAll('.nav-link').forEach((link) => {
    const active = valid && link.dataset.page === (course ? course.id : page);
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', lesson ? 'location' : 'page');
    else link.removeAttribute('aria-current');
  });

  if (!valid) {
    detail.innerHTML = pageIntro(title, 'Mở lộ trình để chọn khóa học hoặc bài học.', '#lo-trinh', 'Lộ trình học');
  } else if (overview) {
    renderCourseCards();
  } else if (lesson) {
    mountLesson(course, lesson);
  } else if (course) {
    detail.innerHTML = renderCourse(course);
  } else if (page === 'thuc-hanh') {
    detail.innerHTML = pageIntro('Playground', 'Chỉnh sửa HTML, CSS hoặc JavaScript rồi bấm Chạy mã để xem thay đổi.') + editorMarkup();
    mountEditor(demo, 'html', 'playground');
  } else {
    detail.innerHTML = page === 'tai-lieu' ? renderReferences() : renderPath(page === 'tien-do');
  }
  updateProgress();

  if (!initial) {
    window.scrollTo(0, 0);
    byId('main').focus({ preventScroll: true });
  }
}

const dialog = byId('search-dialog');
const search = byId('search-input');
const results = byId('search-results');
const normalize = (value) => value.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replaceAll('đ', 'd');

function renderSearch() {
  const words = normalize(search.value.trim()).split(/\s+/).filter(Boolean);
  const query = words.join(' ');
  const matches = lessonEntries.map((entry) => {
    const { course, lesson } = entry;
    const searchText = normalize(`${course.title} ${lesson.title} ${lesson.summary} ${lesson.points.join(' ')}`);
    const rank = normalize(lesson.title).includes(query) ? 0 : searchText.includes(query) ? 1 : 2;
    return { ...entry, rank, matchesQuery: words.every((word) => searchText.includes(word)) };
  }).filter((entry) => entry.matchesQuery).sort((first, second) => first.rank - second.rank);
  results.innerHTML = matches.map(({ course, lesson, href }) => `<a href="${href}">${icon('book_2')}<span>${lesson.title}<small>${course.title} · ${lesson.minutes} phút</small></span></a>`).join('')
    || '<p class="empty-state" role="status">Không tìm thấy bài học phù hợp.</p>';
}

function openSearch() {
  if (!dialog.open) {
    search.value = '';
    renderSearch();
    dialog.showModal();
  }
  search.focus();
}

byId('search-trigger').addEventListener('click', openSearch);
byId('search-close').addEventListener('click', () => dialog.close());
search.addEventListener('input', renderSearch);
search.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === 'ArrowDown') {
    const first = results.querySelector('a');
    if (!first) return;
    event.preventDefault();
    if (event.key === 'Enter') first.click();
    else first.focus();
  }
});
results.addEventListener('click', (event) => {
  if (event.target.closest('a')) dialog.close();
});
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

document.querySelector('.skip-link').addEventListener('click', (event) => {
  event.preventDefault();
  byId('main').focus();
  byId('main').scrollIntoView();
});
document.querySelectorAll('[data-filter]').forEach((button, _, buttons) => {
  button.addEventListener('click', () => {
    filter = button.dataset.filter;
    buttons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    renderCourseCards();
  });
});
menu.addEventListener('click', () => setMenu(!sidebar.classList.contains('open'), sidebar.classList.contains('open')));
backdrop.addEventListener('click', () => setMenu(false, true));
sidebar.addEventListener('click', (event) => {
  if (mobile.matches && event.target.closest('a')) setMenu(false, true);
});
mobile.addEventListener('change', () => setMenu(false));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && sidebar.classList.contains('open')) setMenu(false, true);
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    openSearch();
  }
});
window.addEventListener('hashchange', () => route());
if (/Mac|iPhone|iPad/.test(navigator.platform)) byId('shortcut-modifier').textContent = '⌘';
route(true);
