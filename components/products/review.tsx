"use client";
import { getProductReview } from "@/actions/fetchapi";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import moment from "moment";
import { useMyContext } from "@/app/(root)/context/store";
import { reviewType } from "@/types/review";

const Review = ({ productId }: { productId: string }) => {
  const [productReview, setProductReview] = useState<reviewType[] | null>(null);
  const { store } = useMyContext();
  console.log(productId);
  const [formData, setFormData] = useState({
    comment: "",
    rating: 0,
    productId: productId,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleRating = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      rating: index + 1,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { id, value } = e.target;

    {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/review/add-review`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store?.auth?.token}`,
          },
          body: JSON.stringify({
            comment: formData.comment,
            rating: formData.rating,
            productId: formData.productId,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        console.error(data.message || data.error);
        return;
      }
      // setProductReview((prev) => {
      //   if (!prev) return prev;
      //   return {
      //     ...prev,
      //     productReview: [
      //       {
      //         user: { name: store?.auth?.user?.name || "John Doe" },
      //         comment: formData.comment,
      //         rating: formData.rating,
      //       },
      //       ...prev.productReview,
      //     ],
      //   };
      // });

      // Optionally reset the form
      setFormData({
        comment: "",
        rating: 0,
        productId: productId,
      });
    } catch (error) {
      console.error("Failed To add Review", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await getProductReview(productId);

        // Handle both array and single object responses
        if (Array.isArray(res)) {
          setProductReview(res);
        } else {
          // If it's a single review, wrap it in an array
          setProductReview([res]);
        }
      } catch (error) {
        console.error("Failed to fetch review:", error);
        setProductReview([]); // Set to empty array on error
      }
    };

    fetchReview();
  }, [productId]);

  
  if (!productReview)
    return <p className="text-slate-300">Loading review...</p>;

  return (
    <section className="grid md:grid-cols-2 gap-8 my-8 min-h-screen">
      <div>
        {productReview ? (
          productReview?.map((item: reviewType, index: number) => (
            <div key={index} className="flex items-start gap-4 pb-6 border-b">
              <div className="h-12 w-12 aspect-square rounded-full bg-gray-200 flex items-center justify-center"></div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{item.user.name}</span>
                  <span className="text-sm text-gray-500">
                    {moment(item.date).format("MMMM D, YYYY")}
                  </span>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < item.rating
                          ? "fill-yellow-500 text-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 md:text-base text-sm">
                  {item.comment}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No reviews yet. Be the first to review!
          </p>
        )}
      </div>
      <div>
        {/* Review form */}
        <div className="border p-6 rounded-lg shadow-sm h-fit">
          <h2 className="text-xl font-semibold mb-4">Write a Review</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="comment">Your Review *</Label>
              <textarea
                id="comment"
                rows={4}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                onChange={handleChange}
                value={formData.comment}
                required
              ></textarea>
            </div>
            <div>
              <Label className="block mb-2">Rating *</Label>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleRating(i)}
                    className="text-gray-300 hover:text-yellow-500"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        i < formData.rating
                          ? "fill-yellow-500 text-yellow-500"
                          : ""
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              className="bg-black text-white hover:bg-gray-800 w-full"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Review"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Review;
