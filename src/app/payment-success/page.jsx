import BookingConfirmed from "@/components/BookingConfirmed";
import Navbar from "@/components/Navbar";

export default function PaymentSuccessPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar />
            <BookingConfirmed />
        </div>
    );
}
