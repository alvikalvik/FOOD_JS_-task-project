import { getResource } from "../modules/general";

export class MenuCard {
    constructor(parentSelector, src, alt, title, descr, price, ...classNames) {
        this.parentSelector = parentSelector;
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.defaultClassName = 'menu__item';
        this.classNames = classNames;
        this.exchangeRate = 28;
        this.priceUAH = 0;

        this.changeToUAH();
    }

    changeToUAH() {
        this.priceUAH = this.price * this.exchangeRate;
    }

    render() {
        const parent = document.querySelector(this.parentSelector);
        const elemnt = document.createElement('div');

        if (this.classNames.length > 0) {
            elemnt.classList.add(...this.classNames);
        } else {
            elemnt.classList.add(this.defaultClassName);
        }

        elemnt.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.priceUAH}</span> грн/день</div>
            </div>
        `;

        parent.append(elemnt);            
    }
}

export function menu(url) {
    getResource(url)
    .then(data => {
        for (const {img, altimg, title, descr, price} of data) {
            new MenuCard(
                `.menu .container`,
                img,
                altimg,
                title,
                descr,
                price,
                `menu__item`
            ).render();
        }
    })
    .catch(error => {            
        console.log(error);
    });
}
