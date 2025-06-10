"use client";
import { getProductReview } from "@/actions/fetchapi";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
// import moment from "moment";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

type reviewtype = {
  comment: string;
};

const Review = ({ productId }: { productId: number }) => {
  const [productReview, setProductReview] = useState<reviewtype | null>(null);
  const [formData, setFormData] = useState({
    comment: "",
    rating: 0,
    productId: productId,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`https://api.katunje.com/v1/review/add-review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: formData.comment,
          rating: formData.rating,
          productId: formData.productId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data.message || data.error);
        return;
      }

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
        const review = await getProductReview(productId);
        console.log("review", review);
        setProductReview(review);
      } catch (error) {
        console.error("Failed to fetch review:", error);
      }
    };

    fetchReview();
  }, [productId]);

  if (!productReview)
    return <p className="text-slate-300">Loading review...</p>;

  return (
    <section className="grid grid-cols-2 gap-8 my-8 min-h-screen">
      <div>
        {/* {productReview.length > 0 ? (
          productReview?.map((item, index: number) => (
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
        )} */}
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
                // onChange={handleChange}
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
                    // onClick={() => handleRating(i)}
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
