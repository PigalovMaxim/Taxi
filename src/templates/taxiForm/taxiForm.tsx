import { useState, useEffect } from "react";
import Loading from "../../assets/loading.png";
import Button from "../../components/button/button";
import useRedux from "../../hooks/useRedux";
import {
  TaxiSliceState,
  reset,
  setAddress,
  setIsLoaded,
  setIsLoading,
} from "../../redux/slices/taxiSlice";
import FindedTaxi from "../../components/findedTaxi/findedTaxi";
import { ToastContainer, toast } from "react-toastify";
import { orderCar } from "../../services/taxi.service";
import { formatDate } from "./taxiForm.options";

function TaxiForm() {
  const { store, dispatch } = useRedux<TaxiSliceState>("taxi");
  const [inputValue, setInputValue] = useState("");

  const order = async () => {
    const { coords, title } = store.address;
    if (!title || !coords || !store.choosenTaxi) return;
    dispatch(setIsLoading(true));
    await orderCar(
      title,
      coords,
      formatDate(new Date()),
      store.choosenTaxi.crew_id
    );
    dispatch(setIsLoading(false));
    toast.success("Машина заказана!", {
      autoClose: 3000,
    });
    dispatch(setAddress({}));
    dispatch(reset());
  };

  const setSearch = () => {
    dispatch(setAddress({ title: inputValue }));
  };

  useEffect(() => {
    setInputValue(store.address.title || "");
  }, [store.address.title]);

  return (
    <div className="w-full flex flex-col">
      <ToastContainer position="bottom-right" closeOnClick />
      <div className="w-full h-16 pl-4 border-b border-black flex flex-row items-center text-2xl font-semibold">
        Детали заказа
      </div>
      <div className="w-full flex flex-row justify-between px-4 py-8">
        <form className="flex flex-col justify-center items-center">
          <div>
            <span className="text-xl">Откуда</span>
            <input
              value={inputValue}
              onChange={(e) => {
                if(store.isLoaded) dispatch(reset());
                setInputValue(e.target.value)
              }}
              placeholder="Улица, номер дома"
              className="w-96 h-10 border border-black rounded-lg ml-4 outline-none px-4"
            />
          </div>
          <Button
            onClick={(e) => {
              e.preventDefault();
              if (store.isLoading) return;
              store.isLoaded ? order() : setSearch();
            }}
            className="w-full h-12 mt-4 font-semibold text-lg"
            title={store.isLoaded ? "Заказать" : "Поиск машины"}
          />
        </form>
        <span className="flex flex-row items-center gap-x-4">
          <span className="text-xl">Подходящий экипаж</span>
          <span className="w-96 h-48 shadow-lg rounded-lg flex justify-center items-center">
            {store.isLoading ? (
              <img
                src={Loading}
                alt="loading"
                className="w-10 h-10 animate-spin"
              />
            ) : (
              <FindedTaxi taxi={store.choosenTaxi} />
            )}
          </span>
        </span>
      </div>
    </div>
  );
}

export default TaxiForm;
