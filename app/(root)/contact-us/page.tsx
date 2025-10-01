import React from "react";
import ContactUsHeader from "@/components/ContactUsHeader";
import ContactForm from "@/components/ContactForm";

const Contact = () => {
  return (
    <main>
      <section>
        <ContactUsHeader />
      </section>
      <section className="flex flex-col lg:flex-row gap-4 px-10 lg:px-50 pb-20 lg:py-10 bg-zinc-100 lg:h-120 ">
        <div className="lg:flex-2">
          <h1 className="text-2xl lg:text-4xl font-bold text-[#141516]  pt-4 text-balance">
            Let's get talking
          </h1>
          <p className=" text-md text-stone-800 mt-4 text-balance">
            Whether you’re looking to advertise with us, share a story, inquire
            about our services, or simply learn more about the housing and real
            estate landscape in Ghana, our team is ready to assist you every
            step of the way.
          </p>
          <div className="grid grid-cols-2 gap-6 mt-10">
            <div className="">
              <div className="mb-6">
                <h1 className="text-lg font-bold">Call Center</h1>
                <p>+233 (0) 555 444 665</p>
                <p>+233 (0) 599 663 344</p>
              </div>
              <div>
                <h1 className="text-lg font-bold">Email Us Via</h1>
                <p>info@housinginghana.com</p>
              </div>
            </div>
            <div className="">
              <h1 className="text-lg font-bold">Our Location</h1>
              <p>
                Comzane Plaza, <br /> Tema Community 6. <br /> Accra - Ghana
              </p>
            </div>
          </div>
        </div>
        <div className="lg:flex-2">
          <ContactForm />
        </div>
      </section>
    </main>
  );
};

export default Contact;
