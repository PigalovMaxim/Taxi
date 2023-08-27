import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { useRef, useEffect } from "react";
import useRedux from "../../hooks/useRedux";
import {
  TaxiSliceState,
  reset,
  setAddress,
  setAvailableCrew,
  setChoosenTaxi,
  setIsError,
  setIsLoaded,
  setIsLoading,
} from "../../redux/slices/taxiSlice";
import TaxiIcon from "../../assets/taxiBlack.png";
import Loading from "../../assets/loading.png";
import { defaultState } from "./taxiContent.options";
import { toast } from "react-toastify";
import { findAvailableCrew } from "../../services/taxi.service";

function TaxiContent() {
  const { store, dispatch } = useRedux<TaxiSliceState>("taxi");
  let geocode = useRef<
    ((coords: number[] | string) => Promise<ymaps.IGeocodeResult>) | null
  >(null);

  const onMapClickHandler = async (coords: number[]) => {
    if (!geocode) toast.error("Карта не загружена", { autoClose: 3000 });
    const address = await geocode.current!(coords);
    const title = address.geoObjects.get(0).getAddressLine();
    if (!title) {
      toast.error("Адрес не найден", { autoClose: 3000 });
      return;
    }
    if (store.address.title && store.address.coords) {
      dispatch(reset());
    }
    dispatch(setAddress({ title, coords: coords as [number, number] }));
  };

  useEffect(() => {
    const { title, coords } = store.address;

    const findCar = async () => {
      dispatch(setIsLoading(true));
      const crewData = await findAvailableCrew(coords![0], coords![1]);
      const crew = crewData.data.crews_info.sort(
        (a, b) => a.distance - b.distance
      );
      toast.success("Машина была найдена", {
        autoClose: 3000,
      });
      dispatch(setAvailableCrew(crew));
      dispatch(setIsLoaded(true));
      dispatch(setChoosenTaxi(crew[0]));
      dispatch(setIsLoading(false));
    };

    if (title && coords) {
      if (!store.isLoaded) {
        findCar();
      }
      return;
    }
    if (!title) return;

    const getAddress = async () => {
      const coordsAnswer = await geocode.current!(title || "");
      const coords = coordsAnswer.geoObjects?.get(0)?.geometry?.getCoordinates();
      if (!coords) {
        toast.error("Адрес не найден", { autoClose: 3000 });
        dispatch(setIsError(true));
        return;
      }
      dispatch(setAddress({ title, coords }));
    };

    getAddress();
  }, [store.address]);

  return (
    <div className="w-full p-4 flex flex-row gap-x-4">
      <YMaps query={{ apikey: "710045c7-57a0-4c07-96bc-6c819030bb38" }}>
        <Map
          onLoad={(e) => (geocode.current = e.geocode)}
          modules={["geocode"]}
          className="w-1/2 h-map"
          height={500}
          defaultState={defaultState}
          onClick={(e) => {
            e.preventDefault();
            onMapClickHandler(e.get("coords"));
          }}
        >
          {store.address.coords && (
            <Placemark
              options={{ iconColor: "#d1b730" }}
              geometry={store.address.coords}
            />
          )}
          {store.availableCrew.map((car) => (
            <Placemark
              key={car.crew_id}
              options={{ iconColor: "#61f26b", balloonContent: 'Я машина' }}
              geometry={[car.lat, car.lon]}
            />
          ))}
        </Map>
      </YMaps>
      <div className="w-1/2 h-map flex flex-col gap-y-4 overflow-y-auto">
        {store.isLoading && (
          <div className="w-full h-full flex justify-center items-center">
            <img
              src={Loading}
              alt="loading"
              className="w-10 h-10 animate-spin"
            />
          </div>
        )}
        {!store.isLoading &&
          store.availableCrew.map((item) => (
            <div
              key={item.crew_id}
              className="w-full h-20 flex flex-row justify-start items-center px-4 bg-yellow-300"
            >
              <img src={TaxiIcon} alt="taxi" />
              <div className="w-full h-full flex flex-row relative ml-4">
                <h2 className="absolute bottom-4 right-0 font-thin text-xl">
                  {item.distance + " м"}
                </h2>
                <div className="flex flex-col justify-center">
                  <h1 className="w-full truncate text-xl font-bold">{`${item.car_mark} ${item.car_model}`}</h1>
                  <h2 className="text-black/50 text-lg">{item.car_color}</h2>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default TaxiContent;
