import { SalesProvider } from "./salesContext";
import SalesLayout from "./salesLayout";
// import { fetchSalesData } from "@/server/fetchSalesData";
import PageProtection from "@/app/pageProtection";

export default async function Page() {
  // これが実行されるタイミングは「ユーザーがページを開く前」。
  //つまり、ブラウザに送信されるHTMLの時点でデータがすでに入っている。
  // const initialSalesData = await fetchSalesData(Number(params.sales_id));

  return (
    <PageProtection>
      <SalesProvider>
        <SalesLayout />
      </SalesProvider>
    </PageProtection>
  );
}

