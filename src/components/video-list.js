import {
  LitElement,
  html,
  css
} from 'lit-element';

import './list-item.js';

export class VideoList extends LitElement {
  static get styles() {
    css `
      :host {
        display: block;
      }

      .video-list {
        list-style: none;
        padding: 0px;
      }

      @media (min-width: 800px) {
        .video-list {
          display: flex;
          flex-wrap: wrap;
          padding: 0 16px;
        }
      }
    `;
  }

  static get properties() {
    return {
      videos: {
        type: Array,
      },
    };
  }

  render() {
    const {
      videos
    } = this;
    return html `
      <ul class="video-list">
        ${videos.map(video => html` <list-item .video=${video}></list-item> `)}
      </ul>
    `;
  }
}
customElements.define('video-list', VideoList);
