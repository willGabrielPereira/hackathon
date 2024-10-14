import { stringify as toQueryString } from "qs"
const helper = {}


/**
 * Formata datas no formato dd/mm/yyyy HH:ii
 * 
 * @param {Date} date
 *  
 * @returns {String} Date formated with dd/mm/yyyy HH:ii
 */
export function dateFormat(date, onlyDate) {
    return Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: onlyDate ? undefined : 'short' }).format(new Date(date))
}


/**
 * Formata CPF/CNPJ
 * 
 * @param {String} taxId CPF ou CNPJ
 * 
 * @returns {String} tax_id formated
 */
export function taxIdFormat(taxId) {
    taxId = ('' + taxId).replace(/\D/g, '') || ''

    if (taxId.length === 11)
        return taxId.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4")

    return taxId.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "$1.$2.$3/$4-$5")
}


/**
 * Formata string em camelCase
 * 
 * @param {String} string Valor que será formatado
 *  
 * @returns {String} String formatted on camelCase
 */
export function camelCase(string) {
    return string.replaceAll('-', ' ').replaceAll('_', ' ').split(' ').map(function (word, index) {
        if (index === 0)
            return word.toLowerCase()

        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    }).join('')
}


/**
 * Gera query params para enviar em requisições API
 * @param {*} data 
 * @returns {String}
 */
export function toQuery(data) {
    return toQueryString(data, { encode: false })
}



/**
 * Modifica o número de telefone removendo 55 e nono dígito ou adicionando, para comparar com outro telefone
 * @param {String} phone Número que será modificado
 * @param {Boolean} asArray Se deve retornar como array ou objeto 
 * @returns {Array, Object} Números sem 55 e um deles sem o nono dígito
 */
export function phoneToQuery(phone, asArray) {
    if (!phone) return asArray ? [] : {}
    
    let phoneWpp = phone = phone.replaceAll(/\W/g, '')
    
    if (phone.length >= 12 && phone.substring(0, 2) == 55)
        phone = phone.substring(2)

    if (phone.length == 11 && phone.substring(2, 3) == 9) // Remove o nono dígito
        phoneWpp = phone.substring(0, 2) + phone.substring(3)

    if (phone.length == 10) // Adiciona o nono dígito
        phoneWpp = phone.substring(0, 2) + 9 + phone.substring(2)

    if (asArray)
        return [phone, phoneWpp]

    return {phone: phone, phoneWpp: phoneWpp}
}


/**
 * Cria um array a partir de um valor inicial e final
 * 
 * @param {Number} start Valor inicial
 * @param {Number} end Valor final
 * 
 * @returns {Array} Array de inteiros
 */
export function createRange(start, end) {
    return Array.from({ length: end - start + 1 }, (_, index) => index + start)
}



/**
 * Gera um id único aleatório
 * 
 * @param {String} prefix Optional Prefixo a ser adicionado no id
 * 
 * @returns {String}
 */
export function uniqid(prefix = '') {
    const sec = Date.now() * 1000 + Math.random() * 1000
    const id = sec.toString(16).replace(/\./g, "").padEnd(14, "0")

    return `${prefix}${id}`
}



/**
 * Define a cor de texto que terá contraste de acordo com a cor de fundo
 * @param {String} hex Cor do fundo 
 * @returns {String} Código hexadecimal da cor que deverá ser o texto
 */
export function textColorContrast(hex = '#000') {
    const threshold = 130 /* about half of 256. Lower threshold equals more dark text on dark background  */

    const hRed = hexToR(hex)
    const hGreen = hexToG(hex)
    const hBlue = hexToB(hex)


    function hexToR(h) { return parseInt((cutHex(h)).substring(0, 2), 16) }
    function hexToG(h) { return parseInt((cutHex(h)).substring(2, 4), 16) }
    function hexToB(h) { return parseInt((cutHex(h)).substring(4, 6), 16) }
    function cutHex(h) { return (h.charAt(0) == "#") ? h.substring(1, 7) : h }

    const cBrightness = ((hRed * 299) + (hGreen * 587) + (hBlue * 114)) / 1000
    if (cBrightness > threshold)
        return "#000"

    return "#fff"
}



/**
 * Verifica se é um valor numérico
 * @param {*} number 
 * @returns {Boolean}
 */
export function isNumeric(number) {
    return !isNaN(parseFloat(number)) && isFinite(number);
}



export function priceFormat(price, forSave) {
    if (typeof price === 'string')
        price = price.trim()

    if (!price)
        price = '0'

    if (forSave) {
        if (price.indexOf(',') === -1)
            return parseFloat(price)

        return parseFloat(price.replaceAll('.', '').replaceAll(',', '.'))
    } else {
        return parseFloat(price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
    }
}