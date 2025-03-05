import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchData } from "@/app/utils/api";
import { Manifacturer } from "./types";
import { Badge } from "@/components/ui/badge";
import { EditSheet } from "./EditSheet";
import { Button } from "@/components/ui/button";

export function ManifacturerTable() {
  const [selectedManifacturer, setSelectedManifacturer] =
    useState<null | Manifacturer>(null);
  const [rows, setRows] = useState<Manifacturer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const data = await fetchData<Manifacturer[]>("/manifacturer");

        setRows(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTableData();
  }, []);

  const handleCreateManifacturer = () => {
    setSelectedManifacturer({} as Manifacturer);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex justify-end m-4">
        <Button
          onClick={handleCreateManifacturer}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Add New Manifacturer
        </Button>
      </div>

      <Table>
        <TableCaption>Manifacturers</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Key</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>weee</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Shops</TableHead>
            <TableHead>Features</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.key}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => setSelectedManifacturer(row)}
            >
              <TableCell className="font-medium">{row.key}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.company}</TableCell>
              <TableCell>{row.weee}</TableCell>
              <TableCell>
                <ul className="list-none">
                  <li>{row.address.street}</li>
                  <li>
                    {row.address.plz}, {row.address.city}
                  </li>
                  <li>
                    {row.address.country} ({row.address.iso})
                  </li>
                </ul>{" "}
              </TableCell>
              <TableCell>
                <ul className="list-disc">
                  <li>email: {row.contact.email}</li>
                  <li>phone: {row.contact.phone}</li>
                  <li>service: {row.contact.serviceUrl}</li>
                </ul>{" "}
              </TableCell>
              <TableCell>
                <ul className="list-disc">
                  {row.shops.map((shop) =>
                    shop.name ? <li key={shop.id}>{shop.name}</li> : null
                  )}
                </ul>
              </TableCell>
              <TableCell>
                <ul>
                  <li className="pb-1">
                    <Badge variant={row.heat ? "good" : "destructive"}>
                      heat
                    </Badge>
                  </li>
                  <li className="pb-1">
                    <Badge variant={row.water ? "good" : "destructive"}>
                      water
                    </Badge>
                  </li>
                  <li className="pb-1">
                    <Badge variant={row.zvshk ? "good" : "destructive"}>
                      zvshk
                    </Badge>
                  </li>
                </ul>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <EditSheet
        manifacturerDetails={selectedManifacturer}
        onClose={() => setSelectedManifacturer(null)}
      />
    </>
  );
}

export default ManifacturerTable;
