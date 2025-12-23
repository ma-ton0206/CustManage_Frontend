import { AddSalesProvider } from "./addSalesContext";
import AddSalesLayout from "./addSalesLayout";
import PageProtection from "@/app/pageProtection";

export default async function Page() {

  return (
    <PageProtection>
      <AddSalesProvider >
        <AddSalesLayout />
      </AddSalesProvider>
    </PageProtection>
  );
}

