import {html, render} from 'lit-html/lib/lit-extended';
import {Store} from '../../store/store';

class PrendusQuestionView extends HTMLElement {
    connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));
        Store.dispatch({
            type: 'INITIALIZE_PRENDUS_QUESTION_VIEW'
        });
    }

    render() {
        return html`
            <div>
                prendus-question-view
            </div>
        `;
    }
}

window.customElements.define('prendus-question-view', PrendusQuestionView);
