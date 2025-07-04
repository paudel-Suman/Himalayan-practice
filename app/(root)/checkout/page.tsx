"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMyContext } from "../context/store";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Info, Loader } from "lucide-react";
import { Icon } from "@iconify/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Cart } from "@/types/cart";
import { shippingAddress } from "@/types/shippingaddress";
import SpinLoader from "@/app/spin-loader";

const CheckoutPage = () => {
  const { store } = useMyContext();
  const [loading, setLoading] = useState(false);
  const [isAddNew, setIsAddNew] = useState(false);
  const [shippingAddress, setShippingAddress] = useState<shippingAddress[]>([]);
  const [cart, setCart] = useState([]);
  const searchParams = useSearchParams();
  const discountAmt = searchParams.get("discount");
  const [selectedBilling, setSelectedBilling] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const handleSelect = (id: string) => {
    setSelectedBilling(id);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,

      [name]: value,
    }));
  };
  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API}/cart/fetch-user-cart`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${store?.auth?.token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch cart");
        }

        setCart(data.cart.items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart:", error);
        toast.error("Failed to load cart");
      }
    };
    fetchUserCart();
  }, []);

  const getUserShippingAddress = async () => {
    console.log("Fetching shipping addresses...");
    console.log("Auth token available:", !!store.auth.token);

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/shipping-address/fetch-all-shipping-addresses`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.auth.token}`,
          },
        }
      );
      const data = await res.json();
      console.log(data);
      setShippingAddress(data.addresses);
      console.log("User shipping Address", data);

      // Set the first shipping address as selected by default
      if (data.addresses && data.addresses.length > 0) {
        setSelectedBilling(data.addresses[0].id);
      }
      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch shipping addresses");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching shipping addresses:", error);
    }
  };
  useEffect(() => {
    getUserShippingAddress();
  }, []);

  const handleSubmitBillingDetails = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/shipping-address/create-shipping-address`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.auth.token}`,
          },
          body: JSON.stringify({
            fullName: formData.fullName,
            phone: formData.phone,
            street: formData.street,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error("Login failed:", data.message || data.error);
        toast.error(data.message || data.error);
        return;
      }

      toast.success("Address Saved Successfully");
      setIsAddNew(false);

      await getUserShippingAddress();

      setFormData({
        fullName: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      });
    } catch (error) {
      console.error("Registration failed", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotals = () => {
    const subtotal = cart.reduce(
      (sum, item: Cart) => sum + item.product.price * item.quantity,
      0
    );
    const discount = discountAmt;
    const deliveryFee = 50.0; // Fixed delivery fee
    const total = subtotal - (Number(discount) || 0) + deliveryFee;

    return {
      subtotal: subtotal.toFixed(2),
      discount: discount,
      deliveryFee: deliveryFee.toFixed(2),
      total: total.toFixed(2),
    };
  };

  const { subtotal, discount, deliveryFee, total } = calculateTotals();

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/shipping-address/delete-shipping-address/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.auth.token}`,
          },
        }
      );

      if (res.ok) {
        setShippingAddress((prev) =>
          prev.filter((item: shippingAddress) => item.id !== id)
        );
        toast.success("Address Deleted Successfully");
      } else {
        toast.error("Failed to Delete Address");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <SpinLoader />;

  return (
    <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {cart.length > 0 ? (
        <div className="grid lg:grid-cols-8 gap-6">
          {/* Checkout Form */}
          <section className="lg:col-span-5 bg-white p-6 rounded-lg shadow-sm border">
            <div className="space-y-8">
              {/* Billing Information */}
              <section>
                <div className="flex justify-between">
                  <h3 className="text-lg font-bold mb-4">
                    1. Billing Information
                  </h3>

                  {shippingAddress.length > 0 && (
                    <div>
                      <button
                        onClick={() => setIsAddNew(!isAddNew)}
                        className="py-1 bg-black text-white rounded-full text-sm px-4"
                      >
                        Add New
                      </button>
                    </div>
                  )}
                </div>

                {isAddNew && (
                  <div
                    onClick={() => setIsAddNew(!isAddNew)}
                    className="bg-black z-[20] rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl opacity-20 absolute inset-0 h-full w-full"
                  />
                )}

                <div
                  className={`${
                    isAddNew ? "block" : "hidden"
                  } bg-white z-[22] rounded-md p-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3xl`}
                >
                  <form
                    onSubmit={handleSubmitBillingDetails}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <Label
                        htmlFor="full-name"
                        className="text-xs text-zinc-500"
                      >
                        {" "}
                        Full Name
                      </Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        placeholder="John Doe"
                        onChange={handleInputChange}
                        required
                        maxLength={20}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="Contact Number"
                          className="text-xs text-zinc-500"
                        >
                          {" "}
                          Contact Number
                        </Label>
                        <Input
                          type="number"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          placeholder="9898989898"
                          onChange={handleInputChange}
                          required
                          maxLength={20}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="street"
                          className="text-xs text-zinc-500"
                        >
                          {" "}
                          Street
                        </Label>
                        <Input
                          id="street"
                          name="street"
                          value={formData.street}
                          placeholder="123 Main St"
                          onChange={handleInputChange}
                          required
                          maxLength={20}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-xs text-zinc-500">
                          {" "}
                          City
                        </Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          maxLength={20}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="state"
                          className="text-xs text-zinc-500"
                        >
                          State
                        </Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          placeholder="Bagmati"
                          onChange={handleInputChange}
                          required
                          maxLength={20}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="zip-code"
                          className="text-xs text-zinc-500"
                        >
                          {" "}
                          Zip Code
                        </Label>
                        <Input
                          type="number"
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          placeholder="1157"
                          onChange={handleInputChange}
                          required
                          maxLength={5}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="country"
                          className="text-xs text-zinc-500"
                        >
                          {" "}
                          Country
                        </Label>
                        <Input
                          id="country"
                          name="country"
                          value={formData.country}
                          placeholder="Nepal"
                          onChange={handleInputChange}
                          required
                          maxLength={20}
                        />
                      </div>
                    </div>

                    <Button className="rounded-full px-8 py-4 justify-end ">
                      {loading ? "Saving..." : "Save Now"}
                    </Button>
                  </form>
                </div>

                {loading ? (
                  <p className="  h-[30em] flex justify-center items-center">
                    <Loader className="animate-spin" />
                  </p>
                ) : shippingAddress.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4 my-10">
                    {shippingAddress
                      .slice()
                      .reverse()
                      .slice(0, 6)
                      .map((item: shippingAddress) => (
                        <div
                          key={item.id}
                          onClick={() => handleSelect(item.id)}
                          className={`relative p-2 border border-dashed space-y-2 shadow-sm cursor-pointer 
                   ${
                     selectedBilling === item.id
                       ? "bg-rose-200/50"
                       : "hover:bg-zinc-100"
                   }
        `}
                        >
                          <div className="flex flex-wrap justify-between">
                            <p className="font-semibold">{item.fullName}</p>
                            <p className="bg-rose-600 whitespace-nowrap text-white rounded-full px-4 py-1 text-xs">
                              {item.phone}
                            </p>
                          </div>
                          <p className="text-zinc-500 text-sm">
                            {item.street}, {item.city}, {item.state}
                          </p>

                          <div className="absolute  right-2 bottom-2 flex  gap-1 ">
                            <AlertDialog>
                              <AlertDialogTrigger>
                                <Icon
                                  icon="material-symbols-light:delete-outline-rounded"
                                  width="20"
                                  height="20"
                                />
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Are you absolutely sure?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete your account and remove
                                    your data from our servers.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(item.id)}
                                  >
                                    Continue
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmitBillingDetails}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <Label
                        htmlFor="full-name"
                        className="text-xs text-zinc-500"
                      >
                        {" "}
                        Full Name
                      </Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        placeholder="John Doe"
                        onChange={handleInputChange}
                        required
                        maxLength={20}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="Contact Number"
                          className="text-xs text-zinc-500"
                        >
                          {" "}
                          Contact Number
                        </Label>
                        <Input
                          type="number"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          placeholder="9898989898"
                          onChange={handleInputChange}
                          required
                          maxLength={20}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="street"
                          className="text-xs text-zinc-500"
                        >
                          {" "}
                          Street
                        </Label>
                        <Input
                          id="street"
                          name="street"
                          value={formData.street}
                          placeholder="123 Main St"
                          onChange={handleInputChange}
                          required
                          maxLength={20}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-xs text-zinc-500">
                          {" "}
                          City
                        </Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          maxLength={20}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="state"
                          className="text-xs text-zinc-500"
                        >
                          State
                        </Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          placeholder="Bagmati"
                          onChange={handleInputChange}
                          required
                          maxLength={20}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="zip-code"
                          className="text-xs text-zinc-500"
                        >
                          {" "}
                          Zip Code
                        </Label>
                        <Input
                          type="number"
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          placeholder="1157"
                          onChange={handleInputChange}
                          required
                          maxLength={5}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="country"
                          className="text-xs text-zinc-500"
                        >
                          {" "}
                          Country
                        </Label>
                        <Input
                          id="country"
                          name="country"
                          value={formData.country}
                          placeholder="Nepal"
                          onChange={handleInputChange}
                          required
                          maxLength={20}
                        />
                      </div>
                    </div>

                    <Button className="rounded-full px-8 py-4 justify-end ">
                      {loading ? "Saving..." : "Save Now"}
                    </Button>
                  </form>
                )}

                {shippingAddress.length > 0 && (
                  <Link
                    href={{
                      pathname: `/payment`,
                      query: {
                        billingaddress: selectedBilling,
                        discount: discountAmt,
                      },
                    }}
                  >
                    <Button className="rounded-full px-8 py-4 justify-end">
                      Next
                    </Button>
                  </Link>
                )}
              </section>
            </div>
          </section>

          {/* Order Summary */}
          <section className="lg:col-span-3 h-fit p-6 bg-zinc-50 border rounded-lg shadow-sm">
            <h2 className="font-bold text-xl text-rose-700">Order Summary</h2>
            <div className="space-y-4 my-2">
              {cart.map((item: Cart) => (
                <div
                  key={`${item.productId}-${item.selectedColorId}-${item.selectedSizeId}`}
                  className="flex gap-4 shadow-sm bg-white rounded-md p-2"
                >
                  <Image
                    src={item.product.featureImage || "/placeholder.png"}
                    alt={item.product.name || "Product Image"}
                    width={80}
                    height={80}
                    className="h-20 w-20 object-cover rounded-md"
                  />
                  <div className="flex-1 space-y-1 flex justify-between flex-col">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <div className="flex items-center gap-4">
                        {" "}
                        <div className="text-sm text-zinc-800 font-medium">
                          Color: {item.color.name || "N/A"}
                        </div>
                        <div className="text-sm text-zinc-800 font-medium">
                          Size: {item.size.sizeNumber || "N/A"}
                        </div>
                        <div className="text-sm text-zinc-800 font-medium">
                          Quantity: {item.quantity}
                        </div>
                      </div>
                    </div>

                    <div className="font-semibold text-rose-600">
                      $ {(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-zinc-500">Subtotal</span>
                <span className="font-bold"> $ {subtotal}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-zinc-500">Discount</span>
                <span className="font-bold">$ {discount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-zinc-500">
                  Delivery Fee
                </span>
                <span className="font-bold"> $ {deliveryFee}</span>
              </div>
              <div className="flex justify-between items-center border-y py-4 my-4">
                <span className="font-bold text-lg">Total</span>
                <span className="text-xl font-bold text-rose-700">
                  $ {total}
                </span>
              </div>
            </div>

            <div className="text-sm text-zinc-500 mt-6 flex gap-1 font-medium">
              <Info className="h-5 w-5" />
              <span className="text-black">90 Days limited warranty</span>{" "}
              against manufacturers defect
            </div>

            <Link href={`/cart`}>
              <Button
                variant="outline"
                className="mt-4 w-full py-6 rounded-full"
              >
                Back to Cart
              </Button>
            </Link>
          </section>
        </div>
      ) : (
        <div className="h-screen w-full flex flex-col justify-center items-center space-y-4">
          <Image
            src="/empty-cart.png"
            alt="Empty Cart"
            width={400}
            height={400}
          />
          <div className="flex flex-col items-center space-y-2">
            <h2 className="font-bold text-lg">Your Cart is Empty</h2>
            <p className="font-medium text-zinc-500">
              Add some items to proceed to checkout
            </p>
            <Link href={`/`}>
              <Button className="rounded-full py-6">Shop Now</Button>
            </Link>
          </div>
        </div>
      )}
    </main>
  );
};

export default CheckoutPage;
