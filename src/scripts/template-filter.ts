/**
 * The Shareable Bots tag filter + text search.
 *
 * A BUNDLED module, never inline: `audit-scripts.mjs` fails the build on any inline <script>
 * with content, and the production CSP is `script-src 'self'` with no nonces. Astro compiles
 * the importing component's <script> to a hoisted module and `vite.build.assetsInlineLimit: 0`
 * (astro.config.mjs) guarantees it lands in /_astro/*.js rather than being inlined.
 *
 * PROGRESSIVE ENHANCEMENT, NOT A DEPENDENCY. The list is fully server-rendered; this only
 * hides rows. The filter form ships `hidden` and the first thing done below is to un-hide it —
 * so with JS off a reader sees the complete list and NO controls that do nothing (§4.4 rule 7,
 * "a dead control is worse than no control"). Nothing here fetches.
 *
 * FACET SEMANTICS: OR within a facet, AND across facets. Picking `personal` + `business` shows
 * either; adding `finance` shows (personal OR business) AND finance. That is the standard
 * faceted model and the only one where adding a chip inside a facet can never shrink the set
 * to zero on its own.
 */

const ROOT = '[data-template-filter-root]';
const SEARCH_DEBOUNCE_MS = 120;

type Row = {
  el: HTMLElement;
  tags: Set<string>;
  text: string;
};

function readRows(root: HTMLElement): Row[] {
  return [...root.querySelectorAll<HTMLElement>('[data-template-row]')].map((el) => ({
    el,
    tags: new Set((el.dataset.templateTags ?? '').split(/\s+/).filter(Boolean)),
    text: el.dataset.templateText ?? '',
  }));
}

function facetOf(button: HTMLElement): string {
  return button.dataset.templateTagFacet ?? '';
}

export function initTemplateFilter(): void {
  const root = document.querySelector<HTMLElement>(ROOT);
  if (!root) return;

  const form = root.querySelector<HTMLFormElement>('[data-template-filter]');
  const input = root.querySelector<HTMLInputElement>('[data-template-search]');
  const status = root.querySelector<HTMLElement>('[data-template-count]');
  const empty = root.querySelector<HTMLElement>('[data-template-empty]');
  const clear = root.querySelector<HTMLButtonElement>('[data-template-clear]');
  const chips = [...root.querySelectorAll<HTMLButtonElement>('[data-template-tag]')];
  if (!form || !input) return;

  const rows = readRows(root);
  const sections = [...root.querySelectorAll<HTMLElement>('[data-template-section]')];
  const total = rows.length;
  const countTemplate = status?.dataset.templateCountTemplate ?? '{shown} of {total}';

  // The controls are real now.
  form.removeAttribute('hidden');

  const active = new Set<string>();
  let query = '';

  /** Active chips grouped by facet. Recomputed once per apply(), not once per row. */
  function activeByFacet(): string[][] {
    const byFacet = new Map<string, string[]>();
    for (const chip of chips) {
      const tag = chip.dataset.templateTag!;
      if (!active.has(tag)) continue;
      const facet = facetOf(chip);
      const list = byFacet.get(facet) ?? [];
      list.push(tag);
      byFacet.set(facet, list);
    }
    return [...byFacet.values()];
  }

  function matches(row: Row, groups: string[][]): boolean {
    if (query && !row.text.includes(query)) return false;
    // OR within a facet group, AND across groups.
    for (const tags of groups) {
      if (!tags.some((tag) => row.tags.has(tag))) return false;
    }
    return true;
  }

  function syncUrl() {
    const params = new URLSearchParams(window.location.search);
    if (active.size) params.set('tags', [...active].join(','));
    else params.delete('tags');
    if (query) params.set('q', query);
    else params.delete('q');
    const qs = params.toString();
    window.history.replaceState(null, '', qs ? `${window.location.pathname}?${qs}` : window.location.pathname);
  }

  /**
   * Sections complicate hiding: a section whose every row is filtered out must disappear
   * itself, and so must its quick-nav chip — otherwise the reader is offered a jump link to an
   * empty heading, which is worse than no link. Counts are rewritten to the visible tally so
   * the nav never claims twelve when it can show two.
   */
  function syncSections() {
    for (const section of sections) {
      const visible = [...section.querySelectorAll<HTMLElement>('[data-template-row]')].filter(
        (row) => !row.hidden
      ).length;
      section.hidden = visible === 0;
      const count = section.querySelector<HTMLElement>('[data-template-section-count]');
      if (count) count.textContent = String(visible);
      const id = section.dataset.templateSection;
      const chip = id ? root!.querySelector<HTMLElement>(`[data-template-jump-item="${id}"]`) : null;
      if (chip) {
        chip.hidden = visible === 0;
        const chipCount = chip.querySelector<HTMLElement>('[data-template-jump-count]');
        if (chipCount) chipCount.textContent = String(visible);
      }
    }
  }

  function apply() {
    const groups = activeByFacet();
    let shown = 0;
    for (const row of rows) {
      const visible = matches(row, groups);
      row.el.hidden = !visible;
      if (visible) shown += 1;
    }
    syncSections();
    if (status) {
      status.textContent = countTemplate.replace('{shown}', String(shown)).replace('{total}', String(total));
    }
    if (empty) empty.hidden = shown !== 0;
    for (const chip of chips) {
      const on = active.has(chip.dataset.templateTag!);
      chip.setAttribute('aria-pressed', on ? 'true' : 'false');
      chip.dataset.templateTagOn = on ? 'true' : 'false';
    }
    syncUrl();
  }

  for (const chip of chips) {
    chip.addEventListener('click', () => {
      const tag = chip.dataset.templateTag!;
      if (active.has(tag)) active.delete(tag);
      else active.add(tag);
      apply();
    });
  }

  let debounce: number | undefined;
  input.addEventListener('input', () => {
    window.clearTimeout(debounce);
    debounce = window.setTimeout(() => {
      query = input.value.trim().toLowerCase();
      apply();
    }, SEARCH_DEBOUNCE_MS);
  });

  // The form has a real action so it degrades to a page load if JS dies between render and
  // hydration; once we are here, submitting must not navigate.
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    window.clearTimeout(debounce);
    query = input.value.trim().toLowerCase();
    apply();
  });

  clear?.addEventListener('click', () => {
    active.clear();
    query = '';
    input.value = '';
    apply();
  });

  // Restore state from the URL so a filtered view is shareable and survives the back button.
  const params = new URLSearchParams(window.location.search);
  const known = new Set(chips.map((chip) => chip.dataset.templateTag!));
  for (const tag of (params.get('tags') ?? '').split(',').map((t) => t.trim()).filter(Boolean)) {
    if (known.has(tag)) active.add(tag);
  }
  const initialQuery = params.get('q') ?? '';
  if (initialQuery) {
    input.value = initialQuery;
    query = initialQuery.trim().toLowerCase();
  }
  apply();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initTemplateFilter(), { once: true });
} else {
  initTemplateFilter();
}

export {};
