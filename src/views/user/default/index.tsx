import Widget from "components/widget/Widget";
import CarouselComponent from "./carousel";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ElectricCarIcon from "@mui/icons-material/ElectricCar";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import NumbersIcon from "@mui/icons-material/Numbers";

const Dashboard = () => {
  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-5">
        <Widget
          icon={<DirectionsCarIcon className="h-7 w-7" />}
          title={"Brands"}
          subtitle={"103"}
        />
        <Widget
          icon={<ElectricCarIcon className="h-6 w-6" />}
          title={"Models"}
          subtitle={"1883"}
        />
        <Widget
          icon={<ApartmentIcon className="h-7 w-7" />}
          title={"Cities"}
          subtitle={"3393"}
        />
        <Widget
          icon={<AttachMoneyIcon className="h-6 w-6" />}
          title={"Total Purchase Amount(billions)"}
          subtitle={"$2540.00 B"}
        />
        <Widget
          icon={<NumbersIcon className="h-6 w-6" />}
          title={"Total Sales"}
          subtitle={"64.12M"}
        />
      </div>

      <div className="mt-4">
        <CarouselComponent />
      </div>
    </div>
  );
};

export default Dashboard;
