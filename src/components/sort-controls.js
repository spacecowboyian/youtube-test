import { LitElement, html, css } from 'lit-element';

export class SortControls extends LitElement {
  static styles = css`
    :host {
      color: #fff;
      display: block;
    }

    ul {
      display: flex;
      list-style: none;
      padding: 0;
    }

    li {
      cursor: pointer;
      flex-grow: 1;
      text-align: center;
    }

    .active {
      color: rgb(64.7%, 16.5%, 16.5%);
    }
  `;

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
    const { activeSort, sorts } = this;
    return html`
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
