import {html, render} from 'lit-html/lib/lit-extended';
import {Store} from '../../store/store';
import {State} from '../../prendus-lite.d';

class PrendusQuestionCreate extends HTMLElement {
    connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));
        Store.dispatch({
            type: 'INITIALIZE_PRENDUS_QUESTION_CREATE'
        });
    }

    createQuestion() {
        window.fetch(`http://localhost:4466`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `
                    mutation {
                        createQuestion(data: {
                            text: "hello"
                            code: "hello"
                        }) {
                            id
                        }
                    }
                `
            })
        });
    }

    render(state: State) {
        return html`
            <div>prendus-question-create</div>
            <button onclick=${() => this.createQuestion()}>Create Question</button>
        `;
    }
}

window.customElements.define('prendus-question-create', PrendusQuestionCreate);
