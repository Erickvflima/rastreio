export function validateSFT9001Packet(hex: string): void {
  const payload = hex.trim().toUpperCase();
  if (!payload.startsWith('50F7')) {
    throw new Error('Header inválido');
  }

  if (!payload.endsWith('73C4')) {
    throw new Error('Footer inválido');
  }

  if (payload.length < 40) {
    throw new Error('Pacote incompleto');
  }
}
