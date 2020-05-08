import { LitElement, html, css } from 'lit-element';

export class SearchInput extends LitElement {
  static styles = css`
    :host {
      flex-grow: 1;
      max-width: 600px;
    }

    input {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid transparent;
      border-radius: 2px;
      box-shadow: 0 0 110px 25px rgba(0, 0, 0, 0);
      box-sizing: border-box;
      color: #fff;
      font-family: 'Roboto Condensed', sans-serif;
      font-size: 20px;
      outline-color: transparent;
      outline-style: none;
      padding: 12px;
      text-align: center;
      transition: all 0.2s ease-in;
      width: 100%;
    }

    input:focus {
      background-color: #000;
      border-color: rgba(256, 256, 256, 0.15);
      box-shadow: 0 0 110px 25px rgba(69.8%, 13.3%, 13.3%, 0.5);
    }

    input::placeholder {
      color: #333;
      transition: color 0.2s ease-in;
    }

    input:focus::placeholder {
      color: #000;
    }
  `;

  static get properties() {
    return {
      query: {
        type: String,
      },
    };
  }

  handleUpdate(e) {
    this.dispatchEvent(
      new CustomEvent('updated', {
        detail: {
          query: e.currentTarget.value,
        },
      })
    );
  }

  render() {
    const { query } = this;
    return html`
      <input
        @change=${this.handleUpdate}
        placeholder="What are we watching?"
        type="text"
        value=${query}
      />
    `;
  }
}
customElements.define('search-input', SearchInput);
