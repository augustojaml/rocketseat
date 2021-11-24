import { addDays } from 'date-fns';
import { Platform } from 'react-native';
import {
  AccelerationSVG,
  CarSVG,
  EnergySVG,
  ExchangeSVG,
  ForceSVG,
  GasolineSVG,
  HybridSVG,
  PeopleSVG,
  SpeedSVG,
} from '../assets';

export const Util = {
  getAccessoryIcon(type: String) {
    switch (type) {
      case 'speed':
        return SpeedSVG;

      case 'acceleration':
        return AccelerationSVG;

      case 'turning_diameter':
        return ForceSVG;

      case 'gasoline_motor':
        return GasolineSVG;

      case 'electric_motor':
        return EnergySVG;

      case 'hybrid_motor':
        return HybridSVG;

      case 'exchange':
        return ExchangeSVG;

      case 'seats':
        return PeopleSVG;

      default:
        return CarSVG;
    }
  },
  getPlatformDate(date: Date) {
    return addDays(date, 1);
  },
};
