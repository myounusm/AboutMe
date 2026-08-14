/** Simple line icons for skills — kept inline for a zero-dependency build. */

const svg = (paths: string): string =>
  `<svg class="skill-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${paths}</svg>`

const stroke = 'fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"'

export const skillIcons: Record<string, string> = {
  'ASP.NET Core (MVC)': svg(
    `<path ${stroke} d="M4 7h16M4 12h16M4 17h10"/><rect ${stroke} x="3" y="4" width="18" height="16" rx="2"/>`,
  ),
  'C# / .NET': svg(
    `<path ${stroke} d="M8 8l-4 4 4 4M16 8l4 4-4 4M14 7l-4 10"/>`,
  ),
  'OutSystems (Low-Code)': svg(
    `<rect ${stroke} x="3" y="3" width="8" height="8" rx="1.5"/><rect ${stroke} x="13" y="3" width="8" height="8" rx="1.5"/><rect ${stroke} x="3" y="13" width="8" height="8" rx="1.5"/><path ${stroke} d="M13 17h8M17 13v8"/>`,
  ),
  'Entity Framework': svg(
    `<ellipse ${stroke} cx="12" cy="6" rx="7" ry="3"/><path ${stroke} d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>`,
  ),
  'Microservices & SOA': svg(
    `<circle ${stroke} cx="6" cy="7" r="2.5"/><circle ${stroke} cx="18" cy="7" r="2.5"/><circle ${stroke} cx="12" cy="17" r="2.5"/><path ${stroke} d="M8.2 8.5l2.5 6M15.8 8.5l-2.5 6M8.5 7h7"/>`,
  ),
  LINQ: svg(
    `<path ${stroke} d="M4 6h10M4 12h16M4 18h7"/><circle ${stroke} cx="18" cy="18" r="3"/><path ${stroke} d="M20.2 20.2L22 22"/>`,
  ),
  'REST & SOAP APIs': svg(
    `<path ${stroke} d="M10 14l4-4"/><path ${stroke} d="M8.5 11.5a3.5 3.5 0 0 1 0-5l1.5-1.5a3.5 3.5 0 0 1 5 5L13.5 11.5"/><path ${stroke} d="M15.5 12.5a3.5 3.5 0 0 1 0 5L14 19.5a3.5 3.5 0 0 1-5-5l1.5-1.5"/>`,
  ),
  'JWT Authentication': svg(
    `<path ${stroke} d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"/><path ${stroke} d="M9.5 12l1.8 1.8L15 10"/>`,
  ),
  'Angular 14': svg(
    `<path ${stroke} d="M12 3L4.5 6.2l1.2 10.3L12 21l6.3-4.5 1.2-10.3L12 3z"/><path ${stroke} d="M9.2 13.5h5.6M12 8.5l2.2 5H9.8L12 8.5z"/>`,
  ),
  'TypeScript / JavaScript': svg(
    `<rect ${stroke} x="3" y="3" width="18" height="18" rx="2"/><path ${stroke} d="M8 16v-5M8 11H6.5M13 16c.8.7 2.7.7 2.7-1.1V11"/>`,
  ),
  'HTML5 & Bootstrap': svg(
    `<path ${stroke} d="M5 4h14l-1.2 14.5L12 21l-5.8-2.5L5 4z"/><path ${stroke} d="M8.5 8h7l-.4 5H12v2.2l2.2-.7.2 2.1L12 17.5 9.6 16.6"/>`,
  ),
  'Ocelot / RedHat 3Scale': svg(
    `<path ${stroke} d="M4 12h4l2-5 3 10 2-5h5"/><circle ${stroke} cx="12" cy="12" r="9"/>`,
  ),
  'Microsoft SQL Server': svg(
    `<ellipse ${stroke} cx="12" cy="5.5" rx="7" ry="2.5"/><path ${stroke} d="M5 5.5v4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-4M5 9.5v4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-4M5 13.5v4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-4"/>`,
  ),
  'Oracle / PL-SQL': svg(
    `<ellipse ${stroke} cx="12" cy="12" rx="8" ry="5"/><ellipse ${stroke} cx="12" cy="12" rx="3.5" ry="5"/>`,
  ),
  'Azure AI Services': svg(
    `<path ${stroke} d="M7 16a4.5 4.5 0 1 1 1.2-8.8A5.5 5.5 0 0 1 19 11.5c0 .2 0 .3-.02.5A3.5 3.5 0 0 1 18 19H7.5"/><path ${stroke} d="M10 13h.01M12.5 11.5l1 1 2-2"/>`,
  ),
  'OCR & Computer Vision': svg(
    `<path ${stroke} d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"/><circle ${stroke} cx="12" cy="12" r="2.75"/>`,
  ),
  'NLP & Machine Learning': svg(
    `<circle ${stroke} cx="8" cy="8" r="2"/><circle ${stroke} cx="16" cy="8" r="2"/><circle ${stroke} cx="12" cy="16" r="2"/><path ${stroke} d="M9.5 9.2l1.5 5.1M14.5 9.2l-1.5 5.1M10 8h4"/>`,
  ),
  'SharePoint Integration': svg(
    `<rect ${stroke} x="3" y="3" width="8" height="8" rx="1"/><rect ${stroke} x="13" y="3" width="8" height="8" rx="1"/><rect ${stroke} x="3" y="13" width="8" height="8" rx="1"/><rect ${stroke} x="13" y="13" width="8" height="8" rx="1"/>`,
  ),
  'Cursor AI': svg(
    `<path ${stroke} d="M5 19L12 4l7 15"/><path ${stroke} d="M8.2 13h7.6"/><circle ${stroke} cx="12" cy="19" r="1.4"/>`,
  ),
}

export function iconForSkill(name: string): string {
  return (
    skillIcons[name] ??
    svg(`<circle ${stroke} cx="12" cy="12" r="7"/><path ${stroke} d="M12 8v4l2.5 2.5"/>`)
  )
}
