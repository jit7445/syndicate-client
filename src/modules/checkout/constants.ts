import type { PaymentFormValues } from "./types";

export const DEFAULT_PAYMENT_FORM_VALUES: PaymentFormValues = {
  cardholderName: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
};

export const CARD_NUMBER_PATTERN = /^\d{4} \d{4} \d{4} \d{4}$/;
export const EXPIRY_PATTERN = /^(0[1-9]|1[0-2])\/\d{2}$/;
export const CVC_PATTERN = /^\d{3,4}$/;
