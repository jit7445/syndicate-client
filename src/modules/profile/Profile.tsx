import { useOrders } from "../orders/hooks/useOrders";
import { useCurrentUser } from "./hooks/useCurrentUser";
import UserDetails from "./components/user-details/UserDetails";
import PurchaseHistory from "./components/purchase-history/PurchaseHistory";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

export default function Profile() {
  const { orders } = useOrders();
  const { userName, email, companyName } = useCurrentUser();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1">
        <div className="mx-auto max-w-[1400px] px-6 py-10">
          <UserDetails
            userName={userName}
            email={email}
            companyName={companyName}
          />

          <h2 className="mt-6 text-lg font-bold text-text-primary">
            My purchases
          </h2>
          <PurchaseHistory orders={orders} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
