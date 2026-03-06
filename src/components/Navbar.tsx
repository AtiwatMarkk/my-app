import Link from "next/link";
import { Plane } from "lucide-react";

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-white md:px-12 lg:px-24 border-b border-gray-100">
            <div className="flex items-center space-x-2">
                <Plane className="w-8 h-8 text-[#009AE5]" />
                <div>
                    <h1 className="text-xl font-bold leading-tight text-gray-900 tracking-tight">Qoomlee</h1>
                    <p className="text-[10px] text-[#009AE5] font-semibold tracking-wider">Airline</p>
                </div>
            </div>

            <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-600">
                <Link href="/" className="hover:text-[#009AE5] transition-colors py-2">Home</Link>
                <Link href="/Flights" className="hover:text-[#009AE5] transition-colors py-2">Flights</Link>
                <Link href="/Checkin" className="text-[#009AE5] border-b-2 border-[#009AE5] py-2">Check-in</Link>
                <Link href="/Manage" className="hover:text-[#009AE5] transition-colors py-2">Manage Booking</Link>
                <Link href="/Contact" className="hover:text-[#009AE5] transition-colors py-2">Contact</Link>
            </div>
        </nav>
    );
}

export default Navbar;
