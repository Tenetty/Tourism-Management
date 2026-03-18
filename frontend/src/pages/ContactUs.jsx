import React from "react";

const ContactUs = () => {
  return (
    <div class="container my-24 px-6 mx-auto">
      <section class="mb-32 text-gray-800">
        <div class="grid lg:grid-cols-2 gap-4 lg:gap-x-12 lg:mb-0">
          <div class="mb-12 lg:mb-0">
            <h2 class="text-3xl font-bold mb-6">Frequently asked questions</h2>

            <p class="text-gray-500 mb-12">
              Didn't find your answer in the FAQ? Contact our sales team.
            </p>

            <form>
              <div class="form-group mb-6">
                <input
                  type="text"
                  class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleInput7"
                  placeholder="Name"
                />
              </div>
              <div class="form-group mb-6">
                <input
                  type="email"
                  class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleInput8"
                  placeholder="Email address"
                />
              </div>
              <div class="form-group mb-6">
                <textarea
                  class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlTextarea13"
                  rows="3"
                  placeholder="Message"
                ></textarea>
              </div>

              <button
                type="submit"
                class="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Send
              </button>
            </form>
          </div>

          <div class="mb-6 md:mb-0">
            <p class="font-bold mb-4">How do I book a rural tour package?</p>
            <p class="text-gray-500 mb-12">
              Simply browse our available tour packages, select your preferred
              dates and group size, and complete the booking through our secure
              checkout. You'll receive a confirmation email with all the details
              for your rural adventure.
            </p>

            <p class="font-bold mb-4">Can I cancel or modify my reservation?</p>
            <p class="text-gray-500 mb-12">
              Yes, you can cancel or modify most reservations up to 48 hours
              before your scheduled check-in or tour start date. Visit your
              "My Reservations" page to manage your bookings. Cancellation
              policies may vary by hotel or tour provider.
            </p>

            <p class="font-bold mb-4">
              What transport options are available for rural areas?
            </p>
            <p class="text-gray-500 mb-12">
              We offer a range of vehicles including cars, vans, and 4x4s
              suited for rural roads. You can also book train tickets directly
              through our platform for a scenic rail experience.
            </p>

            <p class="font-bold mb-4">
              Can I customize a tour package for my group?
            </p>
            <p class="text-gray-500 mb-12">
              Absolutely! Contact our team through this form with your
              preferred destinations, group size, and travel dates. We'll
              work with local guides to create a tailor-made rural experience
              just for you.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
