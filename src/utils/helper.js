export function currencyFormat(num){
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export const validateSizeAndColor = (size, color) => {
    if (!size) {
      throw { message: 'TALLE ES OBLIGATORIO.' };
    }  
    if (!color) {
      throw { message: 'COLOR ES OBLIGATORIO.' };
    }  
    return true;
  };