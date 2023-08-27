import { FindedTaxiProps } from "./findedTaxi.options";
import Taxi from "../../assets/taxiBlack.png";

function FindedTaxi({ taxi }: FindedTaxiProps) {
  if (!taxi) return (
    <div className="w-full h-full flex text-lg font-bold justify-center items-center">
      Экипаж не найден :(
    </div>
  )

  return (
    <div className="w-full h-full flex flex-row items-center justify-start p-4 gap-x-4">
      <img src={Taxi} alt="taxi" className="w-16 h-16" />
      <div className="w-3/4 flex flex-col justify-center">
        <h1 className="w-full truncate text-2xl font-bold">{`${taxi.car_mark} ${taxi.car_model}`}</h1>
        <h2 className="text-black/50">{taxi.car_color}</h2>
        <div className="w-fit bg-yellow-300 rounded-lg px-4 py-2 text-lg mt-4">
          {taxi.car_number}
        </div>
      </div>
    </div>
  );
}

export default FindedTaxi;
