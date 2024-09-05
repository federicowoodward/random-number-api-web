import { Controller, Post } from '@nestjs/common';
import { RandomService } from './random.service';


@Controller('random')
export class RandomController {
    constructor(private readonly randomService: RandomService) { }

    @Post()
    getRandomNumber() {
        const random = this.randomService.generateRandomNumber();
        return { value: random};
    }
}
