export default class State {
    private state: StateData | undefined;
    constructor() {
        if (!this.state) {
            const data = localStorage.get('state');
            if (!data) {
                const newState: StateData = {
                    garage: true
                }
                localStorage.setItem('state', JSON.stringify(newState));
            }
            this.state = JSON.parse(data);
        }

    }
}