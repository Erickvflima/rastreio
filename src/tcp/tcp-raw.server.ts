/* eslint-disable @typescript-eslint/no-misused-promises */
import { TelemetryService } from '@modules/Telemetry/telemetry.service';
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import * as net from 'net';

@Injectable()
export class TcpRawServer implements OnModuleInit {
  private readonly logger = new Logger(TcpRawServer.name);

  constructor(private readonly telemetryService: TelemetryService) {}

  onModuleInit() {
    const server = net.createServer((socket) => {
      this.logger.log(`📡 Dispositivo conectado: ${socket.remoteAddress}`);

      socket.on('data', async (buffer: Buffer) => {
        try {
          const asciiPayload = buffer.toString('utf8').trim();

          this.logger.log(`📥 Payload ASCII: ${asciiPayload}`);

          const hexPayload = Buffer.from(asciiPayload, 'hex').toString('hex');

          this.logger.log(`🔄 Payload HEX normalizado: ${hexPayload}`);

          await this.telemetryService.insert(hexPayload);

          socket.write('OK\r\n');
        } catch (error) {
          this.logger.error('Erro ao processar telemetria TCP', error);
        }
      });

      socket.on('error', (err) => {
        this.logger.error('Erro TCP', err.message);
      });

      socket.on('close', () => {
        this.logger.warn('❌ Dispositivo desconectado');
      });
    });

    server.listen(3001, '0.0.0.0', () => {
      this.logger.log('🚀 TCP RAW escutando na porta 3001');
    });
  }
}
