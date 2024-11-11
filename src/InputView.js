import { Console } from "@woowacourse/mission-utils";

const InputView = {
    async inputOrderItems() {
        const input = await Console.readLineAsync(
            "구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])"
        );
        return this.parseItemSelection(input);
    },

    async checkMembershipDiscount() {
        const input = await Console.readLineAsync("멤버십 할인을 받으시겠습니까? (Y/N)");
        return input.toLowerCase() === "y";
    },

    parseItemSelection(input) {
        const items = input.match(/\[(.*?)\]/g).map(item => {
            const [name, quantity] = item.slice(1, -1).split("-");
            return { name, quantity: parseInt(quantity, 10) };
        });
        return items;
    },
};

export default InputView;
