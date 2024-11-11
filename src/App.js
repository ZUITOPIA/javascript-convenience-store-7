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
        const products = fs.readFileSync("./public/products.md", "utf8").split("\n").filter(Boolean);
        return products
            .map(line => {
                const [name, price, quantity, promotion] = line.split(",");
                if (!name || isNaN(price) || isNaN(quantity)) {
                    return null;
                }
                return {
                    name: name.trim(),
                    price: parseInt(price),
                    quantity: parseInt(quantity),
                    promotion: promotion ? promotion.trim() : "",
                };
            })
            .filter(product => product !== null);
    },

    readPromotions() {
        const promotions = fs.readFileSync("./public/promotions.md", "utf8").split("\n").filter(Boolean);
        return promotions
            .map(line => {
                const [name, buy, get, start_date, end_date] = line.split(",");

                if (!start_date || !end_date || isNaN(buy) || isNaN(get) || parseInt(buy) <= 0 || parseInt(get) <= 0) {
                    return null;
                }
                return {
                    name: name.trim(),
                    buy: parseInt(buy),
                    get: parseInt(get),
                    start_date: start_date.trim(),
                    end_date: end_date.trim(),
                };
            })
            .filter(promotion => promotion !== null);
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
            return { name: name.trim(), quantity: parseInt(quantity) };
        });
    },
};

const OutputView = {
    printProducts(products, promotions) {
        Console.print("안녕하세요. W편의점입니다.");
        Console.print("현재 보유하고 있는 상품입니다. \n");
        products.forEach(product => {
            const promotion = this.getPromotion(product.promotion, promotions);

            const promotionDisplay =
                promotion && !this.isPromotionDateExcluded(promotion) ? `${product.promotion}` : "";

            const stockDisplay = product.quantity === 0 ? "재고 없음" : `${product.quantity}개`;

            Console.print(`- ${product.name} ${product.price.toLocaleString()}원 ${stockDisplay} ${promotionDisplay}`);
        });
    },

    getPromotion(promotionCode, promotions) {
        if (!promotionCode) return null;
        const promotion = promotions.find(p => p.name === promotionCode);
        return promotion ? promotion : null;
    },

    isPromotionDateExcluded(promotion) {
        const currentDate = new Date();
        const promotionStart = new Date(promotion.start_date);
        const promotionEnd = new Date(promotion.end_date);

        return currentDate < promotionStart || currentDate > promotionEnd;
    },
};
