const FileReader = {
    readProducts() {
        const products = MissionUtils.File.readFileSync("products.md", "utf8").split("\n");
        return products.map(line => {
            const [name, price, quantity, promotion] = line.split(",");
            return { name, price: parseInt(price), quantity: parseInt(quantity), promotion };
        });
    },

    readPromotions() {
        const promotions = MissionUtils.File.readFileSync("promotions.md", "utf8").split("\n");
        return promotions.map(line => {
            const [name, buy, get, start_date, end_date] = line.split(",");
            return { name, buy: parseInt(buy), get: parseInt(get), start_date, end_date };
        });
    },
};

export default FileReader;
