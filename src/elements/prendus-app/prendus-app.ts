import {html, render} from 'lit-html/lib/lit-extended';
import '../prendus-question/prendus-question-create';
import '../prendus-question/prendus-question-edit';
import '../prendus-question/prendus-question-view';
import {Store} from '../../store/store';

class PrendusApp extends HTMLElement {
    connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));
        Store.dispatch({
            type: 'INITIALIZE_PRENDUS_APP'
        });
    }

    render() {
        return html`
            <div>
                <prendus-question-create></prendus-question-create>
                <prendus-question-edit></prendus-question-edit>
                <prendus-question-view></prendus-question-view>
            </div>
        `;
    }
}

window.customElements.define('prendus-app', PrendusApp);
