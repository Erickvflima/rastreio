export function validateSFT9001Packet(hex: string): void {
  if (!hex.startsWith('50F7')) {
    throw new Error('Header inválido');
  }

  if (!hex.endsWith('73C4')) {
    throw new Error('Footer inválido');
  }

  if (hex.length < 40) {
    throw new Error('Pacote incompleto');
  }
}
