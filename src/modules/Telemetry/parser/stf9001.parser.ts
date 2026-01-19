export function parseLocationPacket(hex: string) {
  const buffer = Buffer.from(hex, 'hex');
  let offset = 0;

  offset += 2;

  const deviceId = buffer.readUIntBE(offset, 3);
  offset += 3;

  const type = buffer.readUInt8(offset);
  offset += 1;

  if (type !== 0x02) {
    throw new Error('Tipo de mensagem não é localização');
  }

  const timestamp = buffer.readUInt32BE(offset);
  offset += 4;

  const direction = buffer.readUInt16BE(offset) / 100;
  offset += 2;

  const odometer = buffer.readUInt32BE(offset);
  offset += 4;

  const hourmeter = buffer.readUInt32BE(offset);
  offset += 4;

  const flags = buffer.readUInt16BE(offset);
  offset += 2;

  const speed = buffer.readUInt8(offset);
  offset += 1;

  const latitude = buffer.readInt32BE(offset) / 1_000_000;
  offset += 4;

  const longitude = buffer.readInt32BE(offset) / 1_000_000;

  return {
    deviceId,
    timestamp: new Date(timestamp * 1000),
    direction,
    odometer,
    hourmeter,
    speed,
    latitude,
    longitude,
    flags: {
      gpsFixed: !!(flags & (1 << 15)),
      gpsHistory: !!(flags & (1 << 14)),
      ignitionOn: !!(flags & (1 << 13)),
    },
  };
}
