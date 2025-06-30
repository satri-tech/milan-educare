import { HiOutlineMenuAlt4 } from "react-icons/hi";

export default function NavBar() {
    const links = [
        { title: "Home", id: "home" },
        { title: "Mock Test", id: "mocks" },
        { title: "NEB Notes", id: "notes" },
        { title: "About Us", id: "about" },
        { title: "Contact Us", id: "contact" },
    ];

    return <div className="py-6 flex w-full justify-center font-Poppins sticky top-0 bg-white z-50">
        <div className="w-[92%] flex justify-between">
            <div className="font-semibold text-2xl cursor-pointer font-Varela" >
                Milan EduCare
            </div>
            <div className="hidden lg:flex gap-12 text-sm font-medium">
                {links.map((data) => (
                    <div className="cursor-pointer" key={data.id}>
                        {data.title}
                    </div>
                ))}
                <div className="text-2xl cursor-pointer z-50" >
                    <HiOutlineMenuAlt4 />
                </div>
            </div>
            <div className="text-2xl cursor-pointer z-50 lg:hidden">
                <HiOutlineMenuAlt4 />
            </div>        </div>
    </div>
}