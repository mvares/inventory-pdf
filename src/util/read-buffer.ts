import { Readable } from 'stream';
import { createInterface } from 'readline';

export const readBuffer = (buffer: Buffer) => {
  const readbleBuffer = Readable.from(buffer.toString());

  const readlineBuffer = createInterface({
    input: readbleBuffer,
  });

  return readlineBuffer;
}