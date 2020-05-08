import { LitElement, html, css } from 'lit-element';

import './details-drawer';

export class ListItem extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    li {
      display: flex;
      flex-direction: column;
      height: 280px;
      margin: 16px 0;
      overflow: hidden;
    }

    header,
    footer {
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
      padding: 8px 0px;
    }

    footer {
      background-color: rgba(0%, 0%, 0%, 0.6);
      font-size: 20px;
      font-weight: 400;
      margin: 0;
      padding: 8px;
    }

    footer a {
      color: #fff;
      text-decoration: none;
    }

    footer a:visited {
      color: #ddd;
    }

    main {
      background-position: 50%;
      background-repeat: no-repeat;
      background-size: cover;
      cursor: pointer;
      flex-grow: 2;
      overflow: hidden;
      position: relative;
    }

    @media (min-width: 800px) {
      :host {
        box-sizing: border-box;
        margin-bottom: 16px;
        max-height: 300px;
        padding: 8px;
        width: 25%;
      }
      li {
        height: 320px;
        transition: all 0.1s ease-in-out;
      }

      li:hover {
        transform: scale(1.05);
      }

      main {
        background-size: auto;
        max-height: 240px;
      }

      footer {
        font-size: 16px;
      }
    }
  `;

  static get properties() {
    return {
      video: {
        type: Object,
      },
    };
  }

  constructor() {
    super();

    this.video = {};
  }

  render() {
    const { video } = this;

    return html` <li>
      <main
        @click="${() => (window.location.href = video.url)}"
        style="background-image:url(${video.thumbnail})"
      >
        <details-drawer .video=${video}></details-drawer>
      </main>
      <footer>
        <a href="${video.url}">${he.decode(video.title)}</a>
      </footer>
    </li>`;
  }
}
customElements.define('list-item', ListItem);
