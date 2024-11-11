import InputView from "./InputView.js";

class App {
    async run() {
        const items = await InputView.inputOrderItems();
        console.log(items);
    }
}

export default App;
