import {
  LitElement,
  html,
  css
} from 'lit-element';

export class DetailsDrawer extends LitElement {

  static styles = css `

  .details-drawer {
    background: #fff;
    position: absolute;
    width: 100%;
    font-size:12px;
    bottom: calc(-30% + 2px);
    height: 30%;
    transition: all .2s ease-out;
  }

  .details-drawer.open {
    bottom: 0;
  }

  .details-header {
    display: flex;
    background: linear-gradient(to right, rgba(0,0,0,0.6) 0%,rgba(0,0,0,0) 50%);
    margin-top: -20px;
  }

  .details-tab {
    background: #fff;
    border-radius: 2px 0 0 0;
    padding: 4px 8px;
    box-shadow: -3px -2px 3px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }

  .details-comments {
    flex-grow: 1;
    padding: 4px 8px;
    color: #fff;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.6);
  }

  .details-main {
    background: #fff;
    padding: 8px;
    height: 30%;
  }

  `;

  static get properties() {
    return {
      video: {
        type: Object,
      },
      isOpen: {
        type: Boolean
      }
    };
  }

  constructor() {
    super();

    this.isOpen = false;
  }

  toggleDetails(e) {
    e.stopPropagation();
    if (this.video.description) {
      this.isOpen = !this.isOpen;
    }
  }

  render() {
    const {
      video
    } = this;
    return html `
      <div class="details-drawer ${this.isOpen ? 'open' : ''}" @click=${this.toggleDetails}>
        <div class="details-header">
          <div class="details-comments">${video.commentCount} Comments</div>
          ${video.description ? html`<div class="details-tab">Description</div>` : ''}
        </div>
        <div class="details-main">
          ${video.description}
        </div>
      </div>
    `;
  }
}
customElements.define('details-drawer', DetailsDrawer);
