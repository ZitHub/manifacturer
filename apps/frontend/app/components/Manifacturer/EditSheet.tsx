import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Address, Contact, Manifacturer, Shop } from "./types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { deleteData, putData, sendData } from "@/app/utils/api";
import { toast } from "sonner";

export function EditSheet({
  manifacturerDetails,
  onClose,
}: {
  manifacturerDetails: Manifacturer | null;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<Manifacturer | null>(
    manifacturerDetails
  );

  useEffect(() => {
    setFormData(manifacturerDetails);
  }, [manifacturerDetails]);

  if (!manifacturerDetails) {
    return null;
  }

  const handleSave = async () => {
    const isNew = !formData?._id;

    if (isNew) {
      try {
        const modifiedManifacturer = await sendData<Manifacturer>(
          "/manifacturer",
          formData!
        );

        toast(`Manifacturer ${modifiedManifacturer.key} has been added.`, {
          style: {
            backgroundColor: "green",
            color: "white",
          },
        });
      } catch (e: any) {
        toast(`Failed to add new manifacturer. Error: ${e.message}`, {
          style: {
            backgroundColor: "red",
            color: "white",
          },
        });
      }
    } else {
      try {
        const modifiedManifacturer = await putData<Manifacturer>(
          "/manifacturer",
          formData?._id!,
          formData!
        );

        toast(`Manifacturer ${modifiedManifacturer.key} has been modified.`, {
          style: {
            backgroundColor: "green",
            color: "white",
          },
        });
      } catch (e: any) {
        toast(
          `Failed to modify manifacturer ${formData?._id}. Error: ${e.message}`,
          {
            style: {
              backgroundColor: "red",
              color: "white",
            },
          }
        );
      }
    }
  };

  const handleDelete = async () => {
    console.log("Deleting manifacturer", formData?._id);

    const deletedManifacturer = await deleteData<Manifacturer>(
      "/manifacturer",
      formData?._id!
    );

    toast(`Manifacturer ${deletedManifacturer.key} has been deleted.`);
  };

  const renderAddress = (address: Address) => (
    <>
      {
        <>
          <Label className="mb-4 text-xl">Address</Label>
          <div className="mb-4">
            <label className="block text-sm font-medium">Street</label>
            <Input
              value={address?.street}
              onChange={(e) =>
                setFormData({
                  ...formData!,
                  address: { ...formData!.address, street: e.target.value },
                })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Postal Code</label>
            <Input
              value={address?.plz}
              onChange={(e) =>
                setFormData({
                  ...formData!,
                  address: { ...formData!.address, plz: e.target.value },
                })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">City</label>
            <Input
              value={address?.city}
              onChange={(e) =>
                setFormData({
                  ...formData!,
                  address: { ...formData!.address, city: e.target.value },
                })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Country</label>
            <Input
              value={address?.country}
              onChange={(e) =>
                setFormData({
                  ...formData!,
                  address: { ...formData!.address, country: e.target.value },
                })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">ISO</label>
            <Input
              value={address?.iso}
              onChange={(e) =>
                setFormData({
                  ...formData!,
                  address: { ...formData!.address, iso: e.target.value },
                })
              }
            />
          </div>
        </>
      }
    </>
  );

  const renderShops = (shops: Shop[]) => (
    <>
      <Label className="mb-4 text-xl">Shops</Label>
      {shops?.length &&
        shops.map((shop, idx) => (
          <div key={idx} className="mb-4">
            <h2 className="text-sm font-medium mb-4">Shop-{idx + 1}</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium">ID</label>
              <Input
                value={shop.id}
                onChange={(e) =>
                  setFormData({
                    ...formData!,
                    shops: formData!.shops.map((s, i) =>
                      i === idx ? { ...s, id: e.target.value } : s
                    ),
                  })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Category URL</label>
              <Input
                value={shop.categoryUrl}
                onChange={(e) =>
                  setFormData({
                    ...formData!,
                    shops: formData!.shops.map((s, i) =>
                      i === idx ? { ...s, categoryUrl: e.target.value } : s
                    ),
                  })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Category ID</label>
              <Input
                value={shop.categoryId}
                onChange={(e) =>
                  setFormData({
                    ...formData!,
                    shops: formData!.shops.map((s, i) =>
                      i === idx ? { ...s, categoryId: e.target.value } : s
                    ),
                  })
                }
              />
            </div>
            {shop.name && (
              <div className="mb-4">
                <label className="block text-sm font-medium">Shop Name</label>
                <Input
                  value={shop.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData!,
                      shops: formData!.shops.map((s, i) =>
                        i === idx ? { ...s, name: e.target.value } : s
                      ),
                    })
                  }
                />
              </div>
            )}
            {shop.ebayName && (
              <div className="mb-4">
                <label className="block text-sm font-medium">eBay Name</label>
                <Input
                  value={shop.ebayName}
                  onChange={(e) =>
                    setFormData({
                      ...formData!,
                      shops: formData!.shops.map((s, i) =>
                        i === idx ? { ...s, ebayName: e.target.value } : s
                      ),
                    })
                  }
                />
              </div>
            )}
          </div>
        ))}
    </>
  );

  const renderContactDetails = (contact: Contact) => (
    <>
      {
        <>
          <Label className="mb-4 text-xl">Contact Details</Label>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <Input
              value={contact.email}
              onChange={(e) =>
                setFormData({
                  ...formData!,
                  contact: { ...formData!.contact, email: e.target.value },
                })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Phone Number</label>
            <Input
              value={contact.phone}
              onChange={(e) =>
                setFormData({
                  ...formData!,
                  contact: { ...formData!.contact, phone: e.target.value },
                })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Service URL</label>
            <Input
              value={contact.serviceUrl}
              onChange={(e) =>
                setFormData({
                  ...formData!,
                  contact: { ...formData!.contact, serviceUrl: e.target.value },
                })
              }
            />
          </div>
        </>
      }
    </>
  );

  return (
    <Sheet open={!!manifacturerDetails} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Manifacturer Details</SheetTitle>
        </SheetHeader>
        <ScrollArea className="p-4 max-h-[800px]">
          <div className="p-1">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Key</label>
              <Input
                value={formData?.key ?? ""}
                onChange={(e) =>
                  setFormData({ ...formData!, key: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Name</label>
              <Input
                value={formData?.name}
                onChange={(e) =>
                  setFormData({ ...formData!, name: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Company</label>
              <Input
                value={formData?.company}
                onChange={(e) =>
                  setFormData({ ...formData!, company: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Spares URL
              </label>
              <Input
                value={formData?.sparesUrl ?? ""}
                onChange={(e) =>
                  setFormData({ ...formData!, sparesUrl: e.target.value ?? "" })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Heat</label>
              <Input
                value={formData?.heat}
                onChange={(e) =>
                  setFormData({ ...formData!, heat: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Water</label>
              <Input
                value={formData?.water}
                onChange={(e) =>
                  setFormData({ ...formData!, water: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">zvshk</label>
              <Input
                value={formData?.zvshk}
                onChange={(e) =>
                  setFormData({ ...formData!, zvshk: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">weee</label>
              <Input
                value={formData?.weee}
                onChange={(e) =>
                  setFormData({ ...formData!, weee: e.target.value })
                }
              />
            </div>

            {renderAddress(formData?.address ?? ({} as Address))}
            {renderContactDetails(formData?.contact ?? ({} as Contact))}
            {renderShops(formData?.shops ?? [])}

            <div className="flex justify-between mt-8">
              <Button
                onClick={handleSave}
                className="bg-gray-500 hover:bg-gray-600 text-white"
              >
                Save
              </Button>
              <Button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Delete
              </Button>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
