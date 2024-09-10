import ContactsTable from "@/components/table/ContactsTable";
import { LuPlus } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import SearchBar from "@/components/SearchBar";
import { useAppSelector } from "@/redux/hooks";
import ButtonRefreshContacts from "@/components/buttons/ButtonRefreshContacts";

function ContactsRoute() {
  const isOnSearch = useAppSelector((state) => state.isSearching);
  const navigate = useNavigate();

  const goToAddContactPage = () => {
    navigate("/contacts/add");
  };

  return (
    <div className="container w-1/2 py-10">
      <div className="mb-6">
        {isOnSearch.value ? <ButtonRefreshContacts /> : <SearchBar />}
      </div>
      <ContactsTable />
      <Button
        className="fixed bottom-5 right-1/4"
        size="icon"
        onClick={goToAddContactPage}
      >
        <LuPlus />
      </Button>
    </div>
  );
}

export default ContactsRoute;
