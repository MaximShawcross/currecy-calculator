export type CurrencyResponceModel = {
    base: string;
    date: string;
    motd: {
        msg: string;
        url: string;
    };
    success: boolean;
    rates: { 
        [key: string]: number; 
    }

}

export enum CurrencyCodes {
    USD = "USD",
    EUR = "EUR",
    UAH = "UAH"
}