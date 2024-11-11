const OutputView = {
    printProducts(products, promotions) {
        products.forEach(product => {
            const promotion = this.getPromotion(product.promotion, promotions);
            MissionUtils.Console.print(`- ${product.name} ${product.price}원 ${product.quantity}개 ${promotion}`);
        });
    },

    getPromotion(promotionCode, promotions) {
        if (!promotionCode) return "없음";
        const promotion = promotions.find(p => p.name === promotionCode);
        return promotion ? `${promotionCode} (${promotion.start_date}~${promotion.end_date})` : "없음";
    },
};

export default OutputView;
