import {
  LitElement,
  html,
  css
} from 'lit-element';
import './search-input.js';
import './sort-controls.js';
import './video-list.js';

export class YoutubeSearch extends LitElement {
  static get styles() {
    return css `
      :host {
        align-items: center;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        justify-content: center;
      }

      .container {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        width: 100%;
      }

      header {
        background: rgba(0, 0, 0, 0.9);
        padding: 16px;
        position: sticky;
        top: 0;
        z-index: 999;
      }

      @media (min-width: 800px) {
        :host {
          flex-direction: row;
        }
        header {
          align-self: center;
          box-sizing: border-box;
          padding: 16px 20%;
          width: 100%;
        }

        .video-list {
          display: flex;
          flex-wrap: wrap;
        }
      }
    `;
  }

  static get properties() {
    return {
      activeSort: {
        type: String,
      },
      query: {
        type: String,
      },
      results: {
        type: Array,
      },
    };
  }

  constructor() {
    super();

    this.activeSort = 'Relevance';
    this.key = window.location.href === 'http://localhost:8000/' ? 'AIzaSyCkcaHseof1yhGsN_VWsbmRJLSOu1kllFI' : 'AIzaSyC12NzCyM4QYkKRLI3f3Kb8AxpBbzitBBo';
    console.log(window.location, this.key)
    this.query = 'TA22';
    this.results = [];
  }

  fetchCommentCounts(ids) {
    return fetch(
        `https://www.googleapis.com/youtube/v3/videos?key=${this.key}&part=statistics&id=${ids}`
      )
      .then(r => r.json())
      .then(stats => stats.items.map(item => item.statistics.commentCount));
  }

  fetchSearchResults(query, sort) {
    return fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${this.key}&part=snippet&q=${query}&maxResults=20&type=video&order=${sort}`
      )
      .then(r => r.json())
      .then(async r => {
        const itemIds = r.items.map(item => item.id.videoId);
        const itemCommentCounts = await this.fetchCommentCounts(itemIds);
        const itemList = r.items.map((item, i) => {
          const itemData = item.snippet;

          return {
            description: itemData.description,
            id: item.id.videoId,
            commentCount: itemCommentCounts[i],
            title: itemData.title,
            thumbnail: itemData.thumbnails.high.url,
            url: `http://www.youtube.com/watch?v=${item.id.videoId}`,
          };
        });

        return itemList;
      });
  }

  async updated(changedProps) {
    super.updated(changedProps);

    if (
      (changedProps.get('query') !== undefined ||
        changedProps.get('activeSort') !== undefined) &&
      (changedProps.get('query') !== this.query ||
        changedProps.get('activeSort') !== this.activeSort)
    ) {
      this.results = await this.fetchSearchResults(
        this.query,
        this.activeSort.toLowerCase()
      );
    }
  }

  async firstUpdated() {
    this.results = await this.fetchSearchResults(this.query, this.activeSort);
  }

  handleQueryUpdate(e) {
    this.query = e.detail.query || this.query;
  }

  handleSortUpdate(e) {
    this.activeSort = e.detail.sort || this.activeSort;
  }

  render() {
    const {
      query,
      results
    } = this;

    return html `
      <div class="container">
        <header>
          <search-input
            @updated=${this.handleQueryUpdate}
            query=${query}
          ></search-input>
          <sort-controls
            @updated=${this.handleSortUpdate}
            activeSort=${this.activeSort}
          ></sort-controls>
        </header>
        ${results.length
          ? html`<video-list .videos=${results}></video-list>`
          : ''}
      </div>
    `;
  }
}

customElements.define('youtube-search', YoutubeSearch);
