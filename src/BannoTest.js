import {
  LitElement,
  html,
  css
} from 'lit-element';
import './components/youtube-search.js';

export class BannoTest extends LitElement {
  static get properties() {
    return {
      title: {
        type: String
      },
      page: {
        type: String
      }
    };
  }

  static get styles() {
    return css `
      .container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
        min-height: 100%;
      }
    `;
  }

  render() {
    return html `
      <main class="container">
        <youtube-search></youtube-search>
      </main>
    `;
  }
}
