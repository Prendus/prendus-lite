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
        const assessmlTextarea: HTMLTextAreaElement = <HTMLTextAreaElement> this.querySelector(`#assessml-textarea`) || new HTMLTextAreaElement();
        const javascriptTextarea: HTMLTextAreaElement = <HTMLTextAreaElement> this.querySelector(`#javascript-textarea`) || new HTMLTextAreaElement();

        //TODO study defensive programming and see if this is the way we want to handle this situation
        if (assessmlTextarea.id !== 'assessml-textarea' || javascriptTextarea.id !== 'javascript-textarea') {
            alert('Something went wrong');
            return;
        }

        const assessML = assessmlTextarea.value;
        const javaScript = javascriptTextarea.value;

        window.fetch(`http://localhost:4466`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `
                    mutation($assessML: String!, $javaScript: String!) {
                        createQuestion(data: {
                            assessML: $assessML
                            javaScript: $javaScript
                        }) {
                            id
                        }
                    }
                `,
                variables: {
                    assessML,
                    javaScript
                }
            })
        });
    }

    render(state: State) {
        return html`
            <h1>prendus-question-create</h1>
            <div>AssessML</div>
            <div>
                <textarea id="assessml-textarea"></textarea>
            </div>
            <div>JavaScript</div>
            <div>
                <textarea id="javascript-textarea"></textarea>
            </div>
            <button onclick=${() => this.createQuestion()}>Create Question</button>
        `;
    }
}

window.customElements.define('prendus-question-create', PrendusQuestionCreate);
