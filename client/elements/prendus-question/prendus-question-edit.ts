import {html, render} from 'lit-html/lib/lit-extended';
import {Store} from '../../store/store';
import {State, Question} from '../../prendus-lite.d';

interface ComponentState {
    readonly question: Question;
}

class PrendusQuestionEdit extends HTMLElement {
    connectedCallback() {
        const componentId = 'prendus-question-edit-temp-id';
        Store.subscribe(() => render(this.render(Store.getState(), componentId), this));
        Store.dispatch({
            type: 'INITIALIZE_PRENDUS_QUESTION_EDIT'
        });
    }

    async editQuestion(componentId: string) {
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

    saveQuestion(componentId: string) {
        const questionIdInput: HTMLInputElement = <HTMLInputElement> this.querySelector(`#question-id-input`);
        const assessmlTextarea: HTMLTextAreaElement = <HTMLTextAreaElement> this.querySelector(`#assessml-textarea`);
        const javascriptTextarea: HTMLTextAreaElement = <HTMLTextAreaElement> this.querySelector(`#javascript-textarea`);

        const questionId = questionIdInput.value;
        const assessML = assessmlTextarea.value;
        const javaScript = javascriptTextarea.value;

        window.fetch(`http://localhost:4466`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `
                    mutation($questionId: ID!, $assessML: String!, $javaScript: String!) {
                        updateQuestion(where: {
                            id: $questionId
                        }, data: {
                            assessML: $assessML
                            javaScript: $javaScript
                        }) {
                            id
                        }
                    }
                `,
                variables: {
                    questionId,
                    assessML,
                    javaScript
                }
            })
        });
    }

    render(state: State, componentId: string) {
        const componentState: ComponentState = state.components[componentId] || {};
        const question = componentState.question || {};

        return html`
            <h1>prendus-question-edit</h1>
            <div>
                Question id: <input id="question-id-input" type="text"> <button onclick=${() => this.editQuestion(componentId)}>Edit</button>
            </div>
            <div>AssessML</div>
            <div>
                <textarea id="assessml-textarea">${question.assessML}</textarea>
            </div>
            <div>JavaScript</div>
            <div>
                <textarea id="javascript-textarea">${question.javaScript}</textarea>
            </div>
            <button onclick=${() => this.saveQuestion(componentId)}>Save</button>
        `;
    }
}

window.customElements.define('prendus-question-edit', PrendusQuestionEdit);
