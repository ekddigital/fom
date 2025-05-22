
import { NextPage } from "next";

const AboutPage: NextPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
        About WeSustainEco
      </h1>
      <div className="prose lg:prose-xl max-w-4xl mx-auto text-gray-700">
        <p>
          WeSustainEco is dedicated to promoting environmental, governmental, and social 
          sustainability through innovative solutions, policy advocacy, and community engagement. 
          Our mission is to drive a global shift towards a more sustainable and equitable future 
          for all.
        </p>
        <h2 className="text-2xl font-semibold text-green-600 mt-8 mb-4">Our Vision</h2>
        <p>
          We envision a world where sustainable practices are integrated into every aspect of life, 
          leading to a healthy planet, thriving communities, and resilient economies. We believe 
          that by working together, we can create lasting change and ensure a sustainable legacy 
          for generations to come.
        </p>
        <h2 className="text-2xl font-semibold text-green-600 mt-8 mb-4">Our Focus Areas</h2>
        <p>
          Our work is centered around three key pillars of sustainability:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Environmental Sustainability:</strong> Addressing climate change, promoting renewable 
            energy, managing waste responsibly, conserving biodiversity, and fostering sustainable 
            agriculture.
          </li>
          <li>
            <strong>Government Sustainability Policy:</strong> Advocating for sound environmental laws, 
            supporting green economic strategies, promoting sustainable public infrastructure, and 
            enhancing environmental education and awareness.
          </li>
          <li>
            <strong>Social Sustainability:</strong> Focusing on individual and community well-being, 
            offering tools for personal growth (like personality assessments), fostering inclusive 
            social campaigns, and promoting leisure and cultural activities that enhance quality of life.
          </li>
        </ul>
        <p className="mt-6">
          We aim to attract individuals, communities, investors, and policymakers to join us in 
          our efforts to build a more sustainable world. 
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
