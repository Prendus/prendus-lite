export interface State {
    components: {
        [componentId: string]: any;
    }
}

export interface Action {
    readonly type: string;
}

export interface Question {
    readonly assessML: string;
    readonly javaScript: string;
}
