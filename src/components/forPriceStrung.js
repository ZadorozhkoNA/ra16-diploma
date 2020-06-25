//Функция для вывода строки цены с разделением на порядки
export const forPriceStrung = (data) => {
    const string = String(data).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
    return  `${string} руб.`
}
