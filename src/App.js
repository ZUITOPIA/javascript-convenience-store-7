import { Console } from "@woowacourse/mission-utils";
import fs from "fs";

class App {
    async run() {
        const products = FileReader.readProducts();
        const promotions = FileReader.readPromotions();

        OutputView.printProducts(products, promotions);

        const items = await InputView.readItem();
        Console.print("구매 목록: " + JSON.stringify(items));
    }
}

export default App;

const FileReader = {
    readProducts() {
        const products = fs.readFileSync("./public/products.md", "utf8").split("\n"); // MissionUtils.File -> fs로 변경
        return products.map(line => {
            const [name, price, quantity, promotion] = line.split(",");
            return { name, price: parseInt(price), quantity: parseInt(quantity), promotion };
        });
    },

    readPromotions() {
        const promotions = fs.readFileSync("./public/promotions.md", "utf8").split("\n"); // MissionUtils.File -> fs로 변경
        return promotions.map(line => {
            const [name, buy, get, start_date, end_date] = line.split(",");
            return { name, buy: parseInt(buy), get: parseInt(get), start_date, end_date };
        });
    },
};

const InputView = {
    async readItem() {
        const input = await Console.readLineAsync(
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

const OutputView = {
    printProducts(products, promotions) {
        products.forEach(product => {
            const promotion = this.getPromotion(product.promotion, promotions);
            Console.print(`- ${product.name} ${product.price}원 ${product.quantity}개 ${promotion}`);
        });
    },

    getPromotion(promotionCode, promotions) {
        if (!promotionCode) return "없음";
        const promotion = promotions.find(p => p.name === promotionCode);
        return promotion ? `${promotionCode} (${promotion.start_date}~${promotion.end_date})` : "없음";
    },
};
