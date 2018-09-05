import {html, render} from 'lit-html/lib/lit-extended';
import {Store} from '../../store/store';
import {State, Question} from '../../prendus-lite.d';

interface ComponentState {
    readonly question: Question;
}

class PrendusQuestionView extends HTMLElement {
    connectedCallback() {
        const componentId = 'prendus-question-view-temp-id';
        Store.subscribe(() => render(this.render(Store.getState(), componentId), this));
        Store.dispatch({
            type: 'INITIALIZE_PRENDUS_QUESTION_VIEW'
        });
    }

    async viewQuestion(componentId: string) {
        const questionIdInput: HTMLInputElement = <HTMLInputElement> this.querySelector(`#question-id-input`);
        const questionId = questionIdInput.value;

        const response = await window.fetch(`http://localhost:4466`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `
                    query($questionId: ID!) {
                        question(where: {
                            id: $questionId
                        }) {
                            assessML
                            javaScript
                        }
                    }
                `,
                variables: {
                    questionId
                }
            })
        });

        const responseJSON = await response.json();
        const question = responseJSON.data.question;

        Store.dispatch({
            type: 'SET_COMPONENT_STATE',
            componentId,
            key: 'question',
            value: question
        });
    }

    render(state: State, componentId: string) {
        const componentState: ComponentState = state.components[componentId] || {};
        const question = componentState.question || {};

        return html`
            <h1>prendus-question-view</h1>
            <div>
                Question id: <input id="question-id-input" type="text"> <button onclick=${() => this.viewQuestion(componentId)}>View</button>
            </div>
            AssessML: <div id="assessml-div">${question.assessML}</div>
            JavaScript: <div id="javascript-div">${question.javaScript}</div>
        `;
    }
}

window.customElements.define('prendus-question-view', PrendusQuestionView);
