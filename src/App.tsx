import TaxiContent from "./templates/taxiContent/taxiContent";
import TaxiForm from "./templates/taxiForm/taxiForm";

function App() {
  return (
    <div className="w-full h-full max-w-screen-xl p-5">
      <TaxiForm />
      <TaxiContent />
    </div>
  );
}

export default App;
