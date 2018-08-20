import {html, render} from 'lit-html/lib/lit-extended';
import {Store} from '../../store/store';

export class PrendusQuestionCreate extends HTMLElement {
    connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));
        Store.dispatch({
            type: 'INITIALIZE_PRENDUS_QUESTION_CREATE'
        });
    }

    render() {
        return html`
            <div>prendus-question-create</div>
        `;
    }
}

window.customElements.define('prendus-question-create', PrendusQuestionCreate);
