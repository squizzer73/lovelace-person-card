import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('person-card-editor')
export class PersonCardEditor extends LitElement {}

declare global {
  interface HTMLElementTagNameMap {
    'person-card-editor': PersonCardEditor;
  }
}
