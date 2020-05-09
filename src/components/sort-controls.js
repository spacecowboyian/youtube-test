import {
  LitElement,
  html,
  css
} from 'lit-element';

export class SortControls extends LitElement {
  static get styles() {
    return css `
    :host {
      color: #fff;
      display: block;
    }

    ul {
      display: flex;
      list-style: none;
      padding: 0;
      justify-content: center;
    }

    li {
      cursor: pointer;
      text-align: center;
      flex-basis: 0;
      flex-grow: 1;
    }

    .active {
      color: rgb(64.7%, 16.5%, 16.5%);
    }
  `;
  }

  static get properties() {
    return {
      activeSort: {
        type: String,
      },
      sorts: {
        type: Array,
      },
    };
  }

  constructor() {
    super();

    this.activeSort = 'Relevance';
    this.sorts = ['Relevance', 'Date', 'Rating'];
  }

  handleSortClick(e) {
    this.activeSort = e.currentTarget.dataset.sort;
    this.dispatchEvent(
      new CustomEvent('updated', {
        detail: {
          sort: this.activeSort,
        },
      })
    );
  }

  render() {
    const {
      activeSort,
      sorts
    } = this;
    return html `
      <ul>
        ${sorts.map(
          sort => html`
            <li
              class="${activeSort === sort ? 'active' : ''}"
              @click="${this.handleSortClick}"
              data-sort="${sort}"
            >
              ${sort}
            </li>
          `
        )}
      </ul>
    `;
  }
}
customElements.define('sort-controls', SortControls);
