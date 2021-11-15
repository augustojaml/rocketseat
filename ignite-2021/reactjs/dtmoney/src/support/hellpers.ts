export function formattedDate(date: string) {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
}

export function formattedCurrency(amount: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);
}
