import { Injectable } from '@nestjs/common';

@Injectable()
export class RandomService {
    generateRandomNumber(): number {
        return Math.floor(Math.random() * 100) + 1;
    }
}
