import {
  LitElement,
  html,
  css
} from 'lit-element';

export class HelloWorld extends LitElement {

  static get properties() {
    return {
      message: {
        type: String,
      },
      href: {
        type: String,
      },
      response: {
        type: Array
      }
    };
  }

  static get styles() {
    return css `
      :host {
        display: block;
      }

      .message {
        color: red;
      }
    `;
  }

  constructor() {
    super();

    this.message = "Hello Cruel World!";
    this.response = [];
  }

  firstUpdated() {
    fetch("http://dummy.restapiexample.com/api/v1/employees")
      .then(r => r.json())
      .then(r => {
        this.response = r.data;
      });
  }

  render() {
    const {
      href,
      message,
      response
    } = this;
    return html `
      <div>
        <a href=${href}> ${message}</a>
      </div>
      <div>
        <slot class="message"></slot>
      </div>
      <input type="text" value=${message} @keyup=${ e => this.message = e.currentTarget.value} />
      <ul>
        ${response.map( person => html`
          <li>${person.employee_name}</li>
        `
        )}
      </ul>
    `
  }
}

customElements.define('hello-world', HelloWorld);
