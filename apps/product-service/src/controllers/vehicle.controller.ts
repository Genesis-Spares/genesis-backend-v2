import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { VehicleService } from '../services/vehicle.service';

@Controller()
export class VehicleController {
    constructor(private readonly vehicles: VehicleService) { }

    @MessagePattern('vehicle.makes')
    makes() {
        return this.vehicles.makes();
    }

    @MessagePattern('vehicle.models')
    models(@Payload() d: { make: string }) {
        return this.vehicles.models(d?.make);
    }

    @MessagePattern('vehicle.years')
    years(@Payload() d: { make: string; model: string }) {
        return this.vehicles.years(d?.make, d?.model);
    }
}
