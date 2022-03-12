import { randomUUID } from 'crypto';
import { createInterface } from 'readline';
import { Readable } from 'stream';

export const readBuffer = async (buffer: Buffer) => {
  const data = Readable.from(buffer.toString());
  
  const readBufferLine = createInterface({
    input: data,
  });

  const body = [];

  for await (const line of readBufferLine) {
    const [...product] = line.split(',');

    body.push([randomUUID(), ...product]);
  }

  return body;
}
