/** Section heading icons — inline SVGs, zero dependency. */

const stroke =
  'fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"'

function icon(paths: string, className = 'section-icon-svg'): string {
  return `<svg class="${className}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${paths}</svg>`
}

export type SectionIconId =
  | 'work'
  | 'experience'
  | 'skills'
  | 'education'
  | 'certifications'
  | 'about'
  | 'contact'

const iconPaths: Record<SectionIconId, string> = {
  work: `<rect ${stroke} x="3" y="4" width="8" height="7" rx="1.5"/><rect ${stroke} x="13" y="4" width="8" height="7" rx="1.5"/><rect ${stroke} x="3" y="13" width="8" height="7" rx="1.5"/><rect ${stroke} x="13" y="13" width="8" height="7" rx="1.5"/>`,
  experience: `<rect ${stroke} x="3.5" y="7" width="17" height="13" rx="2"/><path ${stroke} d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7M3.5 12h17"/>`,
  skills: `<path ${stroke} d="M12 3l1.6 4.2L18 9l-4.4 1.8L12 15l-1.6-4.2L6 9l4.4-1.8L12 3z"/><path ${stroke} d="M5 16.5l.9 2.2L8.2 20l-2.3.9L5 23l-.9-2.1L1.8 20l2.3-.9L5 16.5z"/><path ${stroke} d="M18.5 14.5l.8 1.9 2 .8-2 .8-.8 1.9-.8-1.9-2-.8 2-.8.8-1.9z"/>`,
  education: `<path ${stroke} d="M3 9.5L12 5l9 4.5-9 4.5L3 9.5z"/><path ${stroke} d="M7 12.2v4.1c0 .8 2.2 2.2 5 2.2s5-1.4 5-2.2v-4.1"/><path ${stroke} d="M21 10.2v5.3"/>`,
  certifications: `<circle ${stroke} cx="12" cy="9" r="5.5"/><path ${stroke} d="M9.2 13.8L8 21l4-2.2L16 21l-1.2-7.2"/><path ${stroke} d="M10 9h4M12 7v4"/>`,
  about: `<circle ${stroke} cx="12" cy="8" r="3.5"/><path ${stroke} d="M5.5 19.5c1.6-3.2 4-4.8 6.5-4.8s4.9 1.6 6.5 4.8"/>`,
  contact: `<rect ${stroke} x="3.5" y="5.5" width="17" height="13" rx="2"/><path ${stroke} d="M4.5 8l7.5 5.2L19.5 8"/>`,
}

export function sectionIcon(id: SectionIconId, className = 'section-icon-svg'): string {
  return icon(iconPaths[id], className)
}

export function navIcon(id: SectionIconId): string {
  return sectionIcon(id, 'nav-icon-svg')
}
