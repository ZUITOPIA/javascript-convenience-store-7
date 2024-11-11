const InputView = {
    async readItem() {
        const input = await MissionUtils.Console.readLineAsync(
            "구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])"
        );
        return this.parseInput(input);
    },

    parseInput(input) {
        return input.split(",").map(item => {
            const [name, quantity] = item.split("-");
            return { name, quantity: parseInt(quantity) };
        });
    },
};

export default InputView;
