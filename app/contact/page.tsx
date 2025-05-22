import { NextPage } from "next";
import { Mail, Phone, User } from "lucide-react"; // Using lucide-react for icons

const ContactPage: NextPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-green-700 mb-10">
        Contact Us
      </h1>

      <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        {/* Client Contact Information */}
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <User className="mr-3 text-green-600" size={28} />
            Website Owner Information
          </h2>
          <div className="space-y-4 text-gray-700">
            <p className="flex items-center">
              <strong className="w-24">Name:</strong> Charles Alphonso Zinnah
            </p>
            <p className="flex items-center">
              <Phone className="mr-2 text-green-500" size={20} />
              <strong className="w-20">Phone:</strong>
              <a
                href="tel:+8615558127892"
                className="text-blue-600 hover:underline"
              >
                +8615558127892
              </a>
            </p>
            <p className="flex items-center">
              <Mail className="mr-2 text-green-500" size={20} />
              <strong className="w-20">Email:</strong>
              <a
                href="mailto:zcalphonso@gmail.com"
                className="text-blue-600 hover:underline"
              >
                zcalphonso@gmail.com
              </a>
            </p>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            For inquiries related to WeSustainEco initiatives and partnerships,
            please reach out to Charles.
          </p>
        </div>

        {/* EKD Digital Contact Information */}
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <Mail className="mr-3 text-green-600" size={28} />
            Website & Technical Support
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              This website is developed and maintained by{" "}
              <strong>EKD Digital</strong>.
            </p>
            <p className="flex items-center">
              <Mail className="mr-2 text-green-500" size={20} />
              <strong className="w-20">Email:</strong>
              <a
                href="mailto:ekd@ekddigital.com"
                className="text-blue-600 hover:underline"
              >
                ekd@ekddigital.com
              </a>
            </p>
            <p className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 text-green-500"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </svg>
              <strong className="w-20">Website:</strong>
              <a
                href="https://www.ekddigital.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                www.ekddigital.com
              </a>
            </p>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            For any technical issues or inquiries about the website, please
            contact EKD Digital.
          </p>
        </div>
      </div>

      {/* Optional: Add a contact form later */}
      {/*
      <div className="mt-16 max-w-2xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Or Send Us a Message
        </h2>
        // Contact Form Component
      </div>
      */}
    </div>
  );
};

export default ContactPage;
