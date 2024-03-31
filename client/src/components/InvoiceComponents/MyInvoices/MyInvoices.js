import React, { useEffect, useState } from "react";
import InvoiceContainer from "./InvoiceContainer/InvoiceContainer";
import { getAllInvoices } from "../../../api/invoices";

function MyInvoices() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const allInvoices = await getAllInvoices();
        setInvoices(allInvoices);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchInvoices();
  }, []);
  debugger;
  console.log(invoices)

  return (
    <>
      {invoices.map((invoice) => (
        <InvoiceContainer
          key={invoice._id}
          name={localStorage.getItem('name')}
          address={invoice.address}
          invId={invoice._id}
        />
      ))}
    </>
  );
}

export default MyInvoices;
