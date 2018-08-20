import {html, render} from 'lit-html/lib/lit-extended';
import {Store} from '../../store/store';

class PrendusQuestionEdit extends HTMLElement {
    connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));
        Store.dispatch({
            type: 'INITIALIZE_PRENDUS_QUESTION_EDIT'
        });
    }

    render() {
        return html`
            <div>
                prendus-question-edit
            </div>
        `;
    }
}

window.customElements.define('prendus-question-edit', PrendusQuestionEdit);
