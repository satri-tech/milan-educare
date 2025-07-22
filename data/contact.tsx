import {
  CreditCard,
  Mail,
  Phone,
  Users,
  LocationEdit,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
export const contactInfo = {
  section: {
    title: "CONTACT US",
    description:
      "Have questions about admissions, courses, or collaborations? Reach out to our team and we'll get back to you shortly....",
    badge: "We're Here to Help",
  },

  form: {
    title: "GET IN TOUCH",
    fields: [
      {
        id: "full-name",
        label: "Full Name",
        type: "text",
        placeholder: "Full name",
        colSpan: 1,
      },
      {
        id: "phone",
        label: "Phone Number",
        type: "text",
        placeholder: "98XXXXXXXX",
        colSpan: 1,
      },
      {
        id: "email",
        label: "Email",
        type: "email",
        placeholder: "you@example.com",
        colSpan: 2,
      },
      {
        id: "message",
        label: "Message",
        type: "textarea",
        placeholder: "Write your message here...",
        colSpan: 2,
      },
    ],
    submitText: "Submit Inquiry",
  },

  contactCards: [
    {
      icon: CreditCard,
      title: "CONTACT",
      items: [
        {
          icon: <Phone className="h-5 w-5" />,
          label: "Phone",
          value: "+977 984-6844126",
        },
        {
          icon: <LocationEdit className="h-5 w-5" />,
          label: "Location",
          value: "Mahendrapul, Pokhara-9 (2nd Floor, Mobile Tower)",
        },
        {
          icon: <Mail className="h-5 w-5" />,
          label: "Email",
          value: "milaan.educarepkr@gmail.com",
        },
      ],
    },
    {
      icon: Users,
      title: "FOLLOW US ONLINE",
      description:
        "Get updates on events, scholarships, and academic life at Milan EduCare.",
      socialLinks: [
        {
          name: "Facebook",
          href: "https://www.facebook.com/profile.php?id=61563373978872",
          icon: <FaFacebookF className="h-5 w-5" />,
          color: "#1877F2",
        },
        {
          name: "Instagram",
          href: "https://www.instagram.com/milaan.educare/",
          icon: <FaInstagram className="h-5 w-5" />,
          color: "bg-pink-500",
        },
        {
          name: "LinkedIn",
          href: "https://www.linkedin.com/company/milaneducare",
          icon: <FaLinkedin className="h-5 w-5" />,
          color: "#0A66C2",
        },
        {
          name: "YouTube",
          href: "https://www.youtube.com/@pokharareels",
          icon: <FaYoutube className="h-5 w-5" />,
          color: "#FF0000",
        },
      ],
    },
  ],
};
